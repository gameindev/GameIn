import { useCallback } from 'react';
import api from '../../../app/services/api';
import { NOTIFICATION_ENDPOINTS } from '../../notifications/api/notifications.api';

/**
 * Notification Preferences Service
 */
export const useNotificationPreferencesService = () => {
    /**
     * Get user notification preferences
     */
    const getPreferences = useCallback(async () => {
        try {
            console.log('Fetching preferences from:', NOTIFICATION_ENDPOINTS.GET_PREFERENCES);
            const response = await api.get(NOTIFICATION_ENDPOINTS.GET_PREFERENCES);
            console.log('Raw API response:', response);
            
            // Backend returns: { success: true, data: [...] }
            // Extract the data array from the response
            const responseData = response?.data || {};
            console.log('Response data:', responseData);
            const preferences = responseData.data || responseData;
            console.log('Extracted preferences:', preferences);
            
            // Ensure we always return an array
            if (Array.isArray(preferences)) {
                console.log('Returning preferences array with', preferences.length, 'items');
                return preferences;
            }
            
            // If it's not an array, log and return empty array
            console.warn('Preferences response is not an array:', preferences);
            return [];
        } catch (error) {
            console.error('Error fetching preferences:', error);
            console.error('Error details:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
            });
            // Re-throw the error so the hook can handle it properly
            throw error;
        }
    }, []);

    /**
     * Update a single notification preference
     * @param {string} type - Notification type (e.g., 'NEW_MESSAGE')
     * @param {string} channel - Channel (e.g., 'EMAIL', 'PUSH')
     * @param {boolean} enabled - Whether enabled
     */
    const updatePreference = useCallback(async (type, channel, enabled) => {
        const response = await api.put(NOTIFICATION_ENDPOINTS.UPDATE_PREFERENCE, {
            type,
            channel,
            enabled,
        });
        return response.data?.data || response.data;
    }, []);

    /**
     * Update multiple preferences in batch
     * @param {Array} preferences - Array of { type, channel, enabled }
     */
    const updatePreferencesBatch = useCallback(async (preferences) => {
        const response = await api.put(NOTIFICATION_ENDPOINTS.UPDATE_PREFERENCES_BATCH, {
            preferences,
        });
        return response.data?.data || response.data || [];
    }, []);

    return {
        getPreferences,
        updatePreference,
        updatePreferencesBatch,
    };
};

