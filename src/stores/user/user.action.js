import { createAction } from "../../utils/reducer/reducer.utils";
import { USER_ACTION_TYPES } from "./user.types";

export const setCurrentUser = (user) =>
    createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user); // return {type: 'user/SET_CURRENT_USER', payload: user}

// dispatch(setCurrentUser(user)) // {type: 'user/SET_CURRENT_USER', payload: user}

// export const fetchUserStart = () =>
//     createAction(USER_ACTION_TYPES.FETCH_USER_START);



/**
 * THUNK ACTIONS
 * */
export const registerUserAsync = (formData) => async (dispatch) => {
    dispatch(createAction(USER_ACTION_TYPES.REGISTER_USER_START));
    try {
        const apiBody = {
            username: formData.username,
            email: formData.email,
            password: formData.password,
            userType: formData.role?.toUpperCase() || 'USER',
            dateOfBirth: formatDate(formData.dob),
            isActive: true,
            isVerified: false
        };

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Captcha-Token": formData.captcha || ""
            },
            body: JSON.stringify(apiBody)
        });


        const contentType = response.headers.get("content-type");
        const isJson = contentType && contentType.includes("application/json");

        const data = isJson ? await response.json() : null;

        if (!response.ok) {
            let message = "Something went wrong.";

            if (response.status === 404) {
                message = "API endpoint not found (404). The database or service may be disconnected.";
            } else if (response.status >= 500) {
                message = "Internal server error. Please try again later.";
            } else if (data?.message) {
                message = data.message;
            }

            throw new Error(message);
        }

        if (data?.error) {
            throw new Error(data.error || "API returned an error.");
        }

        dispatch(createAction(USER_ACTION_TYPES.REGISTER_USER_SUCCESS, data.user || data));
        return { success: true, data: data.user || data };

      

    } catch (error) {
        console.error("❌ Registration Error:", error.message);
        dispatch(createAction(USER_ACTION_TYPES.REGISTER_USER_FAILED, error.message));
        return { success: false, error: error.message };
    }
};

function formatDate(dobStr) {
    if (!dobStr) return '';
    const [year, month, day] = dobStr.split('-');
    return `${day}-${month}-${year}`;
}
