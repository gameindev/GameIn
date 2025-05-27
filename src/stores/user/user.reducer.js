import { USER_ACTION_TYPES } from "./user.types";



const INITIAL_STATE = {
    currentUser: null,
    accessToken: null,
    refreshToken: null,
    isLoading: false,
    error: null,
    accessTokenExpiry: null,
};

export const userReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action; // <== this MUST destructure the action object
    switch (type) {
        case USER_ACTION_TYPES.REGISTER_USER_START:
            return { ...state, isLoading: true, error: null };

        case USER_ACTION_TYPES.REGISTER_USER_SUCCESS:
            return { ...state, isLoading: false, currentUser: payload, error: null };

        case USER_ACTION_TYPES.REGISTER_USER_FAILED:
            return { ...state, isLoading: false, error: payload };

        case USER_ACTION_TYPES.LOGIN_USER_START:
            return { ...state, isLoading: true, error: null };

        case USER_ACTION_TYPES.LOGIN_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                currentUser: payload.user || null,
                accessToken: payload.accessToken,
                refreshToken: payload.refreshToken,
                accessTokenExpiry: payload.accessTokenExpiry,
                error: null,
            };

        case USER_ACTION_TYPES.LOGIN_USER_FAILED:
            return { ...state, isLoading: false, error: payload };

        case USER_ACTION_TYPES.SET_ACCESS_TOKEN:
            return { ...state, accessToken: action.payload };

        case USER_ACTION_TYPES.SET_REFRESH_TOKEN:
            return { ...state, refreshToken: action.payload };

        case USER_ACTION_TYPES.SET_ACCESS_TOKEN_EXPIRY:
            return { ...state, accessTokenExpiry: action.payload };

        case USER_ACTION_TYPES.LOGOUT_USER:
            return INITIAL_STATE;
        default:
            return state;
    }
};
