import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationEntity } from '../entities/notification.entity';
import { NotificationPreferenceEntity } from '../entities/notification-preference.entity';
import { NotificationChannel } from '../enums/notification-channel.enum';
import { NotificationType } from '../enums/notification-type.enum';
import { NotificationStatus } from '../enums/notification-status.enum';
import { NotificationChannelFactory } from './notification-channel.factory';
import { CreateNotificationDto } from '../dtos/create-notification.dto';

@Injectable()
export class NotificationService {
    private readonly logger = new Logger(NotificationService.name);

    constructor(
        @InjectRepository(NotificationEntity)
        private readonly notificationRepository: Repository<NotificationEntity>,
        @InjectRepository(NotificationPreferenceEntity)
        private readonly preferenceRepository: Repository<NotificationPreferenceEntity>,
        private readonly channelFactory: NotificationChannelFactory,
    ) {}

    /**
     * Send notification to user through specified channels
     */
    async sendNotification(dto: CreateNotificationDto): Promise<{
        success: boolean;
        notifications: Array<{ channel: NotificationChannel; success: boolean; externalId?: string }>;
    }> {
        const results = [];

        for (const channel of dto.channels) {
            try {
                // Skip preference check for IN_APP notifications (always enabled)
                if (channel !== NotificationChannel.IN_APP) {
                    // Check user preferences for other channels
                    const isEnabled = await this.isChannelEnabled(
                        dto.userId,
                        dto.type,
                        channel,
                    );

                    if (!isEnabled) {
                        this.logger.log(
                            `Skipping ${channel} notification for user ${dto.userId} - channel disabled`,
                        );
                        results.push({ channel, success: false, reason: 'channel_disabled' });
                        continue;
                    }
                }

                // Get channel provider
                const provider = this.channelFactory.getProvider(channel);

                // Check if provider is available
                const isAvailable = await provider.isAvailable();
                if (!isAvailable) {
                    this.logger.warn(`Channel ${channel} is not available`);
                    results.push({ channel, success: false, reason: 'provider_unavailable' });
                    continue;
                }

                // Add delay if specified
                if (dto.delaySeconds && dto.delaySeconds > 0) {
                    await this.delay(dto.delaySeconds * 1000);
                }

                // Send notification
                const result = await provider.send({
                    userId: dto.userId,
                    type: dto.type,
                    title: dto.title,
                    message: dto.message,
                    data: dto.data,
                    metadata: {
                        ...dto.metadata,
                        priority: dto.priority || 'normal',
                    },
                });

                results.push({
                    channel,
                    success: result.success,
                    externalId: result.externalId,
                    error: result.error,
                });

                if (result.success) {
                    this.logger.log(
                        `Notification sent via ${channel} to user ${dto.userId}`,
                    );
                } else {
                    this.logger.error(
                        `Failed to send notification via ${channel} to user ${dto.userId}: ${result.error}`,
                    );
                }
            } catch (error) {
                this.logger.error(
                    `Error sending notification via ${channel}: ${error.message}`,
                    error.stack,
                );
                results.push({
                    channel,
                    success: false,
                    error: error.message,
                });
            }
        }

        const successCount = results.filter((r) => r.success).length;
        return {
            success: successCount > 0,
            notifications: results,
        };
    }

    /**
     * Check if a notification channel is enabled for a user
     */
    async isChannelEnabled(
        userId: number,
        type: NotificationType,
        channel: NotificationChannel,
    ): Promise<boolean> {
        const preference = await this.preferenceRepository.findOne({
            where: {
                user_id: userId,
                type,
                channel,
            },
        });

        // If no preference exists, default to enabled
        return preference ? preference.enabled : true;
    }

    /**
     * Get user notification preferences
     */
    async getUserPreferences(userId: number): Promise<NotificationPreferenceEntity[]> {
        return this.preferenceRepository.find({
            where: { user_id: userId },
        });
    }

    /**
     * Required notification types that cannot be disabled
     * These are essential for order management and platform communication
     */
    private readonly REQUIRED_NOTIFICATION_TYPES = [
        NotificationType.ORDER_CREATED,
        NotificationType.ORDER_COMPLETED,
        NotificationType.ORDER_CANCELLED,
    ] as const;

    /**
     * Update user notification preference
     */
    async updatePreference(
        userId: number,
        type: NotificationType,
        channel: NotificationChannel,
        enabled: boolean,
    ): Promise<NotificationPreferenceEntity> {
        // Prevent disabling required notification types
        if (!enabled && (this.REQUIRED_NOTIFICATION_TYPES as readonly NotificationType[]).includes(type)) {
            throw new BadRequestException(
                `Cannot disable ${type} notifications - they are required for order management`,
            );
        }

        let preference = await this.preferenceRepository.findOne({
            where: {
                user_id: userId,
                type,
                channel,
            },
        });

        if (preference) {
            preference.enabled = enabled;
        } else {
            preference = this.preferenceRepository.create({
                user_id: userId,
                type,
                channel,
                enabled,
            });
        }

        return this.preferenceRepository.save(preference);
    }

    /**
     * Update multiple preferences in batch
     */
    async updatePreferencesBatch(
        userId: number,
        preferences: Array<{ type: NotificationType; channel: NotificationChannel; enabled: boolean }>,
    ): Promise<NotificationPreferenceEntity[]> {
        const results = [];

        for (const pref of preferences) {
            // Skip IN_APP channel - it's always enabled
            if (pref.channel === NotificationChannel.IN_APP) {
                continue;
            }

            // Prevent disabling required types (validation happens in updatePreference)
            // But we can skip silently to avoid partial failures
            if (
                !pref.enabled &&
                this.REQUIRED_NOTIFICATION_TYPES.includes(
                    pref.type as
                        | NotificationType.ORDER_CREATED
                        | NotificationType.ORDER_COMPLETED
                        | NotificationType.ORDER_CANCELLED
                )
            ) {
                this.logger.warn(
                    `Skipping disable of required notification type: ${pref.type} for user ${userId}`,
                );
                continue;
            }

            try {
                const saved = await this.updatePreference(
                    userId,
                    pref.type,
                    pref.channel,
                    pref.enabled,
                );
                results.push(saved);
            } catch (error) {
                // If it's a required preference error, skip it
                if (error instanceof BadRequestException && error.message.includes('required')) {
                    this.logger.warn(
                        `Skipping required notification type: ${pref.type} for user ${userId}`,
                    );
                    continue;
                }
                // Re-throw other errors
                throw error;
            }
        }

        return results;
    }

    /**
     * Initialize default preferences for a new user
     * This is called when a user registers
     * By default, all channels are enabled (except IN_APP which is always enabled)
     */
    async initializeDefaultPreferences(userId: number): Promise<void> {
        const defaultPreferences: Array<{ type: NotificationType; channel: NotificationChannel; enabled: boolean }> = [
            // Chat notifications
            { type: NotificationType.NEW_MESSAGE, channel: NotificationChannel.EMAIL, enabled: false },
            // SMS disabled for now - uncomment when ready
            // { type: NotificationType.NEW_MESSAGE, channel: NotificationChannel.SMS, enabled: true },
            
            // Order notifications (required - always enabled)
            { type: NotificationType.ORDER_CREATED, channel: NotificationChannel.EMAIL, enabled: true },
            { type: NotificationType.ORDER_COMPLETED, channel: NotificationChannel.EMAIL, enabled: true },
            // { type: NotificationType.ORDER_COMPLETED, channel: NotificationChannel.SMS, enabled: true },
            { type: NotificationType.ORDER_CANCELLED, channel: NotificationChannel.EMAIL, enabled: true },
            
            // Offer notifications
            { type: NotificationType.OFFER_RECEIVED, channel: NotificationChannel.EMAIL, enabled: true },
            // { type: NotificationType.OFFER_RECEIVED, channel: NotificationChannel.SMS, enabled: true },
            { type: NotificationType.OFFER_ACCEPTED, channel: NotificationChannel.EMAIL, enabled: true },
            { type: NotificationType.OFFER_REJECTED, channel: NotificationChannel.EMAIL, enabled: true },
            
            // Payment notifications
            { type: NotificationType.PAYMENT_RECEIVED, channel: NotificationChannel.EMAIL, enabled: true },
            { type: NotificationType.PAYMENT_FAILED, channel: NotificationChannel.EMAIL, enabled: true },
            { type: NotificationType.INVOICE_GENERATED, channel: NotificationChannel.EMAIL, enabled: true },
            
            // Social notifications
            { type: NotificationType.NEW_FOLLOWER, channel: NotificationChannel.EMAIL, enabled: true },
            // { type: NotificationType.NEW_FOLLOWER, channel: NotificationChannel.SMS, enabled: true },
            { type: NotificationType.POST_LIKED, channel: NotificationChannel.EMAIL, enabled: false },
            { type: NotificationType.PROFILE_VIEW, channel: NotificationChannel.EMAIL, enabled: false },
            
            // System notifications
            { type: NotificationType.SYSTEM_ANNOUNCEMENT, channel: NotificationChannel.EMAIL, enabled: true },
            // { type: NotificationType.SYSTEM_ANNOUNCEMENT, channel: NotificationChannel.SMS, enabled: true },
        ];

        await this.updatePreferencesBatch(userId, defaultPreferences);
        this.logger.log(`Initialized default preferences for user ${userId}`);
    }

    /**
     * Get user notifications
     */
    async getUserNotifications(
        userId: number,
        limit: number = 50,
        offset: number = 0,
        unreadOnly: boolean = false,
    ): Promise<{ notifications: NotificationEntity[]; total: number }> {
        const queryBuilder = this.notificationRepository
            .createQueryBuilder('notification')
            .where('notification.user_id = :userId', { userId })
            .orderBy('notification.created_at', 'DESC')
            .take(limit)
            .skip(offset);

        if (unreadOnly) {
            queryBuilder.andWhere('notification.read_at IS NULL');
        }

        const [notifications, total] = await queryBuilder.getManyAndCount();

        return { notifications, total };
    }

    /**
     * Mark notification as read
     */
    async markAsRead(notificationId: number, userId: number): Promise<NotificationEntity> {
        const notification = await this.notificationRepository.findOne({
            where: { id: notificationId, user_id: userId },
        });

        if (!notification) {
            throw new Error('Notification not found');
        }

        notification.read_at = new Date();
        notification.status = NotificationStatus.READ;
        return this.notificationRepository.save(notification);
    }

    /**
     * Mark all notifications as read for a user
     */
    async markAllAsRead(userId: number): Promise<{ count: number }> {
        const result = await this.notificationRepository.update(
            {
                user_id: userId,
                read_at: null as any,
            },
            {
                read_at: new Date(),
                status: NotificationStatus.READ,
            },
        );

        return { count: result.affected || 0 };
    }

    /**
     * Delete notification
     */
    async deleteNotification(notificationId: number, userId: number): Promise<void> {
        const result = await this.notificationRepository.delete({
            id: notificationId,
            user_id: userId,
        });

        if (result.affected === 0) {
            throw new Error('Notification not found');
        }
    }

    private delay(ms: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}

