import api from "../../../app/services/api";
import { OFFERINGS_ENDPOINTS } from "../api/offering_endpoints";

/**
 * Create a new offering
 * @param {Object} payload - Offering payload data
 * @returns {Promise} - API response
 */
export const createOfferingService = async (payload) => {
    try {
        const response = await api.post(OFFERINGS_ENDPOINTS.CREATE, payload);
        return response.data;
    } catch (error) {
        console.error("Error creating offering:", error);
        throw error;
    }
};

