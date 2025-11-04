import { updateAccountService } from "../service/updateAccount.service";
import { useCallback } from "react";
import { showNotificationHelper } from "../../../shared/utils/helpers/showNotification.helper";
import { NOTIFICATION_TYPES } from "../../../shared/enums/notificationTypesEnum";

export const useUpdateAccount = (setError, dispatch, setUserAction, currentUser) => {
    const updateAccount = useCallback(async (userId, data) => {
        // Clear previous errors
        setError("");
        
        try {
            // Format birthday as MM-DD-YYYY
            let formattedBirthday = null;
            if (data.birthday) {
                const date = new Date(data.birthday);
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                const year = date.getFullYear();
                formattedBirthday = `${month}-${day}-${year}`;
            }
            
            const payload = {
                email: data.email,
                username: data.username,
                language: data.language,
                timezone: data.timezone?.value || data.timezone,
                birthday: formattedBirthday,
            };
            
            const response = await updateAccountService(
                userId,
                payload.email,
                payload.username,
                payload.language,
                payload.timezone,
                payload.birthday
            );
            
            showNotificationHelper("Success", "Account updated successfully", NOTIFICATION_TYPES.SUCCESS);
            setError("");
            
            // Update the store with the updated user data
            if (dispatch && setUserAction && currentUser) {
                const updatedUser = {
                    ...currentUser,
                    email: data.email,
                    username: data.username,
                    language: data.language,
                    timezone: data.timezone?.value || data.timezone,
                    date_of_birth: formattedBirthday,
                };
                dispatch(setUserAction(updatedUser));
            }
            
            return response;
        } catch (error) {
            const errorMessage = error?.response?.data?.message || error?.message || "Failed to update account";
            showNotificationHelper("Error", errorMessage, NOTIFICATION_TYPES.ERROR);
            setError(errorMessage);
            throw error;
        }
    }, [setError, dispatch, setUserAction, currentUser]);

    return updateAccount;
};