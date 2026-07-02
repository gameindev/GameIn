import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useNotificationService } from '../services/notifications.service';

// Async thunks
export const fetchNotifications = createAsyncThunk(
    'notifications/fetchNotifications',
    async (params = {}, { rejectWithValue }) => {
        try {
            const service = useNotificationService();
            const response = await service.getNotifications(params);
            // Backend returns { success: true, data: [...], total: number }
            // Service returns response.data which should be the full response object
            return response;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to fetch notifications');
        }
    }
);

export const markNotificationAsRead = createAsyncThunk(
    'notifications/markAsRead',
    async (notificationId, { rejectWithValue }) => {
        try {
            const service = useNotificationService();
            await service.markAsRead(notificationId);
            return notificationId;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to mark notification as read');
        }
    }
);

export const markAllNotificationsAsRead = createAsyncThunk(
    'notifications/markAllAsRead',
    async (_, { rejectWithValue, dispatch, getState }) => {
        try {
            const service = useNotificationService();
            await service.markAllAsRead();

            const state = getState().notifications;
            const reloadLimit = Math.max(state.notifications?.length || 0, state.limit || 5, 5);
            await dispatch(fetchNotifications({ limit: reloadLimit, offset: 0 })).unwrap();

            return true;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to mark all notifications as read');
        }
    }
);

export const deleteNotification = createAsyncThunk(
    'notifications/deleteNotification',
    async (notificationId, { rejectWithValue }) => {
        try {
            const service = useNotificationService();
            await service.deleteNotification(notificationId);
            return notificationId;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to delete notification');
        }
    }
);

const initialState = {
    notifications: [],
    unreadCount: 0,
    total: 0,
    loading: false,
    error: null,
    hasMore: true,
    offset: 0,
    limit: 5, // Load 5 notifications at a time
    lastFetched: null,
};

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        addNotification: (state, action) => {
            // Ensure state.notifications is always an array
            if (!Array.isArray(state.notifications)) {
                state.notifications = [];
            }
            
            const notification = action.payload;
            // Check if notification already exists
            const exists = state.notifications.some(n => n.id === notification.id);
            if (!exists) {
                state.notifications.unshift(notification);
                state.total += 1;
                if (!notification.read_at) {
                    state.unreadCount += 1;
                }
            }
        },
        updateNotification: (state, action) => {
            // Ensure state.notifications is always an array
            if (!Array.isArray(state.notifications)) {
                state.notifications = [];
                return;
            }
            
            const { id, ...updates } = action.payload;
            const index = state.notifications.findIndex(n => n.id === id);
            if (index !== -1) {
                const wasUnread = !state.notifications[index].read_at;
                state.notifications[index] = { ...state.notifications[index], ...updates };
                const isUnread = !state.notifications[index].read_at;
                
                // Update unread count
                if (wasUnread && !isUnread) {
                    state.unreadCount = Math.max(0, state.unreadCount - 1);
                } else if (!wasUnread && isUnread) {
                    state.unreadCount += 1;
                }
            }
        },
        removeNotification: (state, action) => {
            // Ensure state.notifications is always an array
            if (!Array.isArray(state.notifications)) {
                state.notifications = [];
                return;
            }
            
            const notificationId = action.payload;
            const notification = state.notifications.find(n => n.id === notificationId);
            if (notification && !notification.read_at) {
                state.unreadCount = Math.max(0, state.unreadCount - 1);
            }
            state.notifications = state.notifications.filter(n => n.id !== notificationId);
            state.total = Math.max(0, state.total - 1);
        },
        setUnreadCount: (state, action) => {
            state.unreadCount = action.payload;
        },
        clearNotifications: (state) => {
            state.notifications = [];
            state.unreadCount = 0;
            state.total = 0;
            state.hasMore = true;
            state.offset = 0;
        },
        resetOffset: (state) => {
            state.offset = 0;
        },
    },
    extraReducers: (builder) => {
        // Fetch notifications
        builder
            .addCase(fetchNotifications.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNotifications.fulfilled, (state, action) => {
                state.loading = false;
                // API response structure: { apiVersion, status, data: { success: true, data: [...], total: number } }
                // Service returns response.data which is: { success: true, data: [...], total: number }
                const response = action.payload;
                
                // Extract the actual notifications array and total
                // response is { success: true, data: Array(5), total: 14 }
                // So the array is at response.data and total is at response.total
                let fetchedNotifications = [];
                let total = 0;
                let unreadFromApi = null;

                if (response?.data && Array.isArray(response.data)) {
                    fetchedNotifications = response.data;
                    total = response.total || response.data.length;
                    unreadFromApi = response.unreadCount;
                } else if (response?.data?.data && Array.isArray(response.data.data)) {
                    fetchedNotifications = response.data.data;
                    total = response.data.total || response.total || fetchedNotifications.length;
                    unreadFromApi = response.data.unreadCount ?? response.unreadCount;
                } else if (Array.isArray(response)) {
                    fetchedNotifications = response;
                    total = response.length;
                }
                
                // Ensure state.notifications is always an array
                if (!Array.isArray(state.notifications)) {
                    state.notifications = [];
                }
                
                const params = action.meta.arg || {};
                const offset = params.offset || 0;
                const limit = params.limit || 5;

                // If offset is 0, replace notifications (initial load)
                // Otherwise, append new notifications (load more)
                if (offset === 0) {
                    state.notifications = fetchedNotifications;
                } else {
                    // Append new notifications, avoiding duplicates
                    const existingIds = new Set(state.notifications.map(n => n.id));
                    const uniqueNew = fetchedNotifications.filter(n => !existingIds.has(n.id));
                    state.notifications = [...state.notifications, ...uniqueNew];
                }

                state.total = total || (Array.isArray(state.notifications) ? state.notifications.length : 0);
                state.unreadCount =
                    unreadFromApi != null
                        ? unreadFromApi
                        : Array.isArray(state.notifications)
                          ? state.notifications.filter((n) => !n.read_at).length
                          : 0;
                
                // hasMore is true if current loaded count is less than total
                const currentCount = Array.isArray(state.notifications) ? state.notifications.length : 0;
                state.hasMore = currentCount < total;
                
                state.offset = currentCount;
                state.lastFetched = new Date().toISOString();
            })
            .addCase(fetchNotifications.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Mark as read
        builder
            .addCase(markNotificationAsRead.fulfilled, (state, action) => {
                // Ensure state.notifications is always an array
                if (!Array.isArray(state.notifications)) {
                    state.notifications = [];
                    return;
                }
                
                const notificationId = action.payload;
                const notification = state.notifications.find(n => n.id === notificationId);
                if (notification && !notification.read_at) {
                    notification.read_at = new Date().toISOString();
                    notification.status = 'READ';
                    state.unreadCount = Math.max(0, state.unreadCount - 1);
                }
            });

        // Mark all as read
        builder
            .addCase(markAllNotificationsAsRead.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(markAllNotificationsAsRead.fulfilled, (state) => {
                state.loading = false;
                if (!Array.isArray(state.notifications)) {
                    state.notifications = [];
                }
                state.notifications.forEach((n) => {
                    if (!n.read_at) {
                        n.read_at = new Date().toISOString();
                        n.status = 'READ';
                    }
                });
                state.unreadCount = 0;
            })
            .addCase(markAllNotificationsAsRead.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Delete notification
        builder
            .addCase(deleteNotification.fulfilled, (state, action) => {
                // Ensure state.notifications is always an array
                if (!Array.isArray(state.notifications)) {
                    state.notifications = [];
                    state.total = 0;
                    return;
                }
                
                const notificationId = action.payload;
                const notification = state.notifications.find(n => n.id === notificationId);
                if (notification && !notification.read_at) {
                    state.unreadCount = Math.max(0, state.unreadCount - 1);
                }
                state.notifications = state.notifications.filter(n => n.id !== notificationId);
                state.total = Math.max(0, state.total - 1);
            });
    },
});

export const {
    addNotification,
    updateNotification,
    removeNotification,
    setUnreadCount,
    clearNotifications,
    resetOffset,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;

