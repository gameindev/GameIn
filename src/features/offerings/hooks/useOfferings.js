import { useState, useEffect } from "react";
import { fetchOfferingsService, fetchOfferingByIdService, editOfferingService, offeringService, resetOfferingService } from "../services";
import { showNotificationHelper } from "../../../shared/utils/helpers/showNotification.helper";
import { NOTIFICATION_TYPES } from "../../../shared/enums/notificationTypesEnum";
import { negotiateOffering } from "../../sponsorships/services/fetchSponsorships";
import useApi from "../../../shared/hooks/useApi";
import { USERTYPES } from "../../../shared/enums/userTypesEnum";
import { OfferingStatus } from "../../../shared/enums/offeringStatusEnum";

export function useOfferings({ userId, offeringId } = {}) {
    const [offerings, setOfferings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [total, setTotal] = useState(0);
    const { patch } = useApi();

    useEffect(() => {
        const loadOfferings = async () => {
            // Only proceed if we have at least a userId
            if (!userId) {
                setLoading(false);
                setOfferings({ data: [], single: false });
                return;
            }

            setLoading(true);


            try {
                let response;

                // Only call fetchOfferingByIdService if we have BOTH userId AND offeringId
                if (userId && offeringId) {
                    response = await fetchOfferingByIdService(userId, offeringId);
                    setOfferings({ data: response ? response : [], single: true });
                }
                // If we only have userId (no offeringId), fetch all offerings for that user
                else if (userId) {
                    response = await fetchOfferingsService(userId);
                    setOfferings({ data: response || [], single: false });
                }
                // Fallback: set empty data
                else {
                    setOfferings({ data: [], single: false });
                }

                setError(null);
            } catch (err) {
                setError(err);
                setOfferings({ data: [], single: false });
            } finally {
                setLoading(false);
            }
        };

        loadOfferings();
    }, [userId, offeringId]);

    const submitEdit = async (data, onSuccess) => {

        try {
            const formData = offeringService.toEditPayload(data);

            const response = await editOfferingService(offeringId, formData);

            if (response.statusCode != 400) {
                if (onSuccess) {
                    onSuccess();
                    if (response.data?.last_adjusted_by?.user_type === USERTYPES.CREATOR && response.data?.status !== OfferingStatus.DRAFT) {
                        await negotiateOffering({ patch, offeringId });
                    }
                };
            } else {
                showNotificationHelper(
                    "Error",
                    "Adjustment reached it's maximum limit",
                    NOTIFICATION_TYPES.ERROR
                )
            }

        } catch (err) {
            setError(err);
            throw err;
        }
    };

    const resetOffering = async () => {
        try {
            await resetOfferingService(offeringId);
        } catch (err) {
            setError(err);
            throw err;
        }
    };

    return {
        offerings,
        loading,
        error,
        submitEdit,
        resetOffering,
        toFormValues: offeringService.toFormValues,
    };
}
