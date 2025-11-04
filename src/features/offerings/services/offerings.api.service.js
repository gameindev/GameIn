import api from "../../../app/services/api";
import { OFFERINGS_ENDPOINTS } from "../api/offering_endpoints";

/**
 * Fetch offerings list for a user
 * @param {string} userId - User ID
 * @returns {Promise} - Offerings list
 */
export const fetchOfferingsService = async (userId) => {
    try {
        const response = await api.get(OFFERINGS_ENDPOINTS.DISPLAY_OFFERINGS({
            page: 1,
            limit: 20,
            userId,
            relations: [
                "user",
                "offering_offers",
                "offering_price",
                "last_adjusted_by",
            ],
        }));
        return response?.data?.data || [];
    } catch (error) {
        console.error("Error fetching offerings:", error);
        throw error;
    }
};

/**
 * Fetch a single offering by ID
 * @param {string} offeringId - Offering ID
 * @returns {Promise} - Offering details
 */
export const fetchOfferingByIdService = async (userId, offeringId) => {
    try {
        const response = await api.get(
            OFFERINGS_ENDPOINTS.DISPLAY_OFFERINGS({
                page: 1,
                limit: 20,
                userId,
                offeringId,
                relations: [
                    "user",
                    "offering_offers",
                    "offering_price",
                    "last_adjusted_by",
                    "logo"
                ],
            })
        );
        
        return response?.data?.data || null;
    } catch (error) {
        console.error("Error fetching offering:", error);
        throw error;
    }
};

/**
 * Edit/Update an offering
 * @param {string} offeringId - Offering ID
 * @param {FormData} formData - Form data to send
 * @returns {Promise} - API response
 */
export const editOfferingService = async (offeringId, formData) => {    
    // formData should be FormData and include a key "offering" with stringified JSON data per the prompt.
    // Do not stringify FormData or change its structure; just send as FormData with correct headers.
 
    try {
        const response = await api.patch(
            OFFERINGS_ENDPOINTS.UPDATE(offeringId),
            formData,
            {
                headers: { "Content-Type": "multipart/form-data" }
            }
        );
        return {
            data: response?.data?.data || null,
            statusCode: response?.data?.statusCode || null,
        };
    } catch (error) {
        return {
            data: null,
            statusCode: error?.response?.data?.statusCode || null,
            message: error?.response?.data?.message || error?.message || "Something went wrong",
        };
    }
};

/**
 * Reset an offering
 * @param {string} offeringId - Offering ID
 * @returns {Promise} - API response
 */
export const resetOfferingService = async (offeringId) => {
    try {
        const response = await api.patch(OFFERINGS_ENDPOINTS.RESET(offeringId));
        return response.data;
    } catch (error) {
        console.error("Error resetting offering:", error);
        throw error;
    }
};

/**
 * Delete an offering
 * @param {string} offeringId - Offering ID
 * @returns {Promise} - API response
 */
export const deleteOfferingService = async (offeringId) => {
    try {
        const response = await api.delete(OFFERINGS_ENDPOINTS.DELETE(offeringId));
        return response.data;
    } catch (error) {
        console.error("Error deleting offering:", error);
        throw error;
    }
};

