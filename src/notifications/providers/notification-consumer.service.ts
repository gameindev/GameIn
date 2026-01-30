import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { KafkaService } from '../../kafka/kafka.service';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from '../dtos/create-notification.dto';
import { EachMessagePayload } from 'kafkajs';

/**
 * Kafka Consumer for Notification Events
 * 
 * This service listens to Kafka topic 'notifications.send' and processes
 * notification requests asynchronously.
 * 
 * Other services can publish notification events to this topic without
 * directly coupling to the notification service.
 */
@Injectable()
export class NotificationConsumerService implements OnModuleInit {
    private readonly logger = new Logger(NotificationConsumerService.name);
    private readonly topic = 'notifications.send';

    constructor(
        private readonly kafkaService: KafkaService,
        private readonly notificationService: NotificationService,
    ) {}

    async onModuleInit() {
        // Subscribe immediately to ensure we register before consumer starts
        // If Kafka isn't ready yet, we'll retry
        try {
            await this.initializeConsumer();
        } catch (error) {
            // If error is about consumer already running, it might be a race condition
            // Check if we're already subscribed (handler exists)
            if (error.message?.includes('already running')) {
                this.logger.warn(
                    `Consumer already running when trying to subscribe to ${this.topic}. ` +
                    `This may be a race condition. Will retry once.`,
                );
            } else {
                this.logger.warn('Failed to initialize notification consumer on first attempt, retrying...', error.message);
            }
            
            // Retry after a short delay if Kafka service isn't ready
            setTimeout(async () => {
                try {
                    await this.initializeConsumer();
                } catch (retryError) {
                    // If still failing due to consumer running, check if handler exists
                    if (retryError.message?.includes('already running')) {
                        this.logger.warn(
                            `Cannot subscribe to ${this.topic} - consumer is running. ` +
                            `If this topic was already subscribed by another service, notifications may still work.`,
                        );
                    } else {
                        this.logger.error('Failed to initialize notification consumer after retry:', retryError);
                    }
                    // Don't retry indefinitely - log error and continue
                    // The service will work once Kafka is properly initialized
                }
            }, 1000);
        }
    }

    private async initializeConsumer() {
        try {
            // Use subscribeToMessagePersistence to avoid conflicts with the main consumer
            // This uses a separate consumer instance that can handle multiple topics
            await this.kafkaService.subscribeToMessagePersistence(
                this.topic,
                this.handleNotificationEvent.bind(this),
                false, // Don't read from beginning
            );
            this.logger.log(`✅ Notification consumer initialized for topic: ${this.topic}`);
        } catch (error) {
            this.logger.error(`Failed to subscribe to topic ${this.topic}:`, error);
            throw error;
        }
    }

    private async handleNotificationEvent(payload: EachMessagePayload): Promise<void> {
        try {
            const messageValue = payload.message.value.toString();
            const notificationData: CreateNotificationDto = JSON.parse(messageValue);

            this.logger.log(`Received notification event: ${notificationData.type} for user ${notificationData.userId}`);

            // Validate required fields
            if (!notificationData.userId || !notificationData.type || !notificationData.channels || !notificationData.title || !notificationData.message) {
                this.logger.error('Invalid notification data received:', notificationData);
                return;
            }

            // Send notification
            const result = await this.notificationService.sendNotification(notificationData);

            if (result.success) {
                this.logger.log(
                    `Notification sent successfully. Channels: ${result.notifications.filter(n => n.success).map(n => n.channel).join(', ')}`,
                );
            } else {
                this.logger.warn(
                    `Notification partially failed. Results: ${JSON.stringify(result.notifications)}`,
                );
            }
        } catch (error) {
            this.logger.error(`Error processing notification event: ${error.message}`, error.stack);
            // Don't throw - let Kafka handle retries if needed
        }
    }
}

