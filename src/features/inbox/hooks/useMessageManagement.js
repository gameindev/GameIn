import { useState, useEffect, useCallback, useRef } from "react";
import { messageService } from "../services/message.service";
import { sendMessage as sendWebSocketMessage, getSocket } from "../../../app/services/ws/ws.service";
import { useAppSelector } from "../../../app/store/hooks";
import { currentUser } from "../../auth/store/selector";
import api from "../../../app/services/api";

export const useMessageManagement = (conversationId, onMarkAsRead = null) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState(null);
    const [hasMoreMessages, setHasMoreMessages] = useState(true);
    const [sendingMessages, setSendingMessages] = useState(new Set());
    
    const user = useAppSelector(currentUser);
    const socket = getSocket();
    const messagesCache = useRef(new Map()); // Cache messages per conversation
    const currentOffset = useRef(0);
    const MESSAGES_PER_PAGE = 20;

    // Helper function to get profile picture from user data
    const getUserProfilePic = useCallback(() => {
        if (!user) return null;
        
        // Check for profile picture in various nested structures
        const userType = user.user_type?.toUpperCase();
        let profile = null;
        
        if (userType === 'CREATOR' && user.creator_profile) {
            profile = user.creator_profile;
        } else if (userType === 'BRAND' && user.brand_profile) {
            profile = user.brand_profile;
        } else if (userType === 'COMMUNITY' && user.community_profile) {
            profile = user.community_profile;
        }
        
        // Return profile image path if available
        return profile?.profile_image?.path || null;
    }, [user]);

    // Normalize message data from API to frontend format
    const normalizeMessage = useCallback((apiMessage) => {
        // console.log('Normalizing message:', apiMessage);
        
        // Build attachment object from backend format
        const attachment = apiMessage.attachment;
        let attachments = [];
        
        if (attachment) {
            attachments = [{
                id: attachment.id,
                name: attachment.name,
                type: attachment.mime,
                url: attachment.path ? 
                    (attachment.path.startsWith('http') 
                        ? attachment.path 
                        : `${import.meta.env.VITE_ASSET_URL}/${attachment.path}`)
                    : null,
                size: attachment.size,
            }];
        }

       
        return {
            id: apiMessage.id,
            client_msg_id: apiMessage.client_msg_id,
            content: apiMessage.content,
            json_data: apiMessage.json_data || null,
            sender: apiMessage.sender?.username || "Unknown",
            senderId: apiMessage.sender?.id,
            senderProfilePic: apiMessage.sender?.profilepic || null,
            currentUserId: user?.id,
            timestamp: apiMessage.created_at,
            type: apiMessage.type || 'TEXT',
            attachments: attachments,
            showDocumentButton: false, // Can be enhanced later
            status: 'delivered', // Default status for loaded messages
        };
    }, [user?.id]);

    // Load messages when conversation changes
    useEffect(() => {
        if (!conversationId) {
            setMessages([]);
            currentOffset.current = 0;
            setHasMoreMessages(true);
            return;
        }

        // Check cache first
        const cachedMessages = messagesCache.current.get(conversationId);
        if (cachedMessages) {
            setMessages(cachedMessages);
            return;
        }

        loadMessages(conversationId, 0, true);
    }, [conversationId]);

    // Load messages from API
    const loadMessages = useCallback(async (convId, offset = 0, isInitial = false) => {
        if (isInitial) {
            setLoading(true);
        } else {
            setLoadingMore(true);
        }
        setError(null);

        try {
            const apiMessages = await messageService.getMessages(convId, MESSAGES_PER_PAGE, offset);
            const normalizedMessages = apiMessages.map(normalizeMessage);

            if (isInitial) {
                // Sort messages by timestamp (oldest first for display)
                const sortedMessages = normalizedMessages.sort((a, b) => 
                    new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
                );
                setMessages(sortedMessages);
                messagesCache.current.set(convId, sortedMessages);
                currentOffset.current = 0;
            } else {
                // Combine and sort all messages by timestamp
                const combinedMessages = [...normalizedMessages, ...messagesCache.current.get(convId) || []];
                const sortedMessages = combinedMessages.sort((a, b) => 
                    new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
                );
                setMessages(sortedMessages);
                messagesCache.current.set(convId, sortedMessages);
            }

            // Check if we have more messages
            setHasMoreMessages(apiMessages.length === MESSAGES_PER_PAGE);
            currentOffset.current = offset + apiMessages.length;

        } catch (err) {
            console.error('Failed to load messages:', err);
            setError('Failed to load messages');
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    }, [normalizeMessage]);

    // Load more messages (for pagination)
    const loadMoreMessages = useCallback(() => {
        if (!conversationId || loadingMore || !hasMoreMessages) return;
        loadMessages(conversationId, currentOffset.current, false);
    }, [conversationId, loadingMore, hasMoreMessages, loadMessages]);

    // Upload files and get upload entities
    const uploadAttachments = useCallback(async (files) => {
        const uploadedAttachments = [];
        
        for (const file of files) {
            try {
                const formData = new FormData();
                formData.append('file', file);
                
                const response = await api.post('/uploads/file', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                
                uploadedAttachments.push({
                    id: response.data.id,
                    name: response.data.name,
                    path: response.data.path,
                    mime: response.data.mime,
                    size: response.data.size,
                    type: response.data.type,
                });
            } catch (error) {
                console.error('Failed to upload file:', file.name, error);
                throw error;
            }
        }
        
        return uploadedAttachments;
    }, []);

    // Send message via WebSocket
    const sendMessage = useCallback(async (content, attachments = []) => {
        if (!content.trim() && attachments.length === 0) return;
        if (!conversationId) return;

        const clientMsgId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        
        const newMessage = {
            id: clientMsgId,
            client_msg_id: clientMsgId,
            content: content.trim(),
            sender: user?.username || "You",
            senderId: user?.id,
            senderProfilePic: getUserProfilePic(),
            currentUserId: user?.id,
            timestamp: new Date().toISOString(),
            type: attachments.length > 0 ? 'FILE' : 'TEXT',
            attachments: attachments.map(file => ({
                name: file.name,
                type: file.type,
                url: URL.createObjectURL(file),
                size: file.size,
            })),
            status: 'sending',
            showDocumentButton: false,
        };

        // console.log('Sending optimistic message:', newMessage);

        // Optimistically add message and sort to maintain chronological order
        setMessages(prev => {
            const updatedMessages = [...prev, newMessage];
            return updatedMessages.sort((a, b) => 
                new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
            );
        });
        setSendingMessages(prev => new Set([...prev, clientMsgId]));

        try {
            // Upload attachments first if there are any
            let uploadedAttachments = [];
            if (attachments.length > 0) {
                // console.log('Uploading attachments:', attachments);
                uploadedAttachments = await uploadAttachments(attachments);
                // console.log('Uploaded attachments:', uploadedAttachments);
            }
            
            // Send via WebSocket with the same client_msg_id
            // console.log('Sending message via WebSocket with attachments:', uploadedAttachments);
            sendWebSocketMessage(conversationId, content.trim(), uploadedAttachments, newMessage.type, clientMsgId);
            
            // Update status to sent after a short delay
            setTimeout(() => {
                setMessages(prev => prev.map(msg => 
                    msg.client_msg_id === clientMsgId 
                        ? { ...msg, status: 'sent' }
                        : msg
                ));
                setSendingMessages(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(clientMsgId);
                    return newSet;
                });
            }, 1000);

        } catch (err) {
            console.error('Failed to send message:', err);
            setError('Failed to send message');
            
            // Remove the optimistic message on error
            setMessages(prev => prev.filter(msg => msg.client_msg_id !== clientMsgId));
            setSendingMessages(prev => {
                const newSet = new Set(prev);
                newSet.delete(clientMsgId);
                return newSet;
            });
        }
    }, [conversationId, user, getUserProfilePic, uploadAttachments]);

    // Handle incoming real-time messages
    const handleIncomingMessage = useCallback((messageData) => {
        if (!messageData || messageData.conversationId !== conversationId) return;

        // console.log('Received real-time message:', messageData);

        // Skip messages from current user that are already optimistically added
        // if (messageData.sender_id === user?.id) {
        //     console.log('Received message from current user, checking for duplicates...');
        // }

        const normalizedMessage = normalizeMessage({
            id: messageData.id,
            client_msg_id: messageData.metadata?.client_msg_id || messageData.id,
            content: messageData.content,
            sender: { 
                id: messageData.sender_id, 
                username: messageData.username,
                profilepic: messageData.profilepic || null
            },
            created_at: messageData.timestamp,
            type: messageData.type || 'TEXT',
            attachment: messageData.attachments?.[0] || null, // Handle attachments from messageData
        });

        // Enhanced deduplication logic
        setMessages(prev => {
            // Check for duplicates using multiple criteria
            const exists = prev.some(msg => {
                // Check by client_msg_id (most reliable)
                if (msg.client_msg_id === normalizedMessage.client_msg_id) {
                    // console.log('Duplicate found by client_msg_id:', msg.client_msg_id);
                    return true;
                }
                
                // For messages from current user, check by content + sender + timestamp
                if (messageData.sender_id === user?.id && 
                    msg.content === normalizedMessage.content && 
                    msg.senderId === normalizedMessage.senderId &&
                    Math.abs(new Date(msg.timestamp).getTime() - new Date(normalizedMessage.timestamp).getTime()) < 10000) {
                    // console.log('Duplicate found by content+sender+timestamp (current user)');
                    return true;
                }
                
                return false;
            });

            if (exists) {
                // console.log('Message already exists, skipping duplicate');
                return prev;
            }

            // console.log('Adding new message:', normalizedMessage);
            // Add new message and sort by timestamp to maintain chronological order
            const updatedMessages = [...prev, normalizedMessage];
            return updatedMessages.sort((a, b) => 
                new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
            );
        });

        // Update cache with same deduplication logic
        const cachedMessages = messagesCache.current.get(conversationId) || [];
        const cacheExists = cachedMessages.some(msg => 
            msg.client_msg_id === normalizedMessage.client_msg_id ||
            (messageData.sender_id === user?.id && 
             msg.content === normalizedMessage.content && 
             msg.senderId === normalizedMessage.senderId &&
             Math.abs(new Date(msg.timestamp).getTime() - new Date(normalizedMessage.timestamp).getTime()) < 10000)
        );

        if (!cacheExists) {
            const updatedCache = [...cachedMessages, normalizedMessage];
            // Sort cache by timestamp to maintain chronological order
            const sortedCache = updatedCache.sort((a, b) => 
                new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
            );
            messagesCache.current.set(conversationId, sortedCache);
        }
    }, [conversationId, normalizeMessage, user?.id]);

    // Handle message delivery confirmation
    const handleMessageDelivered = useCallback((deliveryData) => {
        if (deliveryData.conversationId !== conversationId) return;

        setMessages(prev => prev.map(msg => 
            msg.client_msg_id === deliveryData.messageId 
                ? { ...msg, status: 'delivered' }
                : msg
        ));
    }, [conversationId]);

    // Handle message read confirmation
    const handleMessageRead = useCallback((readData) => {
        if (readData.conversationId !== conversationId) return;
        
        // console.log('Received read status update:', readData);

        // Only update messages that belong to the current user
        setMessages(prev => prev.map(msg => {
            // Check if this message belongs to current user and matches the read message
            if (msg.senderId === user?.id && msg.client_msg_id === readData.messageId) {
                // console.log('Updating message status to read:', msg.client_msg_id);
                return { ...msg, status: 'read' };
            }
            return msg;
        }));
    }, [conversationId, user?.id]);

    // Mark message as read
    const markMessageAsRead = useCallback(async (messageId) => {
        try {
            await messageService.markAsRead(messageId);
            setMessages(prev => prev.map(msg => 
                msg.client_msg_id === messageId 
                    ? { ...msg, status: 'read' }
                    : msg
            ));
        } catch (err) {
            console.error('Failed to mark message as read:', err);
        }
    }, []);

    // Mark conversation as read
    const markConversationAsRead = useCallback(async () => {
        if (!conversationId) return;

        try {
            await messageService.markConversationAsRead(conversationId);
            setMessages(prev => prev.map(msg => ({ ...msg, status: 'read' })));
            
            // Notify parent component to update conversation list
            if (typeof onMarkAsRead === 'function') {
                onMarkAsRead(conversationId);
            }
        } catch (err) {
            console.error('Failed to mark conversation as read:', err);
        }
    }, [conversationId, onMarkAsRead]);

    // Add typing indicator
    const addTypingIndicator = useCallback((sender) => {
        const typingMessage = {
            id: `typing-${Date.now()}`,
            isTyping: true,
            sender: sender,
            timestamp: new Date().toISOString(),
        };

        setMessages(prev => {
            const updatedMessages = [...prev, typingMessage];
            return updatedMessages.sort((a, b) => 
                new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
            );
        });

        // Remove typing indicator after 3 seconds
        setTimeout(() => {
            setMessages(prev => prev.filter(msg => msg.id !== typingMessage.id));
        }, 3000);
    }, []);

    // Clear error
    const clearError = useCallback(() => {
        setError(null);
    }, []);

    // Set up WebSocket event listeners
    useEffect(() => {
        if (!socket) return;

        const handleMessages = (data) => {
            if (data.type === 'message' && data.data) {
                handleIncomingMessage(data.data);
            } else if (data.type === 'message_read' && data.data) {
                handleMessageRead(data.data);
            }
        };

        socket.on('messages', handleMessages);
        socket.on('message_delivered', handleMessageDelivered);
        socket.on('message_read', handleMessageRead);

        return () => {
            socket.off('messages', handleMessages);
            socket.off('message_delivered', handleMessageDelivered);
            socket.off('message_read', handleMessageRead);
        };
    }, [socket, handleIncomingMessage, handleMessageDelivered, handleMessageRead]);

    // Acknowledge message
    const acknowledgeMessage = useCallback(async (messageId) => {
        try {
            await messageService.acknowledgeMessage(messageId);
            setMessages(prev => prev.map(msg => {
                if (msg.client_msg_id === messageId) {
                    return { 
                        ...msg, 
                        status: 'acknowledged',
                        json_data: { ...(msg.json_data || {}), acknowledged: true }
                    };
                }
                return msg;
            }));
        } catch (err) {
            console.error('Failed to acknowledge message:', err);
        }
    }, []);


    return {
        messages,
        loading,
        loadingMore,
        error,
        hasMoreMessages,
        sendingMessages,
        sendMessage,
        loadMoreMessages,
        markMessageAsRead,
        markConversationAsRead,
        addTypingIndicator,
        clearError,
        acknowledgeMessage,
    };
};
