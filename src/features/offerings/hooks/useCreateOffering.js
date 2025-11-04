import { useCallback } from "react";
import { useNavigate } from "react-router";
import { showNotificationHelper } from "../../../shared/utils/helpers/showNotification.helper";
import { NOTIFICATION_TYPES } from "../../../shared/enums/notificationTypesEnum";
import { createOfferingService } from "../services/createOffering.service";
import { validateOfferings, buildOfferingPayload } from "../utils/helpers";

/**
 * Hook for creating an offering
 * @param {string} mode - "create" or "edit"
 * @returns {Function} - Submit handler that accepts (data, reset) as parameters
 */
export const useCreateOffering = (mode = "create") => {
    const navigate = useNavigate();

    const handleSubmit = useCallback(async (data, reset) => {
        // Validate offerings (shows notification internally if invalid)
        const isValid = validateOfferings(data);
        if (!isValid) {
            return;
        }

        // Build payload
        const payload = buildOfferingPayload(data, mode || "create");
        console.log("Payload to API", payload);

        try {
            // Call API service
            const response = await createOfferingService(payload);
            const title = response?.offering?.title || "Offering";

            // Reset form if provided
            if (reset && typeof reset === 'function') {
                reset();
            }

            // Show success notification
            showNotificationHelper(
                "Offering Created",
                `${title} has been created successfully.`,
                NOTIFICATION_TYPES.SUCCESS
            );

            console.log("Response from API", response);

            // Navigate back
            navigate(-1);
        } catch (error) {
            console.error("API error", error);
            const errorMessage = error?.response?.data?.message || error?.message || "Something went wrong";
            showNotificationHelper(
                "Error",
                `Failed to create offering: ${errorMessage}`,
                NOTIFICATION_TYPES.ERROR
            );
        }
    }, [navigate, mode]);

    return handleSubmit;
};

