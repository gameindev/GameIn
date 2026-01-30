import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationChannelInterface, SendNotificationOptions } from '../../interfaces/notification-channel.interface';
import { NotificationChannel } from '../../enums/notification-channel.enum';
import { NotificationStatus } from '../../enums/notification-status.enum';
import { NotificationEntity } from '../../entities/notification.entity';
import { RedisIoAdapter } from '../../../redis/redisIOAdaptor.service';

@Injectable()
export class InAppChannelProvider implements NotificationChannelInterface {
    private readonly logger = new Logger(InAppChannelProvider.name);
    readonly channel = NotificationChannel.IN_APP;

    constructor(
        @InjectRepository(NotificationEntity)
        private readonly notificationRepository: Repository<NotificationEntity>,
    ) {}

    async isAvailable(): Promise<boolean> {
        // In-app notifications are always available
        return true;
    }

    async send(options: SendNotificationOptions): Promise<{
        success: boolean;
        externalId?: string;
        error?: string;
    }> {
        try {
            // Create notification record
            const notification = this.notificationRepository.create({
                user_id: options.userId,
                type: options.type,
                channel: this.channel,
                title: options.title,
                message: options.message,
                data: options.data,
                metadata: options.metadata,
                status: NotificationStatus.SENT,
                sent_at: new Date(),
            });

            const saved = await this.notificationRepository.save(notification);

            // Broadcast via Redis for real-time delivery
            await this.broadcastNotification(options.userId, {
                id: saved.id,
                type: options.type,
                title: options.title,
                message: options.message,
                data: options.data,
                created_at: saved.created_at,
            });

            this.logger.log(`In-app notification sent to user ${options.userId}`);

            return {
                success: true,
                externalId: saved.id.toString(),
            };
        } catch (error) {
            this.logger.error(`Failed to send in-app notification: ${error.message}`, error.stack);
            return {
                success: false,
                error: error.message,
            };
        }
    }

    private async broadcastNotification(userId: number, notification: any): Promise<void> {
        try {
            // Publish to Redis channel for real-time WebSocket delivery
            await RedisIoAdapter.publish(
                `notifications:user:${userId}`,
                JSON.stringify({
                    type: 'notification',
                    data: notification,
                }),
            );
        } catch (error) {
            this.logger.error(`Failed to broadcast notification via Redis: ${error.message}`);
        }
    }
}

