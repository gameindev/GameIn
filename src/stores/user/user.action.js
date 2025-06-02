import { createAction } from "../../utils/reducer/reducer.utils";
import { USER_ACTION_TYPES } from "./user.types";
import {jwtDecode} from 'jwt-decode';

export const setCurrentUser = (user) =>
    createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user); // return {type: 'user/SET_CURRENT_USER', payload: user}

// dispatch(setCurrentUser(user)) // {type: 'user/SET_CURRENT_USER', payload: user}

// export const fetchUserStart = () =>
//     createAction(USER_ACTION_TYPES.FETCH_USER_START);



/**
 * THUNK ACTIONS
 * */
export const registerUserAsync = (formData) => async (dispatch) => {
    dispatch({ type: USER_ACTION_TYPES.REGISTER_USER_START });

    try {
        const apiBody = {
            username: formData.username,
            email: formData.email,
            password: formData.password,
            userType: formData.role?.toUpperCase() || "USER",
            dateOfBirth: formatDate(formData.dob),
            isActive: true,
            isVerified: false,
        };

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Captcha-Token": formData.captcha || "",
            },
            body: JSON.stringify(apiBody),
        });

        const contentType = response.headers.get("content-type");
        const isJson = contentType && contentType.includes("application/json");
        const data = isJson ? await response.json() : null;

        if (!response.ok) {
            let message = "Something went wrong.";
            if (response.status === 404) {
                message = "API endpoint not found (404). Backend might be down.";
            } else if (response.status >= 500) {
                message = "Server error. Please try again later.";
            } else if (data?.message) {
                message = data.message;
            }
            throw new Error(message);
        }

        if (data?.error) {
            throw new Error(data.error || "API returned an error.");
        }

        dispatch({
            type: USER_ACTION_TYPES.REGISTER_USER_SUCCESS,
            payload: data.user || data,
        });

        return { success: true, data: data.user || data };

    } catch (error) {
        dispatch({
            type: USER_ACTION_TYPES.REGISTER_USER_FAILED,
            payload: error.message,
        });

        return { success: false, error: error.message };
    }
};

function formatDate(dobStr) {
    if (!dobStr) return '';
    const [year, month, day] = dobStr.split('-');
    return `${day}-${month}-${year}`;
}




/**
 * THUNK ACTIONS
 * */
export const loginUserAsync = (credentials) => async (dispatch) => {
    dispatch({ type: USER_ACTION_TYPES.LOGIN_USER_START });

    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/sign-in`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
        });

        // eslint-disable-next-line no-debugger
        // debugger;
        const { data } = await response.json();
        console.log(response);


        if (!response.ok) throw new Error(data.message || "Login failed");

        const decoded = jwtDecode(data?.accessToken);
        console.log(decoded);
        
        dispatch({
            type: USER_ACTION_TYPES.LOGIN_USER_SUCCESS,
            payload: {
                user: data.user,
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
                accessTokenExpiry: decoded.exp * 1000, // in ms
            },
        });

        return { success: true, data: data.user };
    } catch (error) {
        dispatch({ type: USER_ACTION_TYPES.LOGIN_USER_FAILED, payload: error.message });
        return { success: false, error: error.message };
    }
};


export const setAccessToken = (token) => ({
    type: USER_ACTION_TYPES.SET_ACCESS_TOKEN,
    payload: token,
});

export const setRefreshToken = (token) => ({
    type: USER_ACTION_TYPES.SET_REFRESH_TOKEN,
    payload: token,
});

export const logoutUser = () => ({
    type: USER_ACTION_TYPES.LOGOUT_USER,
});

