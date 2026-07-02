import { useCallback, useEffect, useState } from "react";
import { useConversations } from "./useConversation";
import { conversationsService } from "../services/conversation.service";
import { joinConversation } from "../../../app/services/ws/ws.service";
import { showNotificationHelper } from "../../../shared/utils/helpers/showNotification.helper";
import { NOTIFICATION_TYPES } from "../../../shared/enums/notificationTypesEnum";

const sortConversations = (items) =>
    [...items].sort((a, b) => {
        const aPinned = Boolean(a.pinned);
        const bPinned = Boolean(b.pinned);
        if (aPinned !== bPinned) {
            return aPinned ? -1 : 1;
        }

        const aTime = a.lastMessage?.timestamp || a.joined_at;
        const bTime = b.lastMessage?.timestamp || b.joined_at;
        return new Date(bTime).getTime() - new Date(aTime).getTime();
    });

const getConversationLabel = (conversation, currentUserId) => {
    if (!conversation) return "";

    const title =
        typeof conversation.title === "string" ? conversation.title.trim() : conversation.title;
    if (title) {
        return title.charAt(0).toUpperCase() + title.slice(1);
    }

    const participants = conversation.participants || conversation.users || [];
    const other = participants.find((p) => {
        const participantId = p.user ? p.user.id : p.id;
        return participantId !== currentUserId;
    });
    const otherUser = other?.user || other;
    const name = otherUser?.username || otherUser?.name || "Unknown";

    return name.charAt(0).toUpperCase() + name.slice(1);
};

export const useConversationManagement = (user) => {
    const { conversations: apiConversations, loading: conversationsLoading } = useConversations(user?.id);
    const [conversations, setConversations] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [pendingConfirm, setPendingConfirm] = useState(null);
    const [confirmLoading, setConfirmLoading] = useState(false);

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
                        pinned: conv.pinned || false,
                        cleared_at: conv.cleared_at || null,
                    };
                }
                return conv;
            });
            
            // console.log('Normalized conversations:', normalizedConversations);
            setConversations(sortConversations(normalizedConversations));
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
        setConversations(prev => sortConversations(prev.map(conv => {
            if (conv.id === conversationId) {
                return {
                    ...conv,
                    unreadCount: 0,
                    unread: false,
                };
            }
            return conv;
        })));

        setSelectedConversation(prev =>
            prev?.id === conversationId
                ? { ...prev, unreadCount: 0, unread: false }
                : prev
        );
    }, []);

    const handleMarkAllRead = useCallback(async (conversationId) => {
        try {
            await conversationsService.markConversationAsRead(conversationId);
            markConversationAsRead(conversationId);
            showNotificationHelper("Marked as read", "All messages marked as read", NOTIFICATION_TYPES.SUCCESS);
        } catch (error) {
            showNotificationHelper(
                "Could not mark as read",
                error?.response?.data?.message || error?.message || "Please try again.",
                NOTIFICATION_TYPES.ERROR
            );
        }
    }, [markConversationAsRead]);

    const performClearChat = useCallback(async (conversationId) => {
        try {
            const response = await conversationsService.clearConversation(conversationId);
            const clearedAt = response?.data?.clearedAt || new Date().toISOString();

            setConversations(prev => sortConversations(prev.map(conv => {
                if (conv.id !== conversationId) return conv;
                return {
                    ...conv,
                    cleared_at: clearedAt,
                    lastMessage: null,
                    unreadCount: 0,
                    unread: false,
                };
            })));

            if (selectedConversation?.id === conversationId) {
                setSelectedConversation(prev => ({
                    ...prev,
                    cleared_at: clearedAt,
                    lastMessage: null,
                    unreadCount: 0,
                    unread: false,
                }));
            }

            showNotificationHelper("Chat cleared", "Message history hidden from your inbox", NOTIFICATION_TYPES.SUCCESS);
        } catch (error) {
            showNotificationHelper(
                "Could not clear chat",
                error?.response?.data?.message || error?.message || "Please try again.",
                NOTIFICATION_TYPES.ERROR
            );
        }
    }, [selectedConversation?.id]);

    const performDeleteConversation = useCallback(async (conversationId) => {
        try {
            await conversationsService.deleteConversation(conversationId);
            setConversations(prev => prev.filter(conv => conv.id !== conversationId));

            if (selectedConversation?.id === conversationId) {
                setSelectedConversation(null);
            }

            showNotificationHelper("Chat deleted", "Conversation removed from your inbox", NOTIFICATION_TYPES.SUCCESS);
            return true;
        } catch (error) {
            showNotificationHelper(
                "Could not delete chat",
                error?.response?.data?.message || error?.message || "Please try again.",
                NOTIFICATION_TYPES.ERROR
            );
            return false;
        }
    }, [selectedConversation?.id]);

    const handleClearChat = useCallback((conversationId) => {
        const conversation = conversations.find((conv) => conv.id === conversationId);
        setPendingConfirm({
            type: "clear",
            conversationId,
            conversationLabel: getConversationLabel(conversation, user?.id),
        });
    }, [conversations, user?.id]);

    const handleDeleteConversation = useCallback((conversationId) => {
        const conversation = conversations.find((conv) => conv.id === conversationId);
        setPendingConfirm({
            type: "delete",
            conversationId,
            conversationLabel: getConversationLabel(conversation, user?.id),
        });
    }, [conversations, user?.id]);

    const cancelPendingConfirm = useCallback(() => {
        if (!confirmLoading) {
            setPendingConfirm(null);
        }
    }, [confirmLoading]);

    const confirmPendingAction = useCallback(async () => {
        if (!pendingConfirm || confirmLoading) return null;

        setConfirmLoading(true);
        let deleted = false;

        try {
            if (pendingConfirm.type === "clear") {
                await performClearChat(pendingConfirm.conversationId);
            } else if (pendingConfirm.type === "delete") {
                deleted = await performDeleteConversation(pendingConfirm.conversationId);
            }
        } finally {
            setConfirmLoading(false);
            setPendingConfirm(null);
        }

        return deleted ? pendingConfirm.conversationId : null;
    }, [pendingConfirm, confirmLoading, performClearChat, performDeleteConversation]);

    const handleTogglePin = useCallback(async (conversationId) => {
        try {
            const response = await conversationsService.togglePinConversation(conversationId);
            const pinned = Boolean(response?.data?.pinned);

            setConversations(prev => sortConversations(prev.map(conv => {
                if (conv.id !== conversationId) return conv;
                return { ...conv, pinned };
            })));

            if (selectedConversation?.id === conversationId) {
                setSelectedConversation(prev => ({ ...prev, pinned }));
            }

            showNotificationHelper(
                pinned ? "Chat pinned" : "Chat unpinned",
                pinned ? "Conversation pinned to the top" : "Conversation unpinned",
                NOTIFICATION_TYPES.SUCCESS
            );
        } catch (error) {
            showNotificationHelper(
                "Could not update pin",
                error?.response?.data?.message || error?.message || "Please try again.",
                NOTIFICATION_TYPES.ERROR
            );
        }
    }, [selectedConversation?.id]);



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
        handleMarkAllRead,
        handleClearChat,
        handleDeleteConversation,
        handleTogglePin,
        pendingConfirm,
        confirmLoading,
        cancelPendingConfirm,
        confirmPendingAction,
    };
};
