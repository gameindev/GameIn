import { Inject, Injectable } from "@nestjs/common";
import { EmailProviderInterface, SendOptions } from "../interfaces/email-provider.interface";
import * as sgMail from '@sendgrid/mail';
import { ConfigType } from "@nestjs/config";
import sendgridConfig from "../config/sendgrid.config";

@Injectable()
export class SendgridEmailProvider implements EmailProviderInterface {

    private defaultFrom: string;

    constructor(
        @Inject(sendgridConfig.KEY)
        private readonly config: ConfigType<typeof sendgridConfig>
    ) {
        if (!config.apiKey) {
            throw new Error('SENDGRID_API_KEY is required');
        }
        
        sgMail.setApiKey(config.apiKey);
        this.defaultFrom = config.emailFrom || 'no-reply@example.com';
    }

    async send({ to, subject, html, text, from, headers }: SendOptions): Promise<{ provider: "smtp" | "ses" | "sendgrid"; messageId: string; raw?: unknown; }> {
        const toArr = Array.isArray(to) ? to : [to];
        
        // SendGrid requires at least one of html or text
        if (!html && !text) {
            throw new Error('Either html or text content is required');
        }
        
        const msg: sgMail.MailDataRequired = {
            to: toArr,
            from: from ?? this.defaultFrom,
            subject,
            ...(html && { html }),
            ...(text && { text }),
            ...(headers && { headers }),
        };

        const [response] = await sgMail.send(msg);
        
        // SendGrid doesn't return message ID in the response directly
        // It's available via webhooks or the Activity API
        // Using a generated identifier based on timestamp and status code
        const messageId = response?.headers?.['x-message-id'] 
            || `sendgrid-${Date.now()}-${response?.statusCode || 'unknown'}`;
        
        return {
            provider: 'sendgrid' as const,
            messageId,
            raw: response,
        };
    }
}

