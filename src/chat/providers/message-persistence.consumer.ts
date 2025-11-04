import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { KafkaService } from "../../kafka/kafka.service";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { MessageEntity } from "../message.entity";
import { UploadsService } from "../../uploads/providers/uploads.service";
import { UploadEntity } from "../../uploads/upload.entity";


@Injectable()
export class MessagePersistenceConsumer implements OnModuleInit {
    private readonly logger = new Logger(MessagePersistenceConsumer.name);
    private messageBuffer: any[] = [];
    private readonly BATCH_SIZE = parseInt(process.env.MESSAGE_PERSISTENCE_BATCH_SIZE) || 100;
    private readonly FLUSH_INTERVAL = parseInt(process.env.MESSAGE_PERSISTENCE_FLUSH_INTERVAL) || 2000; // 2 seconds;

    constructor(
        @InjectRepository(MessageEntity)
        private readonly messageRepository: Repository<MessageEntity>,
        @InjectRepository(UploadEntity)
        private readonly uploadRepository: Repository<UploadEntity>,
        private readonly kafkaService: KafkaService,
        private readonly uploadsService: UploadsService,
    ) { }

    async onModuleInit() {
        // Wait a bit for Kafka service to be fully initialized
        setTimeout(async () => {
            try {
                await this.initializeConsumer();
                this.startBatchFlushTimer();
            } catch (error) {
                this.logger.error('Failed to initialize message persistence consumer:', error);
                // Retry after 5 seconds
                setTimeout(() => this.onModuleInit(), 5000);
            }
        }, 2000);
    }

    private async initializeConsumer() {
        // Subscribe to topic and read from beginning to process existing messages
        await this.kafkaService.subscribeToMessagePersistence('chat.message.sent', this.handleMessageSent.bind(this), true);
        this.logger.log('Message persistence consumer initialized - will process existing messages from beginning')
    }

    private async handleMessageSent(payload: any) {
        try {
            const messageData = JSON.parse(payload.message.value.toString());
            
            this.logger.log('Received message for persistence:', {
                content: messageData.content,
                attachmentsCount: messageData.attachments?.length || 0,
                attachments: messageData.attachments
            });

            // Process attachments to create UploadEntity records
            const processedAttachments = await this.processAttachments(messageData.attachments || []);
            
            this.logger.log('Processed attachments:', {
                count: processedAttachments.length,
                attachments: processedAttachments
            });

            this.messageBuffer.push({
                client_msg_id: messageData.metadata.client_msg_id,
                conversation: { id: messageData.conversationId },
                sender: { id: messageData.sender_id },
                content: messageData.content,
                json_data: messageData.json_data || null, // Store JSON data if present
                attachment: processedAttachments.length > 0 ? processedAttachments[0] : null, // Only first attachment for now
                type: messageData.type,
                timestamp: messageData.timestamp,
                metadata: messageData.metadata,
            })

            // Flush if buffer is full
            if (this.messageBuffer.length >= this.BATCH_SIZE) {
                await this.flushBuffer();
            }
        } catch (error) {
            this.logger.error('Error processing message:', error);
            throw error;
        }
    }

    /**
     * Process attachment data to create UploadEntity records
     */
    private async processAttachments(attachments: any[]): Promise<UploadEntity[]> {
        if (!attachments || attachments.length === 0) {
            this.logger.log('No attachments to process');
            return [];
        }

        this.logger.log(`Processing ${attachments.length} attachments`);
        const processedAttachments: UploadEntity[] = [];

        for (const attachment of attachments) {
            try {
                this.logger.log('Processing attachment:', attachment);
                
                // Check if attachment already exists by path or ID
                let uploadEntity: UploadEntity;

                if (attachment.id) {
                    // If attachment has an ID, try to find existing UploadEntity
                    this.logger.log(`Looking for existing upload by ID: ${attachment.id}`);
                    uploadEntity = await this.uploadRepository.findOne({
                        where: { id: attachment.id }
                    });
                } else if (attachment.path) {
                    // If attachment has a path, try to find by path
                    this.logger.log(`Looking for existing upload by path: ${attachment.path}`);
                    uploadEntity = await this.uploadRepository.findOne({
                        where: { path: attachment.path }
                    });
                }

                if (uploadEntity) {
                    // Use existing UploadEntity
                    this.logger.log('Found existing upload entity:', uploadEntity.id);
                    processedAttachments.push(uploadEntity);
                } else if (attachment.path && attachment.name && attachment.mime && attachment.size) {
                    // Create new UploadEntity from attachment data
                    this.logger.log('Creating new upload entity from attachment data');
                    const newUpload = this.uploadRepository.create({
                        name: attachment.name,
                        path: attachment.path,
                        mime: attachment.mime,
                        size: attachment.size,
                        type: attachment.type || (attachment.mime.startsWith('video') ? 'video' : 'image'),
                    });

                    const savedUpload = await this.uploadRepository.save(newUpload);
                    this.logger.log('Created new upload entity:', savedUpload.id);
                    processedAttachments.push(savedUpload);
                } else {
                    this.logger.warn('Invalid attachment data, skipping:', {
                        hasId: !!attachment.id,
                        hasPath: !!attachment.path,
                        hasName: !!attachment.name,
                        hasMime: !!attachment.mime,
                        hasSize: !!attachment.size,
                        attachment
                    });
                }
            } catch (error) {
                this.logger.error('Error processing attachment:', error, attachment);
            }
        }

        this.logger.log(`Processed ${processedAttachments.length} attachments`);
        return processedAttachments;
    }

    private startBatchFlushTimer() {
        setInterval(async () => {
            if (this.messageBuffer.length > 0) {
                await this.flushBuffer();
            }
        }, this.FLUSH_INTERVAL);
    }

    private async flushBuffer() {
        if (this.messageBuffer.length === 0) return;

        let messagesToPersist: any[] = [];
        try {
            messagesToPersist = [...this.messageBuffer];
            this.messageBuffer = [];

            // --- Idempotency check: filter out messages whose client_msg_id already exists ---
            const clientMsgIds = messagesToPersist.map(m => m.metadata.client_msg_id);
            if (clientMsgIds.length === 0) return;

            // Fetch existing client_msg_id from DB
            const existingMessages = await this.messageRepository
                .createQueryBuilder('message')
                .select(['message.client_msg_id'])
                .where('message.client_msg_id IN (:...clientMsgIds)', { clientMsgIds })
                .getMany();

            const existingClientMsgIds = new Set(existingMessages.map(m => m.client_msg_id));
            // Only persist messages with client_msg_id not in DB
            const filteredMessagesToPersist = messagesToPersist.filter(m => !existingClientMsgIds.has(m.metadata.client_msg_id));

            if (filteredMessagesToPersist.length === 0) {
                this.logger.log('No new messages to persist (all already present by idempotency check)');
                return;
            }

            // Insert messages individually to handle relationships properly
            const savedMessages = [];
            for (const messageData of filteredMessagesToPersist) {
                try {
                    const message = this.messageRepository.create({
                        client_msg_id: messageData.client_msg_id, 
                        conversation: messageData.conversation,
                        sender: messageData.sender,
                        content: messageData.content,
                        json_data: messageData.json_data || null,
                        attachment: messageData.attachment,
                        type: messageData.type,
                        created_at: new Date(messageData.timestamp),
                    });

                    const savedMessage = await this.messageRepository.save(message);
                    savedMessages.push(savedMessage);
                } catch (error) {
                    this.logger.error('Error saving individual message:', error, messageData);
                }
            }

            this.logger.log(`Persisted ${savedMessages.length} messages to database`);

            // Publish delivery confirmation only for new messages persisted
            await this.publishDeliveryConfirmations(filteredMessagesToPersist);
        } catch (error) {
            this.logger.error('Error flushing message buffer:', error);
            // Re-add messages to buffer for retry
            this.messageBuffer.unshift(...messagesToPersist);
        }
    }


    private async publishDeliveryConfirmations(messages: any[]) {
        for (const message of messages) {
            await this.kafkaService.sendMessage('chat.message.delivered', {
                key: message.conversation.id.toString(),
                value: {
                    messageId: message.client_msg_id,
                    conversationId: message.conversation.id,
                    senderId: message.sender.id,
                    deliveredAt: new Date().toISOString(),
                }
            });
        }
    }
}