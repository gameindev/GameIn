import { Inject, Injectable } from "@nestjs/common";
import { EmailProviderInterface, SendOptions } from "../interfaces/email-provider.interface";
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses'
import { ConfigType } from "@nestjs/config";
import sesConfig from "../config/ses.config";

@Injectable()
export class SesEmailProvider implements EmailProviderInterface {

    private client: SESClient;
    private defaultFrom: string;

    constructor(
        @Inject(sesConfig.KEY)
        private readonly config: ConfigType<typeof sesConfig>
    ) {
        this.client = new SESClient({
            region: this.config.awsRegion,
            credentials: {
                accessKeyId: this.config.awsAccessKeyId,
                secretAccessKey: this.config.awsSecretAccessKey,
            },
        });

        this.defaultFrom =
            this.config.emailFrom || this.config.awsSESSender || 'no-reply@example.com';
    }

    async send({ to, subject, html, text, from, headers }: SendOptions): Promise<{ provider: "smtp" | "ses"; messageId: string; raw?: unknown; }> {
        const toArr = Array.isArray(to) ? to : [to];
        const cmd = new SendEmailCommand({
            Destination: { ToAddresses: toArr },
            Source: from ?? this.defaultFrom,
            Message: {
                Subject: { Data: subject },
                Body: {
                    Html: html ? { Data: html } : undefined,
                    Text: text ? { Data: text } : undefined,
                },
            },
            // SES v2 headers are supported via RawEmail; for simplicity we skip headers here.
        });

        const out = await this.client.send(cmd);
        return {
            provider: 'ses' as const,
            messageId: out.MessageId ?? '',
            raw: out,
        };
    }

}