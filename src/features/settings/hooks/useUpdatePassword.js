import { updatePasswordService } from "../service/updatePassword.service";
import { useCallback } from "react";
import { showNotificationHelper } from "../../../shared/utils/helpers/showNotification.helper";
import { NOTIFICATION_TYPES } from "../../../shared/enums/notificationTypesEnum";


const useUpdatePassword = (setPasswordError, setConfirmPasswordError) => {
    const updatePassword = useCallback(async (userId, password, confirmPassword) => {
        // Clear previous errors
        setPasswordError("");
        setConfirmPasswordError("");

        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match");
            setConfirmPasswordError("Passwords do not match");
            return;
        }
        
        try {
            await updatePasswordService(userId, password);
            showNotificationHelper("Success", "Password updated successfully", NOTIFICATION_TYPES.SUCCESS);
            // Clear errors on success
            setPasswordError("");
            setConfirmPasswordError("");
        } catch (error) {
            const errorMessage = error?.response?.data?.message || error?.message || "Failed to update password";
            showNotificationHelper("Error", errorMessage, NOTIFICATION_TYPES.ERROR);
            setPasswordError(errorMessage);
            setConfirmPasswordError(errorMessage);
            throw error;
        }
    }, [setPasswordError, setConfirmPasswordError]);

    return updatePassword;
};  

export { useUpdatePassword };