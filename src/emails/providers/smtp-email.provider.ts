import { Inject, Injectable } from "@nestjs/common";
import { EmailProviderInterface, SendOptions } from "../interfaces/email-provider.interface";
import * as nodemailer from 'nodemailer'
import { ConfigService, ConfigType } from "@nestjs/config";
import smtpConfig from "../config/smtp.config";

@Injectable()
export class SmtpEmailProvider implements EmailProviderInterface {
    private transporter: nodemailer.Transporter;
    private defaultFrom: string;

    constructor(
        @Inject(smtpConfig.KEY)
        private readonly config: ConfigType<typeof smtpConfig>
    ) {
        this.transporter = nodemailer.createTransport({
            host: this.config.smtpHost,
            port: Number(this.config.smtpPort) ?? 587,
            secure: false,
            auth: {
                user: this.config.smtpUser,
                pass: this.config.smtpPassword,
            },
        })

        this.defaultFrom = this.config.emailFrom || 'no-reply@gamein.dev';
    }

    async send({ to, from, subject, html, text, headers }: SendOptions): Promise<{ provider: "smtp" | "ses"; messageId: string; raw?: unknown; }> {
        const info = await this.transporter.sendMail({
            from: from ?? this.defaultFrom,
            to: Array.isArray(to) ? to.join(',') : to,
            subject,
            html,
            text,
            headers,
        });

        return { provider: 'smtp' as const, messageId: info.messageId, raw: info };
    }


}