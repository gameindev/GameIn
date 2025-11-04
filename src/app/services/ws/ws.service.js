// wsService.js
import { io } from "socket.io-client";

let socket = null;

/**
 * Initialize the WebSocket connection
 * @param {string} token - JWT access token
 * @param {function} onEvents - object with event handlers
 */
export function initSocket(token, onEvents = {}) {
    if (socket?.connected) return socket;

    // ✅ Use secure WSS endpoint from environment
    const socketUrl = import.meta.env.VITE_CHAT_SOCKET_URL || "wss://backend-app-ifeze.ondigitalocean.app";

    socket = io(socketUrl, {
        transports: ["websocket"], // no polling fallback
        path: "/socket.io",
        auth: {
            token: `Bearer ${token}`,
        },
    });

    // Bind provided event handlers dynamically
    Object.entries(onEvents).forEach(([event, handler]) => {
        if (typeof handler === "function") socket.on(event, handler);
    });

    return socket;
}

/**
 * Join a specific conversation room
 */
export function joinConversation(conversationId) {
    if (!socket || !conversationId) return;
    socket.emit("join_conversation", { conversationId });
}

/**
 * Send message to a conversation
 */
export function sendMessage(conversationId, content, attachments = [], type = 'TEXT', clientMsgId = null) {
    if (!socket || !conversationId) return;

    const messageData = {
        conversationId,
        content,
        attachments,
        type,
        timestamp: new Date().toISOString()
    };

    // Include client_msg_id if provided
    if (clientMsgId) {
        messageData.client_msg_id = clientMsgId;
    }

    console.log('Sending WebSocket message:', messageData);
    socket.emit("send_message", messageData);
}

/**
 * Leave a conversation room
 */
export function leaveConversation(conversationId) {
    if (!socket || !conversationId) return;
    socket.emit("leave_conversation", { conversationId });
}

/**
 * Get online users list
 */
export function getOnlineUsers() {
    if (!socket) return;
    socket.emit("get_online_users");
}

/**
 * Get conversation users
 */
export function getConversationUsers(conversationId) {
    if (!socket || !conversationId) return;
    socket.emit("get_conversation_users", { conversationId });
}

/**
 * Send user activity (heartbeat)
 */
export function sendUserActivity() {
    if (!socket) return;
    socket.emit("user_activity");
}

/**
 * Disconnect the socket safely
 */
export function disconnectSocket() {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
}

/**
 * Get the current socket instance
 */
export function getSocket() {
    return socket;
}
