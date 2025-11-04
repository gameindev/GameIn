import { useCallback, useEffect, useState } from "react";
import { useConversations } from "./useConversation";
import { conversationsService } from "../services/conversation.service";
import { joinConversation } from "../../../app/services/ws/ws.service";
import { showNotificationHelper } from "../../../shared/utils/helpers/showNotification.helper";
import { NOTIFICATION_TYPES } from "../../../shared/enums/notificationTypesEnum";

export const useConversationManagement = (user) => {
    const { conversations: apiConversations, loading: conversationsLoading } = useConversations(user?.id);
    const [conversations, setConversations] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);

    // Sync API conversations with local state
    useEffect(() => {
        // console.log('API Conversations:', apiConversations);
        if (apiConversations) {
            // Normalize API conversations to handle nested participant structure
            const normalizedConversations = apiConversations.map(conv => {
                if (Array.isArray(conv.participants) && conv.participants.length > 0) {
                    // Extract user objects from nested structure
                    const participants = conv.participants.map(p => p.user || p);
                    return {
                        ...conv,
                        participants,
                        users: participants, // Ensure both properties exist
                        unreadCount: conv.unreadCount || 0,
                        lastMessage: conv.lastMessage || null,
                    };
                }
                return conv;
            });
            
            // console.log('Normalized conversations:', normalizedConversations);
            setConversations(normalizedConversations);
        }
    }, [apiConversations]);

    // Handle new message notifications
    const handleNewMessage = useCallback((messageData) => {
        if (!messageData || !messageData.conversationId) return;

        setConversations(prev => prev.map(conv => {
            if (conv.id === messageData.conversationId) {
                return {
                    ...conv,
                    lastMessage: {
                        content: messageData.content,
                        timestamp: messageData.timestamp,
                        sender: messageData.username,
                        type: messageData.type || 'TEXT',
                    },
                    unreadCount: (conv.unreadCount || 0) + 1,
                    unread: true,
                };
            }
            return conv;
        }));
    }, []);

    // Mark conversation as read
    const markConversationAsRead = useCallback((conversationId) => {
        setConversations(prev => prev.map(conv => {
            if (conv.id === conversationId) {
                return {
                    ...conv,
                    unreadCount: 0,
                    unread: false,
                };
            }
            return conv;
        }));
    }, []);



    // Handler functions
    const handleSelectConversation = useCallback(
        (conversation) => {
            setSelectedConversation(conversation);
            if (conversation?.id) {
                joinConversation(conversation.id);
            }
        },
        []
    );



    const handleNewConversation = useCallback(
        (conversation) => {
            // console.log('Adding new conversation:', conversation);
            setConversations(prev => {
                // Check if conversation already exists to avoid duplicates
                const exists = prev.some(c => c.id === conversation.id);
                if (exists) {
                    // console.log('Conversation already exists, updating instead');
                    return prev.map(c => c.id === conversation.id ? conversation : c);
                }
                // console.log('Adding new conversation to list');
                return [conversation, ...prev];
            });
        },
        []
    );

    // Helper function to check for existing conversations
    const checkForExistingConversation = useCallback((participantIds, isGroup, groupName) => {
        return conversations.find(conv => {
            // For direct messages, check if participants match exactly
            if (!isGroup && conv.type === 'DIRECT') {
                const convParticipantIds = conv.participants?.map(p => p.id) || conv.users?.map(u => u.id) || [];
                return convParticipantIds.length === participantIds.length && 
                       participantIds.every(id => convParticipantIds.includes(id));
            }
            // For groups, check by name (if provided)
            if (isGroup && conv.type === 'GROUP' && groupName) {
                return conv.title === groupName;
            }
            return false;
        });
    }, [conversations]);



    // Optimized chat creation function
    const handleCreateChat = useCallback(async (chatData) => {
        // Early validation
        if (!chatData || !user?.id) {
            // console.warn('Invalid chat data or user');
            return;
        }

        try {
            // Optimize user deduplication using Set for better performance
            const inputUsers = Array.isArray(chatData.users) ? chatData.users : [];
            const userIds = new Set([user.id, ...inputUsers.map(u => u.id)]);
            
            // Create unique users array efficiently
            const uniqueUsers = [
                user,
                ...inputUsers.filter(u => u.id !== user.id)
            ];

            // Check for existing conversation before creating
            const participantIds = uniqueUsers.map(u => u.id).sort();
            const existingConversation = checkForExistingConversation(participantIds, chatData.isGroup, chatData.name);
            
            if (existingConversation) {
                showNotificationHelper("Warning", "Conversation already exists", NOTIFICATION_TYPES.WARNING);
                // Select the existing conversation instead of creating a new one
                handleSelectConversation(existingConversation);
                return existingConversation;
            }

            // Optimize admin IDs deduplication
            const adminIds = Array.from(new Set([
                user.id,
                ...(chatData.admin_ids || [])
            ]));

            // Build optimized payload
            const payload = {
                name: chatData.name || null,
                isGroup: chatData.isGroup || false,
                users: uniqueUsers,
                admin_ids: adminIds,
            };

            // Create conversation via service
            const newConversation = await conversationsService.createConversation(payload);
          
            if (newConversation) {  
                // Normalize participants data - API returns nested structure with user objects
                let participants = [];
                if (Array.isArray(newConversation.participants) && newConversation.participants.length > 0) {
                    // Extract user objects from nested structure
                    participants = newConversation.participants.map(p => p.user || p);
                } else {
                    participants = uniqueUsers;
                }

                // Find the other participant for direct messages
                const otherParticipant = participants.find(p => p.id !== user.id);
                
                // Build enriched conversation with all required fields for ContactItem
                const enrichedConversation = {
                    ...newConversation,
                    participants,
                    users: participants, // ContactItem also checks for 'users' property
                    title: newConversation.title || (newConversation.type === 'DIRECT' 
                        ? otherParticipant?.username || otherParticipant?.name || 'Unknown'
                        : newConversation.name || 'New Group'),
                    joined_at: newConversation.created_at || newConversation.joined_at || new Date().toISOString(),
                    created_at: newConversation.created_at || new Date().toISOString(),
                    lastMessage: newConversation.lastMessage || null,
                    unread: false,
                    unreadCount: 0,
                };

                // console.log('Enriched conversation:', enrichedConversation);
                // console.log('Other participant:', otherParticipant);

                // Update state and select conversation
                handleNewConversation(enrichedConversation);
                handleSelectConversation(enrichedConversation);
                
                return enrichedConversation;
            }
        } catch (error) {
            console.error('Failed to create chat:', error);
            // You could add user notification here
            throw error; // Re-throw for caller to handle if needed
        }
    }, [user, handleNewConversation, handleSelectConversation, checkForExistingConversation]);

    return {
        conversations,
        selectedConversation,
        conversationsLoading,
        handleSelectConversation,
        handleCreateChat,
        setConversations,
        handleNewMessage,
        markConversationAsRead,
    };
};
