import { updateCreatorProfileService } from "../service/updateCreatorProfile.service";
import { useCallback } from "react";
import { showNotificationHelper } from "../../../shared/utils/helpers/showNotification.helper";
import { NOTIFICATION_TYPES } from "../../../shared/enums/notificationTypesEnum";

const useUpdateCreatorProfile = (setError, dispatch, setUserAction, currentUser) => {
    const updateCreatorProfile = useCallback(async (userId, data) => {
        setError("");
        
        try {
            const response = await updateCreatorProfileService(userId, data);
            
            showNotificationHelper("Success", "Creator profile updated successfully", NOTIFICATION_TYPES.SUCCESS);
            setError("");
            
            // Update the store with the updated user data
            if (dispatch && setUserAction && currentUser && response?.data) {
                const updatedUser = {
                    ...currentUser,
                    creator_profile: {
                        ...currentUser.creator_profile,
                        ...data,
                    }
                };
                dispatch(setUserAction(updatedUser));
            }
            
            return response;
        } catch (error) {
            let errorMessage = "Failed to update creator profile";
            
            // Handle different error structures
            if (error?.response?.data?.message) {
                const message = error.response.data.message;
                if (Array.isArray(message)) {
                    errorMessage = message[0];
                } else if (typeof message === 'object' && message.message) {
                    errorMessage = Array.isArray(message.message) ? message.message[0] : message.message;
                } else if (typeof message === 'string') {
                    errorMessage = message;
                }
            } else if (error?.message) {
                errorMessage = error.message;
            }
            
            showNotificationHelper("Error", errorMessage, NOTIFICATION_TYPES.ERROR);
            setError(errorMessage);
            throw error;
        }
    }, [setError, dispatch, setUserAction, currentUser]);
    
    return updateCreatorProfile;
};

export { useUpdateCreatorProfile };