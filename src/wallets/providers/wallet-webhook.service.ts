import { Injectable, Logger } from '@nestjs/common';
import Stripe from 'stripe';
import { StripeWebhookResult } from '../../payments/interfaces/stripe-webhook-result.interface';
import { StripeConnectService } from './stripe-connect.service';
import { WalletFundingService } from './wallet-funding.service';
import { WalletLedgerService } from './wallet-ledger.service';
import { WalletReleaseService } from './wallet-release.service';
import { WalletsService } from './wallets.service';
import { WalletEntryType } from '../enums/wallet-entry-type.enum';
import { WalletEntryStatus } from '../enums/wallet-entry-status.enum';
import { WalletReferenceType } from '../enums/wallet-reference-type.enum';
import { NotificationEventsService } from '../../notifications/providers/notification-events.service';
import { NotificationType } from '../../notifications/enums/notification-type.enum';
import { NotificationChannel } from '../../notifications/enums/notification-channel.enum';
import { PaymentInboxNotificationService } from './payment-inbox-notification.service';

@Injectable()
export class WalletWebhookService {
    private readonly logger = new Logger(WalletWebhookService.name);

    constructor(
        private readonly stripeConnectService: StripeConnectService,
        private readonly walletFundingService: WalletFundingService,
        private readonly ledgerService: WalletLedgerService,
        private readonly walletReleaseService: WalletReleaseService,
        private readonly walletsService: WalletsService,
        private readonly notificationEvents: NotificationEventsService,
        private readonly paymentInboxNotifications: PaymentInboxNotificationService,
    ) {}

    async handleStripeEvent(parsed: StripeWebhookResult): Promise<void> {
        switch (parsed.eventType) {
            case 'account.updated':
                await this.handleAccountUpdated(parsed.object as Stripe.Account);
                break;
            case 'transfer.created':
                this.logger.log(`Transfer created: ${(parsed.object as Stripe.Transfer).id}`);
                break;
            case 'transfer.reversed':
                await this.handleTransferReversed(parsed.object as Stripe.Transfer);
                break;
            case 'payout.paid':
                await this.handlePayoutPaid(parsed.object as Stripe.Payout);
                break;
            case 'payout.failed':
                await this.handlePayoutFailed(parsed.object as Stripe.Payout);
                break;
            case 'charge.dispute.created':
                await this.handleDisputeCreated(parsed.object as Stripe.Dispute);
                break;
            case 'payment_intent.succeeded':
                await this.handlePaymentIntentSucceeded(parsed.object as Stripe.PaymentIntent);
                break;
            default:
                break;
        }
    }

    private async handleAccountUpdated(account: Stripe.Account) {
        if (account.id) {
            await this.stripeConnectService.syncAccountFromStripe(account.id);
        }
    }

    private async handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
        if (paymentIntent.metadata?.walletTopUp !== 'true') {
            return;
        }

        const walletId = parseInt(paymentIntent.metadata.walletId, 10);
        const userId = parseInt(paymentIntent.metadata.userId, 10);
        if (!walletId || !userId) {
            return;
        }

        await this.walletFundingService.completeTopUp(
            paymentIntent.id,
            paymentIntent.amount / 100,
            walletId,
            userId,
        );
    }

    private async handleTransferReversed(transfer: Stripe.Transfer) {
        const orderId = transfer.metadata?.orderId ? parseInt(transfer.metadata.orderId, 10) : null;
        if (orderId) {
            await this.ledgerService.reverseOrderEarning(orderId);
        }
    }

    private async handlePayoutPaid(payout: Stripe.Payout) {
        const wallet = await this.findWalletByPayoutContext(payout);
        if (!wallet) {
            return;
        }

        await this.ledgerService.createEntry({
            walletId: wallet.id,
            entryType: WalletEntryType.WITHDRAW,
            status: WalletEntryStatus.COMPLETED,
            amount: payout.amount / 100,
            currency: payout.currency.toUpperCase(),
            idempotencyKey: `payout:${payout.id}`,
            referenceType: WalletReferenceType.PAYOUT,
            stripeObjectId: payout.id,
            description: 'Withdrawal to bank',
        });

        await this.notificationEvents.publishNotification({
            userId: wallet.user_id,
            type: NotificationType.PAYOUT_COMPLETED,
            channels: [NotificationChannel.IN_APP],
            title: 'Payout Completed',
            message: `$${(payout.amount / 100).toFixed(2)} has been sent to your bank.`,
            data: { payoutId: payout.id, amount: payout.amount / 100 },
            priority: 'normal',
        }).catch(() => undefined);

        await this.paymentInboxNotifications.notifyPayoutCompleted(
            wallet.user_id,
            payout.amount / 100,
            payout.currency.toUpperCase(),
            payout.id,
        ).catch(() => undefined);
    }

    private async handlePayoutFailed(payout: Stripe.Payout) {
        const wallet = await this.findWalletByPayoutContext(payout);
        if (!wallet) {
            return;
        }

        const pending = await this.ledgerService.findByIdempotencyKey(`withdraw-pending:${payout.id}`);
        if (pending) {
            await this.ledgerService.updateEntryStatus(pending.id, WalletEntryStatus.FAILED);
        }
    }

    private async handleDisputeCreated(dispute: Stripe.Dispute) {
        const charge = dispute.charge;
        if (typeof charge !== 'string') {
            return;
        }
        this.logger.warn(`Dispute created for charge ${charge}`);
    }

    private async findWalletByPayoutContext(payout: Stripe.Payout) {
        if (payout.metadata?.userId) {
            return this.walletsService.findByUserId(parseInt(payout.metadata.userId, 10));
        }
        return null;
    }
}
