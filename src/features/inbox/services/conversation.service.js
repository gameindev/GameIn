import api from "../../../app/services/api";
import { CHAT_ENDPOINTS } from "../api/chat_endpoints";


const conversationsApi = {
    fetchConversations: async (userId) => {
        const response = await api.get(CHAT_ENDPOINTS.LIST, {
            params: {
                user_id: userId,
                page: 1,
                limit: 20,
            },
        });
        // console.log('Conversations API Response:', response?.data);
        return response?.data?.data || [];
    },

    createConversation: async (conversationData) => {
        const payload = {
            type: conversationData.isGroup ? 'GROUP' : 'DIRECT',
            title: conversationData.isGroup ? conversationData.name : null,
            participant_ids: conversationData.users.map(user => user.id),
            admin_ids: conversationData.admin_ids,
        };

        // console.log('Creating conversation with payload:', payload);
        const response = await api.post(CHAT_ENDPOINTS.CREATE, payload);
        // console.log('Create conversation API response:', response?.data);
        return response?.data?.data || null;
    },
}


export const conversationsService = {
    getConversations: (userId) => conversationsApi.fetchConversations(userId),
    createConversation: (conversationData) => conversationsApi.createConversation(conversationData),
};