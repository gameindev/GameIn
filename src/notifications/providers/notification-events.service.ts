import { Injectable, Logger } from '@nestjs/common';
import { KafkaService } from '../../kafka/kafka.service';
import { CreateNotificationDto } from '../dtos/create-notification.dto';
import { NotificationType } from '../enums/notification-type.enum';
import { NotificationChannel } from '../enums/notification-channel.enum';

/**
 * Notification Events Service
 * 
 * This service allows other services to publish notification events to Kafka
 * without directly coupling to the notification service.
 * 
 * Usage in other services:
 * ```typescript
 * constructor(private readonly notificationEvents: NotificationEventsService) {}
 * 
 * async someAction() {
 *   // Publish notification event
 *   await this.notificationEvents.publishNotification({
 *     userId: 123,
 *     type: NotificationType.OFFER_RECEIVED,
 *     channels: [NotificationChannel.IN_APP, NotificationChannel.EMAIL],
 *     title: 'New Offer Received',
 *     message: 'You have received a new offer',
 *     data: { offerId: 456 }
 *   });
 * }
 */
@Injectable()
export class NotificationEventsService {
    private readonly logger = new Logger(NotificationEventsService.name);
    private readonly topic = 'notifications.send';

    constructor(private readonly kafkaService: KafkaService) {}

    /**
     * Publish a notification event to Kafka
     * This is the main method other services should use
     */
    async publishNotification(dto: CreateNotificationDto): Promise<void> {
        try {
            await this.kafkaService.sendMessage(this.topic, {
                key: `${dto.userId}-${Date.now()}`, // Ensure ordering per user
                value: dto,
            });

            this.logger.log(
                `Published notification event: ${dto.type} for user ${dto.userId}`,
            );
        } catch (error) {
            this.logger.error(
                `Failed to publish notification event: ${error.message}`,
                error.stack,
            );
            throw error;
        }
    }

    /**
     * Helper method to send a simple notification
     */
    async notifyUser(
        userId: number,
        type: NotificationType,
        title: string,
        message: string,
        options?: {
            channels?: NotificationChannel[];
            data?: Record<string, any>;
            metadata?: Record<string, any>;
            priority?: 'low' | 'normal' | 'high';
            delaySeconds?: number;
        },
    ): Promise<void> {
        const dto: CreateNotificationDto = {
            userId,
            type,
            channels: options?.channels || [NotificationChannel.IN_APP],
            title,
            message,
            data: options?.data,
            metadata: options?.metadata,
            priority: options?.priority,
            delaySeconds: options?.delaySeconds,
        };

        await this.publishNotification(dto);
    }

    /**
     * Convenience methods for common notification types
     */
    async notifyNewMessage(
        userId: number,
        conversationId: number,
        senderName: string,
        messagePreview: string,
    ): Promise<void> {
        await this.notifyUser(
            userId,
            NotificationType.NEW_MESSAGE,
            'New Message',
            `${senderName}: ${messagePreview}`,
            {
                channels: [NotificationChannel.IN_APP, NotificationChannel.PUSH],
                data: { conversationId, senderName },
                priority: 'high',
            },
        );
    }

    async notifyOfferReceived(
        userId: number,
        offerId: number,
        offerAmount: number,
    ): Promise<void> {
        await this.notifyUser(
            userId,
            NotificationType.OFFER_RECEIVED,
            'New Offer Received',
            `You have received a new offer of $${offerAmount}`,
            {
                channels: [NotificationChannel.IN_APP, NotificationChannel.EMAIL],
                data: { offerId, amount: offerAmount },
                priority: 'high',
            },
        );
    }

    async notifyPaymentReceived(
        userId: number,
        amount: number,
        orderId: number,
    ): Promise<void> {
        await this.notifyUser(
            userId,
            NotificationType.PAYMENT_RECEIVED,
            'Payment Received',
            `You have received a payment of $${amount}`,
            {
                channels: [NotificationChannel.IN_APP, NotificationChannel.EMAIL],
                data: { amount, orderId },
                priority: 'normal',
            },
        );
    }
}

