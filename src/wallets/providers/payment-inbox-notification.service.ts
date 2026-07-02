import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChatService } from '../../chat/providers/chat.service';
import { MessageType } from '../../chat/enum/message-type.enum';
import { NotificationType } from '../../notifications/enums/notification-type.enum';

type PaymentInboxKind =
    | NotificationType.PAYMENT_SECURED
    | NotificationType.PAYMENT_FAILED
    | NotificationType.PAYMENT_RECEIVED
    | NotificationType.FUNDS_RELEASED
    | NotificationType.WALLET_TOP_UP
    | NotificationType.PAYOUT_COMPLETED
    | NotificationType.CONNECT_SETUP_REQUIRED;

interface OrderPaymentInboxParams {
    brandId: number;
    creatorId: number;
    orderId: number;
    orderTitle: string;
    amount: number;
    currency: string;
    paymentMethod?: 'card' | 'wallet';
}

interface SoloPaymentInboxParams {
    userId: number;
    amount?: number;
    currency?: string;
    title: string;
    message: string;
    notificationType: PaymentInboxKind;
    data?: Record<string, unknown>;
    idempotencyKey: string;
}

@Injectable()
export class PaymentInboxNotificationService {
    private readonly logger = new Logger(PaymentInboxNotificationService.name);

    constructor(
        private readonly chatService: ChatService,
        private readonly configService: ConfigService,
    ) {}

    private paymentsPath(): string {
        const raw = this.configService.get<string>('paymentsConfig.frontendUrl')
            ?? process.env.FRONTEND_HOST
            ?? process.env.FRONTEND_URL
            ?? 'https://gamein.gg';
        const base = raw.replace(/\/+$/, '');
        return `${base}/#/settings/payments`;
    }

    private formatAmount(amount: number, currency: string): string {
        const code = (currency || 'USD').toUpperCase();
        const value = Number(amount);
        if (Number.isNaN(value)) {
            return `${code} ${amount}`;
        }
        if (code === 'USD') {
            return `$${value.toFixed(2)}`;
        }
        return `${code} ${value.toFixed(2)}`;
    }

    private async sendThreadMessage(
        senderId: number,
        recipientId: number,
        content: string,
        options: {
            notificationType: PaymentInboxKind;
            idempotencyKey: string;
            data?: Record<string, unknown>;
        },
    ): Promise<void> {
        if (!senderId || !recipientId || senderId === recipientId) {
            return;
        }

        try {
            await this.chatService.sendMessageToUserDirect(senderId, recipientId, content, {
                type: MessageType.SYSTEM,
                username: 'GameIn Payments',
                json_data: {
                    kind: 'payment_transaction',
                    notificationType: options.notificationType,
                    paymentsPath: this.paymentsPath(),
                    ...(options.data ?? {}),
                },
                client_msg_id: options.idempotencyKey,
            });
        } catch (error) {
            this.logger.warn(
                `Failed to send payment inbox message (${options.idempotencyKey}): ${(error as Error)?.message ?? error}`,
            );
        }
    }

    private async sendSoloPaymentMessage(params: SoloPaymentInboxParams): Promise<void> {
        const systemUserId = this.configService.get<number>('walletConfig.systemUserId')
            ?? parseInt(process.env.GAMEIN_SYSTEM_USER_ID ?? '', 10);

        if (!systemUserId || systemUserId === params.userId) {
            this.logger.debug(
                `Skipping solo payment inbox message (${params.idempotencyKey}); configure GAMEIN_SYSTEM_USER_ID for wallet-only alerts.`,
            );
            return;
        }

        await this.sendThreadMessage(systemUserId, params.userId, params.message, {
            notificationType: params.notificationType,
            idempotencyKey: params.idempotencyKey,
            data: {
                title: params.title,
                amount: params.amount,
                currency: params.currency,
                ...(params.data ?? {}),
            },
        });
    }

    async notifyOrderPaymentSecured(params: OrderPaymentInboxParams): Promise<void> {
        const amountLabel = this.formatAmount(params.amount, params.currency);
        const methodNote =
            params.paymentMethod === 'wallet'
                ? ' Payment was made from your wallet balance.'
                : '';

        await this.sendThreadMessage(
            params.brandId,
            params.creatorId,
            `Payment of ${amountLabel} has been secured for "${params.orderTitle}". Funds will be held until delivery is complete.${methodNote}`,
            {
                notificationType: NotificationType.PAYMENT_SECURED,
                idempotencyKey: `payment-secured-order-${params.orderId}${params.paymentMethod ? `-${params.paymentMethod}` : ''}`,
                data: {
                    orderId: params.orderId,
                    orderTitle: params.orderTitle,
                    amount: params.amount,
                    currency: params.currency,
                    paymentMethod: params.paymentMethod ?? 'card',
                },
            },
        );
    }

    async notifyOrderPaymentFailed(params: OrderPaymentInboxParams): Promise<void> {
        const amountLabel = this.formatAmount(params.amount, params.currency);

        await this.sendThreadMessage(
            params.brandId,
            params.creatorId,
            `Payment of ${amountLabel} could not be processed for "${params.orderTitle}". Please review your payment method and try again.`,
            {
                notificationType: NotificationType.PAYMENT_FAILED,
                idempotencyKey: `payment-failed-order-${params.orderId}`,
                data: {
                    orderId: params.orderId,
                    orderTitle: params.orderTitle,
                    amount: params.amount,
                    currency: params.currency,
                },
            },
        );
    }

    async notifyFundsReleased(params: OrderPaymentInboxParams): Promise<void> {
        const amountLabel = this.formatAmount(params.amount, params.currency);

        await this.sendThreadMessage(
            params.brandId,
            params.creatorId,
            `${amountLabel} from "${params.orderTitle}" has been released to the creator wallet and is now available.`,
            {
                notificationType: NotificationType.FUNDS_RELEASED,
                idempotencyKey: `funds-released-order-${params.orderId}`,
                data: {
                    orderId: params.orderId,
                    orderTitle: params.orderTitle,
                    amount: params.amount,
                    currency: params.currency,
                },
            },
        );
    }

    async notifyWalletTopUp(
        userId: number,
        amount: number,
        currency: string,
        paymentIntentId: string,
    ): Promise<void> {
        const amountLabel = this.formatAmount(amount, currency);

        await this.sendSoloPaymentMessage({
            userId,
            amount,
            currency,
            title: 'Wallet top-up successful',
            message: `${amountLabel} has been added to your GameIn wallet.`,
            notificationType: NotificationType.WALLET_TOP_UP,
            idempotencyKey: `wallet-topup-${paymentIntentId}`,
            data: { amount, currency, paymentIntentId },
        });
    }

    async notifyPayoutCompleted(
        userId: number,
        amount: number,
        currency: string,
        payoutId: string,
    ): Promise<void> {
        const amountLabel = this.formatAmount(amount, currency);

        await this.sendSoloPaymentMessage({
            userId,
            amount,
            currency,
            title: 'Payout completed',
            message: `${amountLabel} has been sent to your bank account.`,
            notificationType: NotificationType.PAYOUT_COMPLETED,
            idempotencyKey: `payout-completed-${payoutId}`,
            data: { payoutId, amount, currency },
        });
    }
}
