import api from "../../../app/services/api";
import { USER_ENDPOINTS } from "../../auth/api/userEndpoints";


const updateAccountService = async (userId, email, username, language, timezone, birthday) => {
    const response = await api.patch(USER_ENDPOINTS.UPDATE, {
        id: userId,
        email,
        username,
        language,
        timezone,
        date_of_birth: birthday,
    });
    return response.data;
}

export { updateAccountService };