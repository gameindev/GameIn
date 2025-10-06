import { API_PATHS } from "../../services/endpoints/index";
import useApi from "../../hooks/useApi";

export function useInboxApi() {
    const { get, post } = useApi();

    return {
        fetchFriends: async (userId) => {
            const res = await get({
                url: API_PATHS.FOLLOW.GET_FOLLOWING(userId),
                params: { user_id: userId },
            });
            return res?.data || [];
        },

        createConversation: async (payload) => {
            const res = await post({
                url: API_PATHS.CONVERSATION.CREATE,
                payload
            })

            return res?.data || []
        },


        getAllConversation: async (userId) => {
            const res = await get({
                url: API_PATHS.CONVERSATION.LIST(userId),
            });

            return res?.data || []
        }
    };
}
