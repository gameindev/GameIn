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
                console.log("Inbox Socket connected");
                // Request online users list on connect
                s.emit('get_online_users');
            },
            disconnect: () => {
                console.log("Inbox Socket disconnected");
                setOnlineUsers([]);
                setJoinedConversations(new Set());
            },
            user_online: (u) => {
                console.log('Inbox: User came online:', u);
                setOnlineUsers((prev) => {
                    const filtered = prev.filter((x) => (x.userId ?? x.id) !== (u.userId ?? u.id));
                    return [...filtered, u];
                });
            },
            user_offline: (u) => {
                console.log('Inbox: User went offline:', u);
                setOnlineUsers((prev) => prev.filter((x) => (x.userId ?? x.id) !== (u.userId ?? u.id)));
            },
            online_users_list: (users) => {
                console.log('Inbox: Online users list received:', users);
                const filtered = users.filter((u) => (u.userId ?? u.id) !== user.id);
                console.log('Inbox: Filtered online users (excluding self):', filtered);
                setOnlineUsers(filtered);
            },
            messages: handleIncomingMessage,
            message_delivered: handleMessageDelivered,
            message_read: handleMessageRead,
        });

        // Request online users list if socket is already connected
        if (s && s.connected) {
            s.emit('get_online_users');
        }

        // Don't disconnect socket on cleanup - it's shared with other parts of the app
        // Just remove event listeners
        return () => {
            if (s) {
                s.off('user_online');
                s.off('user_offline');
                s.off('online_users_list');
                s.off('messages', handleIncomingMessage);
                s.off('message_delivered', handleMessageDelivered);
                s.off('message_read', handleMessageRead);
            }
        };
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
