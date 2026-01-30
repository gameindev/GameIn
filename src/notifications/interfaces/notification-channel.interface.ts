import { NotificationChannel } from '../enums/notification-channel.enum';
import { NotificationType } from '../enums/notification-type.enum';

export interface SendNotificationOptions {
    userId: number;
    type: NotificationType;
    title: string;
    message: string;
    data?: Record<string, any>;
    metadata?: Record<string, any>;
}

export interface NotificationChannelInterface {
    /**
     * The channel this provider handles
     */
    readonly channel: NotificationChannel;

    /**
     * Send a notification through this channel
     * @param options Notification options
     * @returns Promise with external ID and success status
     */
    send(options: SendNotificationOptions): Promise<{
        success: boolean;
        externalId?: string;
        error?: string;
    }>;

    /**
     * Check if this channel is available/configured
     */
    isAvailable(): Promise<boolean>;
}

