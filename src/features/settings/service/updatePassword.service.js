import api from "../../../app/services/api";
import { USER_ENDPOINTS } from "../../auth/api/userEndpoints";


const updatePasswordService = async (userId, password) => {
    const response = await api.patch(USER_ENDPOINTS.UPDATE, {
        id: userId,
        password,
    });
    return response.data;
}

export { updatePasswordService };