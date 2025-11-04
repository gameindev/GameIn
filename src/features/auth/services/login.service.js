import { AUTH_ENDPOINTS } from "../api/authEndpoints";
import { USERTYPES } from "../../../shared/enums/userTypesEnum";
import { PROFILE_TYPES } from "../../../shared/enums/profileTypesEnum";
import { NOTIFICATION_TYPES } from "../../../shared/enums/notificationTypesEnum";
import { showNotificationHelper } from "../../../shared/utils/helpers/showNotification.helper";
import routePaths from "../../../app/router/routes";

/**
 * Login Service - Handles all login-related operations
 * Provides utilities for authentication, user data fetching, and error handling
 */

/**
 * Maps user types to their corresponding profile types
 * @param {string} userType - The user type (BRAND, CREATOR, etc.)
 * @returns {string} The corresponding profile type
 */
export const getProfileType = (userType) => {
    const typeMap = {
        [USERTYPES.BRAND]: PROFILE_TYPES.BRAND,
        [USERTYPES.CREATOR]: PROFILE_TYPES.CREATOR,
    };
    return typeMap[userType] || "";
};

/**
 * Validates user data from authentication response
 * @param {Object} user - User object from auth response
 * @returns {Object} Validated user data with userId and userType
 * @throws {Error} If user data is incomplete
 */
export const validateUserData = (user, options = {}) => {
    const { requireType = true } = options;
    // Support wrapped shapes like { user: {...} } or { data: { user: {...} } }
    const src = (user?.user) || (user?.data?.user) || user;
    const userId = src?.id || src?._id || src?.userId || src?.uid || src?.sub;
    const rawType = src?.user_type || src?.userType || src?.type;
    const userType = rawType ? String(rawType).toUpperCase() : undefined;
    
    if (!userId || (requireType && !userType)) {
        throw new Error("User information incomplete");
    }
    
    return { userId, userType };
};

// Decode JWT payload without external libs; returns object or null
export const decodeJwtPayload = (token) => {
    if (!token || typeof token !== "string") return null;
    try {
        const parts = token.split(".");
        if (parts.length < 2) return null;
        const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
        const json = atob(base64);
        return JSON.parse(json);
    } catch (_e) {
        return null;
    }
};

/**
 * Fetches full user data with profile information
 * @param {string} userId - User ID
 * @param {string} userType - User type
 * @param {Function} get - API get function
 * @returns {Promise<Object>} Full user data with profile
 */
export const fetchFullUserData = async (userId, userType, get) => {
    if (!userId) {
        throw new Error("Missing userId while fetching user data");
    }
    const profileType = userType === "BRAND"
        ? "brand_profile"
        : userType === "CREATOR"
            ? "creator_profile"
            : "creator_profile,brand_profile,user_bio";
    
    const { data: fullUserData } = await get({
        url: `/users/${userId}`,
        params: profileType ? { populate: profileType } : {},
    });
    return fullUserData;
};

/**
 * Handles login errors with proper notification and navigation
 * @param {Error} error - The error object 
 * @param {string} customMessage - Custom error message
 * @param {Function} navigate - Navigation function
 */
export const handleLoginError = (error, customMessage, navigate) => {
    const errorMessage = customMessage || error?.message || "Something went wrong";
    showNotificationHelper("Login Error", errorMessage, NOTIFICATION_TYPES.ERROR);
    navigate(routePaths.WELCOMEPAGE);
};

/**
 * Handles successful login with notification and navigation
 * @param {Object} userData - Full user data
 * @param {Function} navigate - Navigation function
 */
export const handleLoginSuccess = (userData, navigate) => {
    showNotificationHelper(
        "Login Successful",
        `Welcome back, ${userData.username || "user"}!`,
        NOTIFICATION_TYPES.SUCCESS
    );
    navigate(routePaths.ACCOUNTS.DASHBOARD.ROOT);
};

/**
 * Main login service function that orchestrates the entire login process
 * @param {Object} formData - Login form data (identifier, password)
 * @param {Object} api - API functions (post, get)
 * @param {Function} dispatch - Redux dispatch function
 * @param {Function} navigate - Navigation function
 * @param {Object} actionCreators - Redux action creators (setAuth, setUser)
 * @returns {Promise<Object>} Login result with success status and data
 */
export const loginService = async (formData, { post, get }, dispatch, navigate, actionCreators) => {
    try {
        // Step 1: Authenticate user
        const { data: authData } = await post({
            url: AUTH_ENDPOINTS.LOGIN,
            payload: formData,
        });

        // Step 2: Validate and extract user data (fallback to token payload if needed)
        const tokenPayload = decodeJwtPayload(authData?.accessToken);
        const mergedUserSource = {
            ...(tokenPayload || {}),
            ...(authData?.user || {}),
        };
        const { userId, userType } = validateUserData(mergedUserSource);

        // Step 3: Dispatch auth data immediately
        dispatch(actionCreators.setAuth({
            accessToken: authData.accessToken,
            refreshToken: authData.refreshToken,
            user: authData.user,
        }));

        // Step 4: Fetch full user data with profile
        const fullUserData = await fetchFullUserData(userId, userType, get);
        
        // Step 5: Update user data in store
        dispatch(actionCreators.setUser(fullUserData));

        // Step 6: Handle success
        handleLoginSuccess(fullUserData, navigate);

        return {
            success: true,
            data: fullUserData,
            authData
        };
        
    } catch (error) {
        handleLoginError(error, null, navigate);
        return {
            success: false,
            error: error.message || "Login failed"
        };
    }
};

/**
 * Enhanced login service with better error handling and retry logic
 * @param {Object} formData - Login form data
 * @param {Object} api - API functions
 * @param {Function} dispatch - Redux dispatch function
 * @param {Function} navigate - Navigation function
 * @param {Object} actionCreators - Redux action creators (setAuth, setUser)
 * @param {Object} options - Additional options
 * @returns {Promise<Object>} Login result
 */
export const enhancedLoginService = async (
    formData, 
    { post, get }, 
    dispatch, 
    navigate, 
    actionCreators,
    options = {}
) => {
    const { 
        retryAttempts = 0, 
        maxRetries = 1,
        timeout = 30000 
    } = options;

    try {
        // Create timeout promise
        const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Login request timeout')), timeout)
        );

        // Race between login and timeout
        const result = await Promise.race([
            loginService(formData, { post, get }, dispatch, navigate, actionCreators),
            timeoutPromise
        ]);

        return result;

    } catch (error) {
        // Retry logic for network errors
        if (retryAttempts < maxRetries && error.message.includes('timeout')) {
            console.warn(`Login attempt ${retryAttempts + 1} failed, retrying...`);
            return enhancedLoginService(
                formData, 
                { post, get }, 
                dispatch, 
                navigate, 
                actionCreators,
                { ...options, retryAttempts: retryAttempts + 1 }
            );
        }

        handleLoginError(error, null, navigate);
        return {
            success: false,
            error: error.message || "Login failed"
        };
    }
};

/**
 * Utility function to check if user is already logged in
 * @param {Object} authState - Current auth state from Redux
 * @returns {boolean} True if user is logged in
 */
export const isUserLoggedIn = (authState) => {
    return !!(authState?.accessToken && authState?.user?.id);
};

/**
 * Utility function to get user display name
 * @param {Object} user - User object
 * @returns {string} Display name for the user
 */
export const getUserDisplayName = (user) => {
    return user?.username || user?.email || user?.name || "User";
};

/**
 * Utility function to validate login form data
 * @param {Object} formData - Form data to validate
 * @returns {Object} Validation result
 */
export const validateLoginForm = (formData) => {
    const errors = {};
    
    if (!formData.identifier?.trim()) {
        errors.identifier = "Identifier is required";
    }
    
    if (!formData.password?.trim()) {
        errors.password = "Password is required";
    }
    
    if (formData.password && formData.password.length < 6) {
        errors.password = "Password must be at least 6 characters";
    }
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

// Export all utilities as a single object for easier importing
export const loginUtils = {
    getProfileType,
    validateUserData,
    fetchFullUserData,
    handleLoginError,
    handleLoginSuccess,
    isUserLoggedIn,
    getUserDisplayName,
    validateLoginForm
};
// Default export for the main service
export default loginService;