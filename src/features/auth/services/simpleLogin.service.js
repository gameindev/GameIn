import { AUTH_ENDPOINTS } from "../api/authEndpoints";
import { showNotificationHelper } from "../../../shared/utils/helpers/showNotification.helper";
import { NOTIFICATION_TYPES } from "../../../shared/enums/notificationTypesEnum";
import routePaths from "../../../app/router/routes";

/**
 * Simple Login Service - Direct implementation matching the original code
 * This maintains the exact same flow as the original LoginPage implementation
 */

/**
 * Main login function that matches the original implementation exactly
 * @param {Object} formData - Login form data (identifier, password)
 * @param {Object} api - API functions (post, get)
 * @param {Function} dispatch - Redux dispatch function
 * @param {Function} navigate - Navigation function
 * @param {Object} actionCreators - Redux action creators (setAuth, setUser)
 * @returns {Promise<Object>} Login result
 */
export const simpleLogin = async (formData, { post, get }, dispatch, navigate, actionCreators) => {
    try {
        // Step 1: Authenticate user
        const { data: authData } = await post({
            url: AUTH_ENDPOINTS.LOGIN,
            payload: formData,
        });

        

        // // Step 2: Extract user data (matching original logic)
        const userId = authData.user?.id;
        const userType = authData.user?.user_type?.toUpperCase();
        

        if (!userId || !userType) {
            throw new Error("User information incomplete");
        }

        // // Step 3: Dispatch auth data immediately
        dispatch(actionCreators.setAuth({
            accessToken: authData.accessToken,
            refreshToken: authData.refreshToken,
            user: authData.user,
        }));

        

        // // Step 4: Determine profile type (exact match to original)
        const profileType = userType === "BRAND"
            ? "brand_profile"
            : userType === "CREATOR"
                ? "creator_profile"
                : "";

        // // Step 5: Fetch full user data with profile
        const { data: fullUserData } = await get({
            url: `/users/${userId}`,
            params: profileType ? { populate: profileType } : {},
        });

        // Step 6: Update user data in store
        dispatch(actionCreators.setUser(fullUserData));

        

        // Step 7: Show success notification
        showNotificationHelper(
            "Login Successful",
            `Welcome back, ${fullUserData.username || "user"}!`,
            NOTIFICATION_TYPES.SUCCESS
        );

        // Step 8: Navigate to dashboard
        navigate(routePaths.ACCOUNTS.DASHBOARD.ROOT);

        return {
            success: true,
            data: fullUserData,
            authData
        };
        
    } catch (error) {
        // Handle error
        const errorMessage = error?.message || "Something went wrong";
        showNotificationHelper("Login Error", errorMessage, NOTIFICATION_TYPES.ERROR);
        navigate(routePaths.WELCOMEPAGE);
        
        return {
            success: false,
            error: errorMessage
        };
    }
};

export default simpleLogin;
