import { FOLLOW_ENDPOINTS } from "../../../app/api/follow_endpoints";
import api from "../../../app/services/api";
import { normalizeAndEnrichUsers } from "../../../app/services/user/enrich-user-profile.service";


// Fetch followers
const followersService = {
    fetchFollowers: async (userId) => {
        try {
            const response = await api.get(FOLLOW_ENDPOINTS.GET_FOLLOWERS(userId));
            // Assuming response?.data?.data or response?.data as array of followers, update as per actual API structure
            return normalizeAndEnrichUsers(response?.data?.data || response?.data || []);
        } catch (error) {
            console.error("Error fetching followers:", error);
            throw error;
        }
    },

    fetchFollowing: async (userId) => {
        try {
            const response = await api.get(FOLLOW_ENDPOINTS.GET_FOLLOWING(userId));
            // Assuming response?.data?.data or response?.data as array of following users
            return normalizeAndEnrichUsers(response?.data?.data || response?.data || []);
        } catch (error) {
            console.error("Error fetching following:", error);
            throw error;
        }
    },
};

export { followersService };
