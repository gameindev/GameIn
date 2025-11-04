import api from "../../../../app/services/api";
import { PROFILE_API_ENDPOINTS } from "../api/profileAPIEndpoints";



export const triggerProfileViewApiService = async (type, id) => {
    const response = await api.patch(PROFILE_API_ENDPOINTS.PROFILE_VIEW(type, id));
    return response.data;
}