import { useEffect, useState } from "react";
import { useAppSelector } from "../../../app/store/hooks";
import { currentUser } from "../../auth/store/selector";
import { acceptOffering, fetchSponsorships, negotiateOffering, resetOffering } from "../services/fetchSponsorships";
import useApi from "../../../shared/hooks/useApi";
import { NOTIFICATION_TYPES } from "../../../shared/enums/notificationTypesEnum";
import { showNotificationHelper } from "../../../shared/utils/helpers/showNotification.helper";
import { confirmAction } from "../../../shared/utils/helpers/confirmAction.helper";


export default function useSponsorships({ page = 1, limit = 20 } = {}) {
    const user = useAppSelector(currentUser);
    const { get, loading, error, patch } = useApi();
    const [sponsorships, setSponsorships] = useState(null);
    const [accepting, setAccepting] = useState(false);

    useEffect(() => {
        let mounted = true;
        async function load() {
            try {
                if (!user?.id) return;
                const data = await fetchSponsorships({
                    get,
                    user: user,
                    page,
                    limit,
                });

                // console.log(data);
                if (mounted) setSponsorships(data);
            } catch (e) {
                console.log(e);
             }
        }
        load();
        return () => {
            mounted = false;
        };
    }, [user?.id, page, limit, get]);


    const handleAcceptOffering = async (offeringId, options = {}) => {
        const { skipConfirm = false } = options;
        if (!skipConfirm) {
            const ok = await confirmAction({
                title: "Accept offer?",
                message: "You are about to accept this sponsorship offer.",
                confirmText: "Accept",
                cancelText: "Cancel",
            });
            if (!ok) return false;
        }
        setAccepting(true);
        try {
            const response = await acceptOffering({ patch, offeringId });
            if (response) {
                const updated = await fetchSponsorships({
                    get,
                    user: user,
                    page,
                    limit,
                });
                setSponsorships(updated);
                showNotificationHelper(
                    "Success",
                    "Offering accepted successfully",
                    NOTIFICATION_TYPES.SUCCESS
                )
            }
            return response;
        } catch (err) {
            showNotificationHelper(
                "Error",
                err?.response?.data?.message || err?.message || "Failed to accept offering",
                NOTIFICATION_TYPES.ERROR
            )
        } finally {
            setAccepting(false);
        }
    };

    const handleNegotiateOffering = async (offeringId) => {
        try {
            const response = await negotiateOffering({ patch, offeringId });
            if (response) {
                const updated = await fetchSponsorships({
                    get,
                    user: user,
                    page,
                    limit,
                });
                setSponsorships(updated);
            }
            return response;
        } catch (err) {
            console.error("Error negotiate offering:", err);
            throw err;
        }
    };

    const handleResetOffering = async (offeringId, options = {}) => {
        const { skipConfirm = false } = options;
        if (!skipConfirm) {
            const ok = await confirmAction({
                title: "Dismiss offer?",
                message: "This will dismiss/reset the offer.",
                confirmText: "Dismiss",
                cancelText: "Cancel",
            });
            if (!ok) return false;
        }
        try {
            const response = await resetOffering({ patch, offeringId });
            if (response) {
                const updated = await fetchSponsorships({
                    get,
                    user: user,
                    page,
                    limit,
                });
                setSponsorships(updated);
            }
            return response;
        } catch (err) {
            console.error("Error negotiate offering:", err);
            throw err;
        }
    };

    return {
        sponsorships,
        loading,
        error,
        handleAcceptOffering,
        handleNegotiateOffering,
        handleResetOffering,
        accepting,
    };
}
