

export const CHAT_ENDPOINTS = {
    CREATE: "/chat/create-conversation",
    LIST: "/chat/conversations",
    MESSAGES: (conversationId) => `/chat/messages/${conversationId}`,
    MARK_MESSAGE_READ: (messageId) => `/chat/messages/${messageId}/read`,
    MARK_CONVERSATION_READ: (conversationId) => `/chat/conversations/${conversationId}/read`,
    DELETE_MESSAGE: (messageId) => `/chat/messages/${messageId}/delete`,
    MESSAGE_DELIVERY_STATUS: (messageId) => `/chat/messages/${messageId}/delivery-status`,
    CONVERSATION_STATS: (conversationId) => `/chat/conversations/${conversationId}/stats`,
    UNREAD_COUNT: (conversationId) => `/chat/conversations/${conversationId}/unread-count`,
    CONVERSATION: (conversationId) => `/chat/conversations/${conversationId}`,
    ACKNOWLEDGE_MESSAGE: (messageId) => `/chat/messages/${messageId}`,
}