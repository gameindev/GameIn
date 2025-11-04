import { USER_ENDPOINTS } from "../../auth/api/userEndpoints";
import api from "../../../app/services/api";



const updateCreatorProfileService = async (userId, data) => {
    const response = await api.patch(USER_ENDPOINTS.UPDATE_CREATOR_PROFILE, {
        user_id: userId,
        ...data,
    });
    return response.data;
}

export { updateCreatorProfileService };