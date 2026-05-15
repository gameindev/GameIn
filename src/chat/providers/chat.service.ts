import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConversationEntity } from '../chat.entity';
import { In, Repository, Not, IsNull } from 'typeorm';
import { CreateConversationDto } from '../dtos/create-conversation.dto';
import { ConversationParticipantEntity } from '../conversation-participant.entity';
import { MessageEntity } from '../message.entity';
import { MessageReceiptEntity } from '../message-receipt.entity';
import { AddAdminDto } from '../dtos/add-admin.dto';
import { RemoveAdminDto } from '../dtos/remove-admin.dto';
import { UpdateParticipantAdminDto } from '../dtos/update-participant-admin.dto';
import { KafkaService } from '../../kafka/kafka.service';
import { RedisIoAdapter } from '../../redis/redisIOAdaptor.service';
import { MessageType } from '../enum/message-type.enum';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../../users/user.entity';
import { ConversationType } from '../enum/conversation-type.enum';

@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(ConversationEntity)
        private readonly conversationRepository: Repository<ConversationEntity>,

        @InjectRepository(ConversationParticipantEntity)
        private readonly conversationParticipantRepository: Repository<ConversationParticipantEntity>,

        @InjectRepository(MessageEntity)
        private readonly messageRepository: Repository<MessageEntity>,

        @InjectRepository(MessageReceiptEntity)
        private readonly messageReceiptRepository: Repository<MessageReceiptEntity>,

        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        private readonly kafkaService: KafkaService,

    ) { }


    async createConversation(createConversationDto: CreateConversationDto) {
        // console.log(createConversationDto); //TODO Console
        const { participant_ids, admin_ids = [], ...rest } = createConversationDto;

        // Validate that admin_ids are subset of participant_ids
        const invalidAdminIds = admin_ids.filter(id => !participant_ids.includes(id));
        if (invalidAdminIds.length > 0) {
            throw new BadRequestException(`Admin IDs ${invalidAdminIds.join(', ')} are not in participant list`);
        }

        const conversation = this.conversationRepository.create({
            ...rest,
            participants: participant_ids.map(id => ({ user: { id } })),
        });
        const savedConversation = await this.conversationRepository.save(conversation);
        await this.addParticipantsToConversation(savedConversation.id, participant_ids, admin_ids);

        // Fetch the conversation with participant details for response
        const conversationWithDetails = await this.conversationRepository.findOne({
            where: { id: savedConversation.id },
            relations: [
                'participants',
                'participants.user',
                'participants.user.creator_profile',
                'participants.user.creator_profile.profile_image',
                'participants.user.brand_profile',
                'participants.user.brand_profile.profile_image'
            ],
        });

        return {
            ...conversationWithDetails,
            participants: conversationWithDetails.participants.map(participant => ({
                id: participant.user.id,
                username: participant.user.username,
                profilepic: participant.user.creator_profile?.profile_image?.path ||
                    participant.user.brand_profile?.profile_image?.path ||
                    null
            }))
        };        
    }


    async getConversations(userId: number) {
        try {
            // console.log(`Fetching conversations for user: ${userId}`); //TODO Console

            const conversations = await this.conversationParticipantRepository.find({
                where: { user: { id: userId } },
                relations: [
                    'conversation',
                    'conversation.participants',
                    'conversation.participants.user',
                    'conversation.participants.user.creator_profile',
                    'conversation.participants.user.creator_profile.profile_image',
                    'conversation.participants.user.brand_profile',
                    'conversation.participants.user.brand_profile.profile_image'
                ],
            });

            // console.log(`Found ${conversations.length} conversation participants`); //TODO Console

            // Debug: Log conversation data structure
            // conversations.forEach((conv, index) => {
            //     console.log(`Conversation ${index}:`, {
            //         hasConversation: !!conv.conversation,
            //         conversationId: conv.conversation?.id,
            //         conversationTitle: conv.conversation?.title,
            //         participantCount: conv.conversation?.participants?.length || 0
            //     }); 
            // }); //TODO Console

            // Filter out conversations with null conversation data
            const validConversations = conversations.filter(c => c.conversation && c.conversation.id);

            // console.log(`Valid conversations: ${validConversations.length} out of ${conversations.length}`); //TODO Console

            if (validConversations.length === 0) {
                console.log('No valid conversations found, returning empty array');
                return [];
            }

            // Get last message for each conversation
            const conversationIds = validConversations.map(c => c.conversation.id);
            const lastMessages = await this.messageRepository.find({
                where: {
                    conversation: { id: In(conversationIds) },
                    deleted_at: IsNull()
                },
                relations: ['sender'],
                order: { created_at: 'DESC' },
            });

            // Group last messages by conversation ID
            const lastMessagesMap = new Map();
            lastMessages.forEach(message => {
                if (message.conversation && message.conversation.id && !lastMessagesMap.has(message.conversation.id)) {
                    lastMessagesMap.set(message.conversation.id, message);
                }
            });

            // Get unread counts for all conversations
            const unreadCounts = await Promise.all(
                validConversations.map(conv => this.getUnreadMessageCount(conv.conversation.id, userId))
            );

            return validConversations.map((conversation, index) => {
                const lastMessage = lastMessagesMap.get(conversation.conversation.id);
                const unreadCount = unreadCounts[index];

                return {
                    id: conversation.conversation.id,
                    title: conversation.conversation.title,
                    type: conversation.conversation.type,
                    participants: conversation.conversation.participants?.map(participant => ({
                        id: participant.user?.id,
                        username: participant.user?.username,
                        profilepic: participant.user?.creator_profile?.profile_image?.path ||
                            participant.user?.brand_profile?.profile_image?.path ||
                            null
                    })) || [],
                    is_admin: conversation.is_admin,
                    joined_at: conversation.joined_at,
                    lastMessage: lastMessage ? {
                        content: lastMessage.content,
                        timestamp: lastMessage.created_at,
                        sender: lastMessage.sender?.username || 'Unknown',
                        type: lastMessage.type,
                    } : null,
                    unreadCount: unreadCount || 0,
                    unread: (unreadCount || 0) > 0,
                };
            });

        } catch (error) {
            console.error('Error in getConversations:', error);
            throw error;
        }
    }



    async addParticipantsToConversation(conversationId: number, participantIds: number[], adminIds: number[] = []) {
        const conversation = await this.conversationRepository.findOne({
            where: { id: conversationId },
            relations: ['participants'],
        });
        if (!conversation) {
            throw new NotFoundException('Conversation not found');
        }
        const participants = await this.conversationParticipantRepository.find({
            where: { conversation: { id: conversationId }, user: { id: In(participantIds) } },
        });
        if (participants.length === participantIds.length) {
            return conversation;
        }
        const newParticipants = participantIds.filter(id => !participants.some(p => p.user.id === id));
        const newParticipantsEntities = newParticipants.map(id =>
            this.conversationParticipantRepository.create({
                conversation,
                user: { id },
                is_admin: adminIds.includes(id)
            })
        );
        await this.conversationParticipantRepository.save(newParticipantsEntities);
        return {
            conversation,
            newParticipants: newParticipantsEntities,
        };
    }





    async addAdmin(addAdminDto: AddAdminDto, requestingUserId: number) {
        const { conversation_id, user_id } = addAdminDto;

        // Check if requesting user is admin
        await this.verifyAdminAccess(conversation_id, requestingUserId);

        // Check if user is participant
        const participant = await this.conversationParticipantRepository.findOne({
            where: {
                conversation: { id: conversation_id },
                user: { id: user_id }
            },
            relations: [
                'user',
                'user.creator_profile',
                'user.creator_profile.profile_image',
                'user.brand_profile',
                'user.brand_profile.profile_image'
            ],
        });

        if (!participant) {
            throw new BadRequestException('User is not a participant in this conversation');
        }

        if (participant.is_admin) {
            throw new BadRequestException('User is already an admin');
        }

        participant.is_admin = true;
        await this.conversationParticipantRepository.save(participant);

        return {
            message: 'User promoted to admin successfully',
            participant: {
                id: participant.id,
                user_id: participant.user.id,
                username: participant.user.username,
                email: participant.user.email,
                profilepic: participant.user.creator_profile?.profile_image?.path ||
                    participant.user.brand_profile?.profile_image?.path ||
                    null,
                is_admin: participant.is_admin,
                joined_at: participant.joined_at
            }
        };
    }





    async removeAdmin(removeAdminDto: RemoveAdminDto, requestingUserId: number) {
        const { conversation_id, user_id } = removeAdminDto;

        // Check if requesting user is admin
        await this.verifyAdminAccess(conversation_id, requestingUserId);

        // Prevent removing admin status from self
        if (requestingUserId === user_id) {
            throw new BadRequestException('Cannot remove admin status from yourself');
        }

        const participant = await this.conversationParticipantRepository.findOne({
            where: {
                conversation: { id: conversation_id },
                user: { id: user_id }
            },
            relations: [
                'user',
                'user.creator_profile',
                'user.creator_profile.profile_image',
                'user.brand_profile',
                'user.brand_profile.profile_image'
            ],
        });

        if (!participant) {
            throw new BadRequestException('User is not a participant in this conversation');
        }

        if (!participant.is_admin) {
            throw new BadRequestException('User is not an admin');
        }

        participant.is_admin = false;
        await this.conversationParticipantRepository.save(participant);

        return {
            message: 'User demoted from admin successfully',
            participant: {
                id: participant.id,
                user_id: participant.user.id,
                username: participant.user.username,
                email: participant.user.email,
                profilepic: participant.user.creator_profile?.profile_image?.path ||
                    participant.user.brand_profile?.profile_image?.path ||
                    null,
                is_admin: participant.is_admin,
                joined_at: participant.joined_at
            }
        };
    }





    async updateParticipantAdminStatus(updateDto: UpdateParticipantAdminDto, requestingUserId: number) {
        const { conversation_id, participants } = updateDto;

        // Check if requesting user is admin
        await this.verifyAdminAccess(conversation_id, requestingUserId);

        const results = [];

        for (const participantUpdate of participants) {
            const { user_id, is_admin } = participantUpdate;

            // Prevent changing own admin status
            if (requestingUserId === user_id) {
                throw new BadRequestException('Cannot change your own admin status');
            }

            const participant = await this.conversationParticipantRepository.findOne({
                where: {
                    conversation: { id: conversation_id },
                    user: { id: user_id }
                },
            });

            if (!participant) {
                throw new BadRequestException(`User ${user_id} is not a participant in this conversation`);
            }

            participant.is_admin = is_admin;
            await this.conversationParticipantRepository.save(participant);

            results.push({
                user_id,
                is_admin,
                message: is_admin ? 'User promoted to admin' : 'User demoted from admin'
            });
        }

        return { message: 'Admin status updated successfully', results };
    }





    async getConversationAdmins(conversationId: number) {
        const admins = await this.conversationParticipantRepository.find({
            where: {
                conversation: { id: conversationId },
                is_admin: true
            },
            relations: [
                'user',
                'user.creator_profile',
                'user.creator_profile.profile_image',
                'user.brand_profile',
                'user.brand_profile.profile_image'
            ],
        });

        return admins.map(admin => ({
            id: admin.id,
            user_id: admin.user.id,
            username: admin.user.username,
            email: admin.user.email,
            profilepic: admin.user.creator_profile?.profile_image?.path ||
                admin.user.brand_profile?.profile_image?.path ||
                null,
            joined_at: admin.joined_at
        }));
    }






    private async verifyAdminAccess(conversationId: number, userId: number) {
        const participant = await this.conversationParticipantRepository.findOne({
            where: {
                conversation: { id: conversationId },
                user: { id: userId }
            },
        });

        if (!participant) {
            throw new ForbiddenException('You are not a participant in this conversation');
        }

        if (!participant.is_admin) {
            throw new ForbiddenException('You do not have admin privileges in this conversation');
        }

        return participant;
    }



    /**
     * Get conversation messages with pagination
     */
    async getConversationMessages(conversationId: number, limit: number = 50, offset: number = 0) {
        const messages = await this.messageRepository.find({
            where: { conversation: { id: conversationId } },
            relations: ['sender', 'sender.creator_profile', 'sender.brand_profile', 'attachment'],
            order: { created_at: 'DESC' },
            take: limit,
            skip: offset,
        });

        return messages.map(message => ({
            id: message.id,
            client_msg_id: message.client_msg_id,
            content: message.content,
            json_data: message.json_data,
            type: message.type,
            sender: {
                id: message.sender.id,
                username: message.sender.username,
                profilepic: message.sender.creator_profile?.profile_image?.path ||
                    message.sender.brand_profile?.profile_image?.path ||
                    null
            },
            attachment: message.attachment ? {
                id: message.attachment.id,
                name: message.attachment.name,
                path: message.attachment.path,
                mime: message.attachment.mime,
                size: message.attachment.size,
                type: message.attachment.type,
            } : null,
            created_at: message.created_at,
            updated_at: message.updated_at,
        }));
    }

    /**
     * Get unread message count for a conversation
     */
    async getUnreadMessageCount(conversationId: number, userId: number): Promise<number> {
        return this.messageRepository.count({
            where: {
                conversation: { id: conversationId },
                sender: { id: Not(userId) }, // Messages from other users
                deleted_at: IsNull(), // Not deleted
            }
        });
    }

    /**
     * Mark message as read
     */
    async markMessageAsRead(messageId: string, userId: number) {
        try {
            // Find the message
            const message = await this.messageRepository.findOne({
                where: { client_msg_id: messageId },
                relations: ['conversation']
            });

            if (!message) {
                throw new NotFoundException('Message not found');
            }

            // Check if user is participant in the conversation
            const participant = await this.conversationParticipantRepository.findOne({
                where: {
                    conversation: { id: message.conversation.id },
                    user: { id: userId }
                }
            });

            if (!participant) {
                throw new ForbiddenException('You are not a participant in this conversation');
            }

            // Update or create message receipt
            let messageReceipt = await this.messageReceiptRepository.findOne({
                where: {
                    message: { id: message.id },
                    user: { id: userId }
                }
            });

            if (!messageReceipt) {
                messageReceipt = this.messageReceiptRepository.create({
                    message: { id: message.id },
                    user: { id: userId },
                    read_at: new Date()
                });
            } else {
                messageReceipt.read_at = new Date();
            }

            await this.messageReceiptRepository.save(messageReceipt);

            // Publish read event to Kafka for real-time broadcasting
            await this.kafkaService.sendMessage('chat.message.read', {
                key: messageId,
                value: {
                    messageId,
                    conversationId: message.conversation.id,
                    userId,
                    readAt: messageReceipt.read_at.toISOString(),
                    type: 'message_read',
                    data: {
                        messageId,
                        conversationId: message.conversation.id,
                        userId,
                        readAt: messageReceipt.read_at.toISOString(),
                        timestamp: new Date().toISOString()
                    }
                }
            });

            return {
                success: true,
                messageId,
                readAt: messageReceipt.read_at
            };
        } catch (error) {
            throw error;
        }
    }

    /**
     * Mark all messages in conversation as read
     */
    async markConversationAsRead(conversationId: number, userId: number) {
        try {
            // Check if user is participant
            const participant = await this.conversationParticipantRepository.findOne({
                where: {
                    conversation: { id: conversationId },
                    user: { id: userId }
                }
            });

            if (!participant) {
                throw new ForbiddenException('You are not a participant in this conversation');
            }

            // Get all unread messages for this user in this conversation
            const unreadMessages = await this.messageRepository.find({
                where: {
                    conversation: { id: conversationId },
                    sender: { id: Not(userId) },
                    deleted_at: IsNull(),
                },
                relations: ['conversation']
            });

            // Create or update message receipts for all unread messages
            const readAt = new Date();

            for (const message of unreadMessages) {
                // Check if receipt already exists
                const existingReceipt = await this.messageReceiptRepository.findOne({
                    where: {
                        message: { id: message.id },
                        user: { id: userId }
                    }
                });

                if (existingReceipt) {
                    // Update existing receipt
                    existingReceipt.read_at = readAt;
                    await this.messageReceiptRepository.save(existingReceipt);
                } else {
                    // Create new receipt
                    const newReceipt = this.messageReceiptRepository.create({
                        message: { id: message.id },
                        user: { id: userId },
                        read_at: readAt
                    });
                    await this.messageReceiptRepository.save(newReceipt);
                }
            }

            // Publish read events for all messages in conversation
            for (const message of unreadMessages) {
                await this.kafkaService.sendMessage('chat.message.read', {
                    key: message.client_msg_id,
                    value: {
                        messageId: message.client_msg_id,
                        conversationId,
                        userId,
                        readAt: readAt.toISOString(),
                        type: 'message_read',
                        data: {
                            messageId: message.client_msg_id,
                            conversationId,
                            userId,
                            readAt: readAt.toISOString(),
                            timestamp: new Date().toISOString()
                        }
                    }
                });
            }

            // Publish conversation read event
            await this.kafkaService.sendMessage('chat.conversation.read', {
                key: conversationId.toString(),
                value: {
                    conversationId,
                    userId,
                    readAt: new Date().toISOString(),
                    messageCount: unreadMessages.length
                }
            });

            return {
                success: true,
                conversationId,
                readAt: new Date(),
                messageCount: unreadMessages.length
            };
        } catch (error) {
            throw error;
        }
    }

    /**
     * Get message delivery status
     */
    async getMessageDeliveryStatus(messageId: string) {
        const message = await this.messageRepository.findOne({
            where: { client_msg_id: messageId },
            relations: ['conversation', 'conversation.participants', 'conversation.participants.user']
        });

        if (!message) {
            throw new NotFoundException('Message not found');
        }

        const receipts = await this.messageReceiptRepository.find({
            where: { message: { client_msg_id: messageId } },
            relations: ['user']
        });

        const participants = message.conversation.participants;
        const deliveryStatus = participants.map(participant => {
            const receipt = receipts.find(r => r.user.id === participant.user.id);
            return {
                userId: participant.user.id,
                username: participant.user.username,
                delivered: !!receipt?.delivered_at,
                read: !!receipt?.read_at,
                deliveredAt: receipt?.delivered_at,
                readAt: receipt?.read_at
            };
        });

        return {
            messageId,
            conversationId: message.conversation.id,
            deliveryStatus
        };
    }

    /**
     * Delete a message (soft delete)
     */
    async deleteMessage(messageId: string, userId: number) {
        try {
            const message = await this.messageRepository.findOne({
                where: { client_msg_id: messageId },
                relations: ['sender', 'conversation']
            });

            if (!message) {
                throw new NotFoundException('Message not found');
            }

            // Check if user is the sender or an admin
            const isSender = message.sender.id === userId;
            const isAdmin = await this.conversationParticipantRepository.findOne({
                where: {
                    conversation: { id: message.conversation.id },
                    user: { id: userId },
                    is_admin: true
                }
            });

            if (!isSender && !isAdmin) {
                throw new ForbiddenException('You can only delete your own messages or you need admin privileges');
            }

            // Soft delete the message
            await this.messageRepository.update(
                { client_msg_id: messageId },
                { deleted_at: new Date() }
            );

            // Publish delete event
            await this.kafkaService.sendMessage('chat.message.deleted', {
                key: messageId,
                value: {
                    messageId,
                    conversationId: message.conversation.id,
                    deletedBy: userId,
                    deletedAt: new Date().toISOString()
                }
            });

            return {
                success: true,
                messageId,
                deletedAt: new Date()
            };
        } catch (error) {
            throw error;
        }
    }

    /**
     * Get conversation statistics
     */
    async getConversationStats(conversationId: number, userId: number) {
        try {
            // Check if user is participant
            const participant = await this.conversationParticipantRepository.findOne({
                where: {
                    conversation: { id: conversationId },
                    user: { id: userId }
                }
            });

            if (!participant) {
                throw new ForbiddenException('You are not a participant in this conversation');
            }

            const totalMessages = await this.messageRepository.count({
                where: {
                    conversation: { id: conversationId },
                    deleted_at: IsNull()
                }
            });

            const unreadCount = await this.getUnreadMessageCount(conversationId, userId);

            const lastMessage = await this.messageRepository.findOne({
                where: {
                    conversation: { id: conversationId },
                    deleted_at: IsNull()
                },
                relations: ['sender'],
                order: { created_at: 'DESC' }
            });

            return {
                conversationId,
                totalMessages,
                unreadCount,
                lastMessage: lastMessage ? {
                    id: lastMessage.id,
                    content: lastMessage.content,
                    sender: {
                        id: lastMessage.sender.id,
                        username: lastMessage.sender.username
                    },
                    created_at: lastMessage.created_at
                } : null
            };
        } catch (error) {
            throw error;
        }
    }

    /**
     * Send a message programmatically from any service
     * This method allows other services to send messages to conversations
     * 
     * @param senderId - ID of the user sending the message
     * @param conversationId - ID of the conversation
     * @param content - Message content
     * @param options - Optional parameters (type, attachments, client_msg_id, username)
     * @returns Promise with success status and message details
     * 
     * @example
     * ```typescript
     * // In any service, inject ChatService:
     * constructor(private readonly chatService: ChatService) {}
     * 
     * // Send a notification message:
     * await this.chatService.sendMessage(
     *     userId,
     *     conversationId,
     *     'Your offer has been accepted!',
     *     { type: MessageType.SYSTEM }
     * );
     * 
     * // Send with attachment:
     * await this.chatService.sendMessage(
     *     userId,
     *     conversationId,
     *     'Check out this document',
     *     {
     *         type: MessageType.FILE,
     *         attachments: [{
     *             id: uploadEntityId,
     *             name: 'document.pdf',
     *             path: 'uploads/document.pdf',
     *             mime: 'application/pdf',
     *             size: 1024
     *         }]
     *     }
     * );
     * 
     * // Send with JSON data:
     * await this.chatService.sendMessage(
     *     userId,
     *     conversationId,
     *     'Offer notification',
     *     {
     *         type: MessageType.SYSTEM,
     *         json_data: {
     *             offerId: 123,
     *             status: 'accepted',
     *             amount: 5000,
     *             metadata: { custom: 'data' }
     *         }
     *     }
     * );
     * ```
     */
    async sendMessage(
        senderId: number,
        conversationId: number,
        content: string,
        options: {
            type?: MessageType;
            attachments?: Array<{
                id?: number;
                name: string;
                path: string;
                mime: string;
                size: number;
                type?: string;
            }>;
            json_data?: Record<string, any>;
            client_msg_id?: string;
            username?: string;
        } = {}
    ): Promise<{ success: boolean; messageId: string; timestamp: string }> {
        try {
            // Verify conversation exists
            const conversation = await this.conversationRepository.findOne({
                where: { id: conversationId }
            });

            if (!conversation) {
                throw new NotFoundException(`Conversation with ID ${conversationId} not found`);
            }

            // Get sender username if not provided
            let username = options.username;
            if (!username) {
                const sender = await this.userRepository.findOne({
                    where: { id: senderId },
                    select: ['id', 'username']
                });
                username = sender?.username || 'System';
            }

            // Generate client_msg_id if not provided
            const clientMsgId = options.client_msg_id || this.generateClientMessageId();

            // Build message payload
            const message = {
                id: clientMsgId,
                conversationId,
                sender_id: senderId,
                content,
                json_data: options.json_data || null,
                attachments: options.attachments || [],
                username,
                type: options.type || MessageType.TEXT,
                timestamp: new Date().toISOString(),
                metadata: {
                    client_msg_id: clientMsgId,
                    client_id: 'system',
                    ip: 'system',
                },
            };

            // 1. Broadcast via Redis for real-time delivery
            await RedisIoAdapter.publish(`conv:${conversationId}`, JSON.stringify({
                type: 'message',
                data: message
            }));

            // 2. Send to Kafka for persistence
            await this.kafkaService.sendMessage('chat.message.sent', {
                key: conversationId.toString(),
                value: message
            });

            return {
                success: true,
                messageId: clientMsgId,
                timestamp: message.timestamp
            };
        } catch (error) {
            console.error('Error sending message programmatically:', error);
            throw error;
        }
    }





    /**
     * Find or create a DIRECT conversation between two users.
     */
    private async getOrCreateDirectConversation(senderId: number, receiverId: number): Promise<ConversationEntity> {
        // Try to find a conversation that includes exactly these two users
        const raw = await this.conversationParticipantRepository
            .createQueryBuilder('cp')
            .select('cp.conversation_id', 'conversation_id')
            .where('cp.user_id IN (:...ids)', { ids: [senderId, receiverId] })
            .groupBy('cp.conversation_id')
            .having('COUNT(DISTINCT cp.user_id) = 2')
            .getRawOne<{ conversation_id: number }>();

        if (raw?.conversation_id) {
            const existing = await this.conversationRepository.findOne({ where: { id: raw.conversation_id } });
            if (existing) return existing;
        }

        // Create a new direct conversation
        const created = await this.createConversation({
            type: ConversationType.DIRECT,
            title: null as any,
            participant_ids: [senderId, receiverId],
            admin_ids: [],
        } as any);

        // createConversation returns a shaped object; refetch actual entity
        const entity = await this.conversationRepository.findOne({ where: { id: created.id } });
        return entity;
    }

    /**
     * Send a message to a user via a direct conversation. Creates the conversation if missing.
     */
    async sendMessageToUserDirect(
        senderId: number,
        receiverId: number,
        content: string,
        options: {
            type?: MessageType;
            attachments?: Array<{
                id?: number;
                name: string;
                path: string;
                mime: string;
                size: number;
                type?: string;
            }>;
            json_data?: Record<string, any>;
            client_msg_id?: string;
            username?: string;
        } = {}
    ): Promise<{ success: boolean; messageId: string; timestamp: string }> {
        const conversation = await this.getOrCreateDirectConversation(senderId, receiverId);
        return this.sendMessage(senderId, conversation.id, content, options);
    }

    /**
     * After the brand submits sponsorship feedback, hide the "Rate creator" CTA
     * on the original auto-sent rating prompt (same client_msg_id as delivery prompt).
     */
    async markRatingPromptSubmitted(offeringOrderId: number): Promise<void> {
        const clientMsgId = `rating-prompt-order-${offeringOrderId}`;
        const message = await this.messageRepository.findOne({
            where: { client_msg_id: clientMsgId },
        });
        if (!message) {
            return;
        }
        const prev = (message.json_data && typeof message.json_data === 'object' ? message.json_data : {}) as Record<
            string,
            unknown
        >;
        message.json_data = {
            ...prev,
            kind: 'creator_rating_prompt',
            rating_submitted: true,
        };
        await this.messageRepository.save(message);
    }

    /**
     * Acknowledge a message
     */
    async acknowledgeMessage(messageId: string, userId: number) {
        const message = await this.messageRepository.findOne({
            where: { client_msg_id: messageId },
            relations: ['conversation']
        });

        if (!message) {
            throw new NotFoundException('Message not found');
        }

        message.json_data = { ...message.json_data, acknowledged: true };
        await this.messageRepository.save(message);
        return { success: true, messageId };

    }


    /**
     * Generate a unique client message ID
     */
    private generateClientMessageId(): string {
        return `${Date.now()}-${uuidv4().replace(/-/g, '')}`;
    }
}
