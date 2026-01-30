import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationChannelInterface, SendNotificationOptions } from '../../interfaces/notification-channel.interface';
import { NotificationChannel } from '../../enums/notification-channel.enum';
import { NotificationStatus } from '../../enums/notification-status.enum';
import { NotificationEntity } from '../../entities/notification.entity';
import { ConfigService } from '@nestjs/config';

/**
 * SMS Channel Provider
 * 
 * This is a placeholder implementation. You'll need to integrate with an SMS provider like:
 * - Twilio
 * - AWS SNS
 * - MessageBird
 * - Vonage (formerly Nexmo)
 * 
 * For now, it logs the SMS and creates a notification record.
 */
@Injectable()
export class SmsChannelProvider implements NotificationChannelInterface {
    private readonly logger = new Logger(SmsChannelProvider.name);
    readonly channel = NotificationChannel.SMS;
    private readonly smsProvider: string;
    private readonly smsEnabled: boolean;

    constructor(
        @InjectRepository(NotificationEntity)
        private readonly notificationRepository: Repository<NotificationEntity>,
        private readonly configService: ConfigService,
    ) {
        this.smsProvider = this.configService.get<string>('SMS_PROVIDER') || 'none';
        this.smsEnabled = this.configService.get<string>('SMS_ENABLED') === 'true';
    }

    async isAvailable(): Promise<boolean> {
        return this.smsEnabled && this.smsProvider !== 'none';
    }

    async send(options: SendNotificationOptions): Promise<{
        success: boolean;
        externalId?: string;
        error?: string;
    }> {
        try {
            // Get user phone number from metadata
            const phoneNumber = options.metadata?.phoneNumber || options.data?.phoneNumber;
            
            if (!phoneNumber) {
                throw new Error('User phone number not provided in notification metadata');
            }

            // Create notification record
            const notification = this.notificationRepository.create({
                user_id: options.userId,
                type: options.type,
                channel: this.channel,
                title: options.title,
                message: options.message,
                data: options.data,
                metadata: options.metadata,
                status: NotificationStatus.PENDING,
            });

            const saved = await this.notificationRepository.save(notification);

            // TODO: Integrate with actual SMS provider
            // Example with Twilio:
            // const twilio = require('twilio');
            // const client = twilio(accountSid, authToken);
            // const result = await client.messages.create({
            //     body: options.message,
            //     to: phoneNumber,
            //     from: twilioPhoneNumber,
            // });

            // For now, just log it
            this.logger.log(`[SMS] Would send to ${phoneNumber}: ${options.message}`);
            this.logger.warn('SMS provider not configured. Please integrate with Twilio, AWS SNS, or another SMS provider.');

            // Update notification
            saved.status = NotificationStatus.SENT;
            saved.sent_at = new Date();
            saved.external_id = `mock-${Date.now()}`;
            await this.notificationRepository.save(saved);

            return {
                success: true,
                externalId: saved.external_id,
            };
        } catch (error) {
            this.logger.error(`Failed to send SMS notification: ${error.message}`, error.stack);
            
            return {
                success: false,
                error: error.message,
            };
        }
    }
}

