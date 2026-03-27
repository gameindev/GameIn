import socialApi from "../../../../app/services/api/socialApi";
import { SOCIAL_INTEGRATION_ENDPOINTS } from "../api/social_endpoints";


export const socialIntegrationService = {
    unwrap: (response) => {
        const body = response?.data;
        return body?.data ?? body ?? null;
    },
    /**
     * Get connection status for a single platform
     * @param {string} platform - Platform name (TWITCH, INSTAGRAM, X, YOUTUBE, TIKTOK)
     * @returns {Promise<Object>} Connection status with state and label
     */
    getStatus: async (platform) => {
        try {
            const response = await socialApi.get(SOCIAL_INTEGRATION_ENDPOINTS.STATUS, {
                params: { platform }
            });
            return response?.data || null;
        } catch (error) {
            console.error(`Error fetching status for ${platform}:`, error);
            throw error;
        }
    },

    /**
     * Get connection status for all platforms
     * @returns {Promise<Array>} Array of connection statuses for all platforms
     */
    getAllStatuses: async () => {
        try {
            const response = await socialApi.get(SOCIAL_INTEGRATION_ENDPOINTS.STATUS_ALL);
            const body = response?.data;
            return Array.isArray(body) ? body : (body?.data ?? []);
        } catch (error) {
            console.error('Error fetching all statuses:', error);
            throw error;
        }
    },

    /**
     * Get OAuth URL for connecting a platform
     * @param {string} platform - Platform name
     * @returns {Promise<string>} OAuth URL
     */
    getConnectUrl: async (platform) => {
        try {
            const response = await socialApi.get(SOCIAL_INTEGRATION_ENDPOINTS.CONNECT, {
                params: { platform }
            });
            const body = response?.data;
            const url = body?.url ?? body?.data?.url;
            if (!url) throw new Error('Connect URL missing in response');
            return url;
        } catch (error) {
            console.error(`Error getting connect URL for ${platform}:`, error);
            throw error;
        }
    },

    /**
     * Fetch stats for a connected platform
     * @param {string} platform - Platform name
     * @param {number} integrationId - Integration ID
     * @returns {Promise<Object>} Platform stats
     */
    fetchStats: async (platform, integrationId) => {
        try {
            const response = await socialApi.get(SOCIAL_INTEGRATION_ENDPOINTS.STATS, {
                params: { platform, integrationId }
            });
            return socialIntegrationService.unwrap(response);
        } catch (error) {
            console.error(`Error fetching stats for ${platform}:`, error);
            throw error;
        }
    },

    fetchPublicStats: async (userId) => {
        try {
            const response = await socialApi.get(SOCIAL_INTEGRATION_ENDPOINTS.STATS_PUBLIC, {
                params: { userId },
            });
            return socialIntegrationService.unwrap(response) || {};
        } catch (error) {
            console.error(`Error fetching public stats for user ${userId}:`, error);
            throw error;
        }
    },

    syncPlatform: async (platform) => {
        // Avoid sending literal JSON `null` with application/json.
        const response = await socialApi.post(SOCIAL_INTEGRATION_ENDPOINTS.SYNC, {}, {
            params: { platform },
        });
        return socialIntegrationService.unwrap(response);
    },

    disconnectPlatform: async (platform) => {
        const response = await socialApi.delete(SOCIAL_INTEGRATION_ENDPOINTS.DISCONNECT, {
            params: { platform },
        });
        return response?.data || null;
    },
};
