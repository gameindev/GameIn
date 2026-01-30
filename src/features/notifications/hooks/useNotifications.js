import { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import {
    fetchNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    deleteNotification,
    addNotification,
    updateNotification,
} from '../store/notificationsSlice';
import { useNotificationSocket } from './useNotificationSocket';
import { useOnlineUsers } from './useOnlineUsers';
import { useSelector } from 'react-redux';
import { isLoggedIn } from '../../../features/auth/store/selector';

/**
 * Main hook for managing notifications
 */
export const useNotifications = (autoFetch = true) => {
    const dispatch = useAppDispatch();
    const isLoggedInUser = useSelector(isLoggedIn);
    
    // Get notifications from store
    const notifications = useAppSelector((state) => state.notifications?.notifications || []);
    const unreadCount = useAppSelector((state) => state.notifications?.unreadCount || 0);
    const loading = useAppSelector((state) => state.notifications?.loading || false);
    const error = useAppSelector((state) => state.notifications?.error);
    const total = useAppSelector((state) => state.notifications?.total || 0);
    const hasMore = useAppSelector((state) => state.notifications?.hasMore || true);

    // Setup WebSocket for real-time notifications
    useNotificationSocket(isLoggedInUser);
    
    // Setup online users tracking (uses same WebSocket connection)
    useOnlineUsers();

    // Get current offset from store
    const offset = useAppSelector((state) => state.notifications?.offset || 0);
    const limit = useAppSelector((state) => state.notifications?.limit || 5);

    // Fetch notifications on mount - initial load of 5
    useEffect(() => {
        if (autoFetch && isLoggedInUser) {
            dispatch(fetchNotifications({ limit: 5, offset: 0 }));
        }
    }, [autoFetch, isLoggedInUser, dispatch]);

    // Mark notification as read (keeps notification, just marks as read)
    const markAsRead = useCallback((notificationId) => {
        dispatch(markNotificationAsRead(notificationId));
    }, [dispatch]);

    // Mark all as read (keeps all notifications, just marks as read)
    const markAllAsRead = useCallback(() => {
        dispatch(markAllNotificationsAsRead());
    }, [dispatch]);

    // Delete notification (removes from list)
    const handleDelete = useCallback((notificationId) => {
        dispatch(deleteNotification(notificationId));
    }, [dispatch]);

    // Refresh notifications (reload from beginning)
    const refresh = useCallback(() => {
        dispatch(fetchNotifications({ limit: 5, offset: 0 }));
    }, [dispatch]);

    // Load more notifications (load next 5)
    const loadMore = useCallback(() => {
        // Double check conditions before dispatching
        if (loading || !hasMore) {
            return;
        }
        
        // Additional safety check: don't load if we already have all notifications
        if (notifications.length >= total && total > 0) {
            return;
        }
        
        dispatch(fetchNotifications({ 
            limit: 5, 
            offset: notifications.length 
        }));
    }, [dispatch, loading, hasMore, notifications.length, total]);

    return {
        notifications,
        unreadCount,
        loading,
        error,
        total,
        hasMore,
        markAsRead,
        markAllAsRead,
        deleteNotification: handleDelete,
        refresh,
        loadMore,
    };
};

