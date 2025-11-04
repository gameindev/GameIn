import { useEffect, useState, useCallback } from "react";
import { getAccessToken } from "../../../app/services/token";
import { disconnectSocket, getSocket, initSocket, joinConversation, leaveConversation } from "../../../app/services/ws/ws.service";

export const useSocketManagement = (user, conversations, onNewMessage = null) => {
    const accessToken = getAccessToken();
    const socket = getSocket();
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [joinedConversations, setJoinedConversations] = useState(new Set());

    // Handle incoming messages
    const handleIncomingMessage = useCallback((messageData) => {
        // console.log('Received message:', messageData);
        if (onNewMessage && typeof onNewMessage === 'function') {
            onNewMessage(messageData);
        }
    }, [onNewMessage]);

    // Handle message delivery confirmation
    const handleMessageDelivered = useCallback((deliveryData) => {
        // console.log('Message delivered:', deliveryData);
        // This will be handled by individual message management hooks
    }, []);

    // Handle message read confirmation
    const handleMessageRead = useCallback((readData) => {
        // console.log('Message read:', readData);
        // This will be handled by individual message management hooks
    }, []);

    // Setup Socket once
    useEffect(() => {
        if (!accessToken) return;

        const s = initSocket(accessToken, {
            connect: () => {
                // console.log("Socket connected");
                // Request online users list on connect
                s.emit('get_online_users');
            },
            disconnect: () => {
                // console.log("Socket disconnected");
                setOnlineUsers([]);
                setJoinedConversations(new Set());
            },
            user_online: (u) => {
                // console.log('User came online:', u);
                setOnlineUsers((prev) => [...prev.filter((x) => x.userId !== u.userId), u]);
            },
            user_offline: (u) => {
                // console.log('User went offline:', u);
                setOnlineUsers((prev) => prev.filter((x) => x.userId !== u.userId));
            },
            online_users_list: (users) => {
                // console.log('Online users list:', users);
                setOnlineUsers(users.filter((u) => u.userId !== user.id));
            },
            messages: handleIncomingMessage,
            message_delivered: handleMessageDelivered,
            message_read: handleMessageRead,
        });

        return () => disconnectSocket();
    }, [accessToken, user.id, handleIncomingMessage, handleMessageDelivered, handleMessageRead]);

    // Join conversations automatically
    useEffect(() => {
        if (!socket || !conversations.length) return;

        conversations.forEach((conversation) => {
            if (!joinedConversations.has(conversation.id)) {
                // console.log('Joining conversation:', conversation.id);
                joinConversation(conversation.id);
                setJoinedConversations(prev => new Set([...prev, conversation.id]));
            }
        });

        // Leave conversations that are no longer in the list
        joinedConversations.forEach(convId => {
            if (!conversations.some(c => c.id === convId)) {
                // console.log('Leaving conversation:', convId);
                leaveConversation(convId);
                setJoinedConversations(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(convId);
                    return newSet;
                });
            }
        });
    }, [socket, conversations, joinedConversations]);

    return {
        socket,
        onlineUsers,
        joinedConversations,
    };
};
