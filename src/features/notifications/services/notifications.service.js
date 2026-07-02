import api from '../../../app/services/api';
import { NOTIFICATION_ENDPOINTS } from '../api/notifications.api';

/**
 * Notification Service
 * Handles all notification-related API calls
 */
export const useNotificationService = () => {

    /**
     * Get user notifications
     * @param {Object} params - Query parameters
     * @param {number} params.limit - Number of notifications to fetch
     * @param {number} params.offset - Pagination offset
     * @param {boolean} params.unreadOnly - Filter only unread notifications
     */
    const getNotifications = async (params = {}) => {
        const { limit = 50, offset = 0, unreadOnly = false } = params;
        const response = await api.get(NOTIFICATION_ENDPOINTS.GET_NOTIFICATIONS, {
            params: { limit, offset, unreadOnly },
        });
        return response.data;
    };

    /**
     * Get user notification preferences
     */
    const getPreferences = async () => {
        const response = await api.get(NOTIFICATION_ENDPOINTS.GET_PREFERENCES);
        return response.data;
    };

    /**
     * Update notification preference
     * @param {Object} preference - Preference data
     * @param {string} preference.type - Notification type
     * @param {string} preference.channel - Notification channel
     * @param {boolean} preference.enabled - Whether enabled
     */
    const updatePreference = async (preference) => {
        const response = await api.put(NOTIFICATION_ENDPOINTS.UPDATE_PREFERENCE, preference);
        return response.data;
    };

    /**
     * Mark notification as read
     * @param {number} notificationId - Notification ID
     */
    const markAsRead = async (notificationId) => {
        const response = await api.put(NOTIFICATION_ENDPOINTS.MARK_AS_READ(notificationId));
        return response.data;
    };

    /**
     * Mark all notifications as read
     */
    const markAllAsRead = async () => {
        const response = await api.put(NOTIFICATION_ENDPOINTS.MARK_ALL_AS_READ, {});
        return response.data;
    };

    /**
     * Delete notification
     * @param {number} notificationId - Notification ID
     */
    const deleteNotification = async (notificationId) => {
        const response = await api.delete(NOTIFICATION_ENDPOINTS.DELETE_NOTIFICATION(notificationId));
        return response.data;
    };

    return {
        getNotifications,
        getPreferences,
        updatePreference,
        markAsRead,
        markAllAsRead,
        deleteNotification,
    };
};

