import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationChannelInterface, SendNotificationOptions } from '../../interfaces/notification-channel.interface';
import { NotificationChannel } from '../../enums/notification-channel.enum';
import { NotificationStatus } from '../../enums/notification-status.enum';
import { NotificationEntity } from '../../entities/notification.entity';
import { EmailsService } from '../../../emails/emails.service';

@Injectable()
export class EmailChannelProvider implements NotificationChannelInterface {
    private readonly logger = new Logger(EmailChannelProvider.name);
    readonly channel = NotificationChannel.EMAIL;

    constructor(
        @InjectRepository(NotificationEntity)
        private readonly notificationRepository: Repository<NotificationEntity>,
        private readonly emailsService: EmailsService,
    ) {}

    async isAvailable(): Promise<boolean> {
        // Email service is available if EmailsService is injected
        return !!this.emailsService;
    }

    async send(options: SendNotificationOptions): Promise<{
        success: boolean;
        externalId?: string;
        error?: string;
    }> {
        try {
            // Get user email from metadata or fetch from user service
            const userEmail = options.metadata?.email || options.data?.email;
            
            if (!userEmail) {
                throw new Error('User email not provided in notification metadata');
            }

            // Create notification record first
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

            // Send email - use template if provided, otherwise use raw email
            let emailResult;
            if (options.metadata?.emailTemplate && options.metadata?.emailData) {
                // Use template-based email
                emailResult = await this.emailsService.sendTemplate(
                    options.metadata.emailTemplate,
                    options.metadata.emailData,
                    {
                        to: userEmail,
                        subject: options.metadata.emailSubject || options.title,
                        textFallback: options.message,
                    }
                );
            } else {
                // Use raw email
                emailResult = await this.emailsService.sendRaw({
                    to: userEmail,
                    subject: options.metadata?.emailSubject || options.title,
                    html: this.formatEmailMessage(options.message, options.data),
                    text: options.message,
                });
            }

            // Update notification with result
            saved.external_id = emailResult.messageId;
            saved.status = NotificationStatus.SENT;
            saved.sent_at = new Date();
            await this.notificationRepository.save(saved);

            this.logger.log(`Email notification sent to ${userEmail} (messageId: ${emailResult.messageId})`);

            return {
                success: true,
                externalId: emailResult.messageId,
            };
        } catch (error) {
            this.logger.error(`Failed to send email notification: ${error.message}`, error.stack);
            
            // Update notification with error
            try {
                const notification = await this.notificationRepository.findOne({
                    where: { user_id: options.userId, type: options.type },
                    order: { created_at: 'DESC' },
                });
                if (notification) {
                    notification.status = NotificationStatus.FAILED;
                    notification.error_message = error.message;
                    await this.notificationRepository.save(notification);
                }
            } catch (updateError) {
                this.logger.error(`Failed to update notification error: ${updateError.message}`);
            }

            return {
                success: false,
                error: error.message,
            };
        }
    }

    private formatEmailMessage(message: string, data?: Record<string, any>): string {
        // Simple HTML formatting - can be enhanced with templates
        let html = `<div style="font-family: Arial, sans-serif; padding: 20px;">`;
        html += `<h2>${message}</h2>`;
        
        if (data) {
            html += `<div style="margin-top: 20px;">`;
            for (const [key, value] of Object.entries(data)) {
                html += `<p><strong>${key}:</strong> ${value}</p>`;
            }
            html += `</div>`;
        }
        
        html += `</div>`;
        return html;
    }
}

