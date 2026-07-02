import { USER_FAVOURITE_ENDPOINTS } from "../../api/user_favourite_endpoints";
import api from "../api";
import { normalizeAndEnrichUsers } from "./enrich-user-profile.service";

const userFavouriteService = {
    /**
     * Add a user to favourites
     * @param {number} userId - The user who is adding the favourite
     * @param {number} favouriteUserId - The user to be added as favourite
     * @returns {Promise<Object>} The created favourite object
     */
    addFavourite: async (userId, favouriteUserId) => {
        try {
            const response = await api.post(USER_FAVOURITE_ENDPOINTS.ADD_FAVOURITE, {
                user_id: userId,
                favourite_user_id: favouriteUserId,
            });
            return response?.data?.data || response?.data || response;
        } catch (error) {
            console.error("Error adding favourite:", error);
            throw error;
        }
    },

    /**
     * Remove a user from favourites
     * @param {number} userId - The user who is removing the favourite
     * @param {number} favouriteUserId - The user to be removed from favourites
     * @returns {Promise<void>}
     */
    removeFavourite: async (userId, favouriteUserId) => {
        try {
            await api.delete(USER_FAVOURITE_ENDPOINTS.REMOVE_FAVOURITE, {
                data: {
                    user_id: userId,
                    favourite_user_id: favouriteUserId,
                },
            });
        } catch (error) {
            console.error("Error removing favourite:", error);
            throw error;
        }
    },

    /**
     * Get list of favourite users
     * @param {number} userId - The user whose favourites to fetch
     * @returns {Promise<Array>} Array of favourite users
     */
    listFavourites: async (userId) => {
        try {
            const response = await api.post(USER_FAVOURITE_ENDPOINTS.LIST_FAVOURITES, {
                user_id: userId,
            });
            // Extract favourite_user from each item in the response
            const favourites = response?.data?.data || response?.data || [];
            // Map to extract the favourite_user object from each UserFavourite entity
            return normalizeAndEnrichUsers(favourites, { forceRefresh: true });
        } catch (error) {
            console.error("Error fetching favourites:", error);
            throw error;
        }
    },

    /**
     * Check if a user is favourited
     * @param {number} userId - The user who might have favourited
     * @param {number} favouriteUserId - The user to check
     * @returns {Promise<boolean>}
     */
    isFavourited: async (userId, favouriteUserId) => {
        try {
            const favourites = await userFavouriteService.listFavourites(userId);
            return favourites.some((fav) => fav.id === favouriteUserId);
        } catch (error) {
            console.error("Error checking favourite:", error);
            return false;
        }
    },
};

export { userFavouriteService };

