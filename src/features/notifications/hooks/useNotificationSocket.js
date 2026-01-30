import { useEffect, useCallback } from 'react';
import { useAppDispatch } from '../../../app/store/hooks';
import { addNotification } from '../store/notificationsSlice';
import { getSocket, initSocket } from '../../../app/services/ws/ws.service';
import { getAccessToken } from '../../../app/services/token';

/**
 * Hook to manage WebSocket connection for real-time notifications
 * Also listens for online/offline events to track user status
 */
export const useNotificationSocket = (isConnected = true) => {
    const dispatch = useAppDispatch();

    // Handle incoming notification
    const handleNotification = useCallback((data) => {
        if (data && data.type === 'notification' && data.data) {
            const notification = data.data;
            dispatch(addNotification(notification));
        }
    }, [dispatch]);

    // Setup socket connection and listeners
    useEffect(() => {
        if (!isConnected) return;

        const accessToken = getAccessToken();
        if (!accessToken) return;

        // Get existing socket or initialize new one
        let socket = getSocket();
        if (!socket || !socket.connected) {
            socket = initSocket(accessToken, {
                connect: () => {
                    console.log('Notification socket connected');
                    // Request online users list on connect
                    socket.emit('get_online_users');
                },
                disconnect: () => {
                    console.log('Notification socket disconnected');
                },
            });
        }

        // Listen for notification events
        socket.on('notification', handleNotification);

        // Note: Online/offline events are handled by useOnlineUsers hook
        // to avoid duplicate listeners and provide a reusable hook

        return () => {
            // Remove notification listener only
            if (socket) {
                socket.off('notification', handleNotification);
            }
        };
    }, [isConnected, handleNotification]);

    return {
        socket: getSocket(),
    };
};

