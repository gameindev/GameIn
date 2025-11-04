import api from "../../../app/services/api";
import { CHAT_ENDPOINTS } from "../api/chat_endpoints";

/**
 * Message API service for handling chat messages
 */
const messageApi = {
    /**
     * Fetch messages for a conversation with pagination
     * @param {number} conversationId - Conversation ID
     * @param {number} limit - Number of messages to fetch (default: 50)
     * @param {number} offset - Offset for pagination (default: 0)
     * @returns {Promise<Array>} Array of messages
     */
    fetchMessages: async (conversationId, limit = 50, offset = 0) => {
        try {
            const response = await api.get(CHAT_ENDPOINTS.MESSAGES(conversationId), {
                params: {
                    limit,
                    offset,
                },
            });
            // console.log('Messages API Response:', response?.data);
            return response?.data?.data || [];
        } catch (error) {
            console.error('Error fetching messages:', error);
            throw error;
        }
    },

    /**
     * Mark a specific message as read
     * @param {string} messageId - Message ID (client_msg_id)
     * @returns {Promise<Object>} Response data
     */
    markMessageAsRead: async (messageId) => {
        try {
            const response = await api.post(CHAT_ENDPOINTS.MARK_MESSAGE_READ(messageId));
            // console.log('Mark message as read response:', response?.data);
            return response?.data;
        } catch (error) {
            console.error('Error marking message as read:', error);
            throw error;
        }
    },

    /**
     * Mark all messages in a conversation as read
     * @param {number} conversationId - Conversation ID
     * @returns {Promise<Object>} Response data
     */
    markConversationAsRead: async (conversationId) => {
        try {
            const response = await api.post(CHAT_ENDPOINTS.MARK_CONVERSATION_READ(conversationId));
            // console.log('Mark conversation as read response:', response?.data);
            return response?.data;
        } catch (error) {
            console.error('Error marking conversation as read:', error);
            throw error;
        }
    },

    /**
     * Delete a message
     * @param {string} messageId - Message ID (client_msg_id)
     * @returns {Promise<Object>} Response data
     */
    deleteMessage: async (messageId) => {
        try {
            const response = await api.post(CHAT_ENDPOINTS.DELETE_MESSAGE(messageId));
            // console.log('Delete message response:', response?.data);
            return response?.data;
        } catch (error) {
            console.error('Error deleting message:', error);
            throw error;
        }
    },

    /**
     * Get message delivery status
     * @param {string} messageId - Message ID (client_msg_id)
     * @returns {Promise<Object>} Delivery status data
     */
    getMessageDeliveryStatus: async (messageId) => {
        try {
            const response = await api.get(CHAT_ENDPOINTS.MESSAGE_DELIVERY_STATUS(messageId));
            // console.log('Message delivery status response:', response?.data);
            return response?.data;
        } catch (error) {
            console.error('Error fetching message delivery status:', error);
            throw error;
        }
    },

    /**
     * Get conversation statistics
     * @param {number} conversationId - Conversation ID
     * @returns {Promise<Object>} Conversation stats
     */
    getConversationStats: async (conversationId) => {
        try {
            const response = await api.get(CHAT_ENDPOINTS.CONVERSATION_STATS(conversationId));
            // console.log('Conversation stats response:', response?.data);
            return response?.data;
        } catch (error) {
            console.error('Error fetching conversation stats:', error);
            throw error;
        }
    },

    /**
     * Get unread message count for a conversation
     * @param {number} conversationId - Conversation ID
     * @returns {Promise<number>} Unread count
     */
    getUnreadCount: async (conversationId) => {
        try {
            const response = await api.get(CHAT_ENDPOINTS.UNREAD_COUNT(conversationId));
            // console.log('Unread count response:', response?.data);
            return response?.data?.unreadCount || 0;
        } catch (error) {
            console.error('Error fetching unread count:', error);
            throw error;
        }
    },

    /**
     * Acknowledge a message
     * @param {string} messageId - Message ID (client_msg_id)
     * @returns {Promise<Object>} Response data
     */
    acknowledgeMessage: async (messageId) => {
        try {
            const response = await api.patch(CHAT_ENDPOINTS.ACKNOWLEDGE_MESSAGE(messageId));
            // console.log('Acknowledge message response:', response?.data);
            return response?.data;
        } catch (error) {
            console.error('Error acknowledging message:', error);
            throw error;
        }
    },
};

/**
 * Message service with normalized API calls
 */
export const messageService = {
    getMessages: (conversationId, limit, offset) => messageApi.fetchMessages(conversationId, limit, offset),
    markAsRead: (messageId) => messageApi.markMessageAsRead(messageId),
    markConversationAsRead: (conversationId) => messageApi.markConversationAsRead(conversationId),
    deleteMessage: (messageId) => messageApi.deleteMessage(messageId),
    getDeliveryStatus: (messageId) => messageApi.getMessageDeliveryStatus(messageId),
    getStats: (conversationId) => messageApi.getConversationStats(conversationId),
    getUnreadCount: (conversationId) => messageApi.getUnreadCount(conversationId),
    acknowledgeMessage: (messageId) => messageApi.acknowledgeMessage(messageId),
};
