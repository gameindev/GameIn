import { AUTH_ENDPOINTS } from "../../../features/auth/api/authEndpoints";
import { registerUserRequestMapper } from "../../types/registerUserRequest.mapper";


export const createUserService = async (formData, post) => {
    const apiBody = registerUserRequestMapper(formData);

    const headers = {
        "Content-Type": "application/json",
        "X-Captcha-Token": formData.captcha || "",
    };

    try {   
        const {data} = await post({
            url: AUTH_ENDPOINTS.REGISTER,
            payload: apiBody,
            headers: headers
        });
       
        return data;
    } catch (err) {
        throw new Error('Failed to create user');
    }
}

