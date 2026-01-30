/**
 * Notification API endpoints
 */
export const NOTIFICATION_ENDPOINTS = {
    GET_NOTIFICATIONS: '/notifications',
    GET_PREFERENCES: '/notifications/preferences',
    UPDATE_PREFERENCE: '/notifications/preferences',
    UPDATE_PREFERENCES_BATCH: '/notifications/preferences/batch',
    MARK_AS_READ: (id) => `/notifications/${id}/read`,
    MARK_ALL_AS_READ: '/notifications/read-all',
    DELETE_NOTIFICATION: (id) => `/notifications/${id}`,
};

