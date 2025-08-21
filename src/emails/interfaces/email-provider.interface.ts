
export type EmailAddress = string;

export interface SendOptions {
    to: EmailAddress | EmailAddress[];
    subject: string;
    html?: string;
    text?: string;
    from?: string; // optional override
    headers?: Record<string, string>;
}

export interface EmailProviderInterface {
    send(options: SendOptions): Promise<{
        provider: 'smtp' | 'ses';
        messageId: string;
        raw?: unknown;
    }>;
}