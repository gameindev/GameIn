import { conversationsService } from "../../../features/inbox/services/conversation.service";
import routePaths from "../../router/routes";

const routeService = {
    
    /**
     * Navigate to inbox and open/create conversation with specified user
     * @param {number} targetUserId - The ID of the user to message
     * @param {Function} navigate - React Router navigate function
     * @param {Object} currentUser - Current authenticated user object with id property
     */
    messageRoute: async (targetUserId, navigate, currentUser) => {
        if (!targetUserId || !navigate || !currentUser?.id) {
            console.error('Invalid parameters for messageRoute');
            return;
        }

        try {
            // Fetch all conversations for current user
            const conversations = await conversationsService.getConversations(currentUser.id);
            
            // Find existing direct conversation with target user
            const existingConversation = conversations.find(conv => {
                if (conv.type !== 'DIRECT') return false;
                
                const participants = conv.participants || conv.users || [];
                const participantIds = participants.map(p => {
                    // Handle nested structure: {user: {id}} or flat {id}
                    return p.user ? p.user.id : p.id;
                });
                
                // Check if both current user and target user are participants
                return participantIds.includes(currentUser.id) && participantIds.includes(targetUserId);
            });

            if (existingConversation) {
                // Conversation exists - navigate to inbox with conversation ID
                navigate(`${routePaths.ACCOUNTS.INBOX.CONVERSATION.replace(':conversationId', existingConversation.id)}`);
            } else {
                // Create new conversation
                const newConversation = await conversationsService.createConversation({
                    isGroup: false,
                    users: [{ id: targetUserId }, { id: currentUser.id }],
                    admin_ids: [],
                });

                if (newConversation) {
                    // Navigate to inbox with new conversation ID
                    navigate(`${routePaths.ACCOUNTS.INBOX.CONVERSATION.replace(':conversationId', newConversation.id)}`);
                } else {
                    console.error('Failed to create conversation');
                    // Fallback: navigate to inbox without conversation ID
                    navigate(routePaths.ACCOUNTS.INBOX.ROOT);
                }
            }
        } catch (error) {
            console.error('Error in messageRoute:', error);
            // Fallback: navigate to inbox even if there's an error
            navigate(routePaths.ACCOUNTS.INBOX.ROOT);
        }
    },
}

export default routeService;