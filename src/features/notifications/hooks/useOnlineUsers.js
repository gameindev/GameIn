import { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { getSocket, initSocket } from '../../../app/services/ws/ws.service';
import { getAccessToken } from '../../../app/services/token';
import { currentUser } from '../../../features/auth/store/selector';
import {
    setOnlineUsers,
    addOnlineUser,
    removeOnlineUser,
    clearOnlineUsers,
    selectOnlineUsers,
} from '../store/onlineUsersSlice';

/**
 * Hook to track online users globally using the notification WebSocket connection
 * This can be used anywhere in the app to check if a user is online
 */
export const useOnlineUsers = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(currentUser);
    const onlineUsers = useAppSelector(selectOnlineUsers);

    // Handle user coming online
    const handleUserOnline = useCallback((userData) => {
        dispatch(addOnlineUser(userData));
    }, [dispatch]);

    // Handle user going offline
    const handleUserOffline = useCallback((userData) => {
        dispatch(removeOnlineUser(userData));
    }, [dispatch]);

    // Handle initial online users list
    const handleOnlineUsersList = useCallback((users) => {
        // Filter out current user
        const filtered = users.filter((u) => (u.userId || u.id) !== user?.id);
        dispatch(setOnlineUsers(filtered));
    }, [user?.id, dispatch]);

    // Setup socket listeners
    useEffect(() => {
        // Clear online users if user is not logged in
        if (!user?.id) {
            dispatch(clearOnlineUsers());
            return;
        }

        const accessToken = getAccessToken();
        if (!accessToken) {
            dispatch(clearOnlineUsers());
            return;
        }

        // Get existing socket or initialize new one
        let socket = getSocket();
        if (!socket || !socket.connected) {
            socket = initSocket(accessToken, {
                connect: () => {
                    console.log('Online users socket connected');
                    // Request online users list on connect
                    socket.emit('get_online_users');
                },
                disconnect: () => {
                    console.log('Online users socket disconnected');
                    dispatch(clearOnlineUsers());
                },
            });
        }

        // Listen for online/offline events
        socket.on('user_online', handleUserOnline);
        socket.on('user_offline', handleUserOffline);
        socket.on('online_users_list', handleOnlineUsersList);

        // Request online users list if already connected
        if (socket.connected) {
            socket.emit('get_online_users');
        }

        return () => {
            if (socket) {
                socket.off('user_online', handleUserOnline);
                socket.off('user_offline', handleUserOffline);
                socket.off('online_users_list', handleOnlineUsersList);
            }
        };
    }, [user?.id, handleUserOnline, handleUserOffline, handleOnlineUsersList, dispatch]);

    /**
     * Check if a specific user is online
     * @param {number} userId - User ID to check
     * @returns {boolean}
     */
    const isUserOnline = useCallback((userId) => {
        return onlineUsers.some((u) => (u.userId || u.id) === userId);
    }, [onlineUsers]);

    return {
        onlineUsers,
        isUserOnline,
    };
};

