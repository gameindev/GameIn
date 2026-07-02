import { BadRequestException, Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PaymentsService } from '../../payments/providers/payments.service';
import { PaymentProvider } from '../../offerings/enums/payment-provider.enum';
import { WalletsService } from './wallets.service';
import { WalletLedgerService } from './wallet-ledger.service';
import { StripeConnectService } from './stripe-connect.service';
import { UsersService } from '../../users/providers/users.service';
import { UserType } from '../../users/enums/user-type.enums';
import { WalletEntryType } from '../enums/wallet-entry-type.enum';
import { WalletEntryStatus } from '../enums/wallet-entry-status.enum';
import { WalletReferenceType } from '../enums/wallet-reference-type.enum';
import { NotificationEventsService } from '../../notifications/providers/notification-events.service';
import { NotificationType } from '../../notifications/enums/notification-type.enum';
import { NotificationChannel } from '../../notifications/enums/notification-channel.enum';
import { PaymentInboxNotificationService } from './payment-inbox-notification.service';

@Injectable()
export class WalletFundingService {
    constructor(
        @Inject(forwardRef(() => PaymentsService))
        private readonly paymentsService: PaymentsService,
        private readonly walletsService: WalletsService,
        private readonly ledgerService: WalletLedgerService,
        private readonly stripeConnectService: StripeConnectService,
        private readonly usersService: UsersService,
        private readonly configService: ConfigService,
        private readonly notificationEvents: NotificationEventsService,
        private readonly paymentInboxNotifications: PaymentInboxNotificationService,
    ) {}

    async initiateTopUp(userId: number, amount: number, paymentMethodId?: string) {
        if (amount <= 0) {
            throw new BadRequestException('Amount must be positive');
        }

        const user = await this.usersService.getUserById(userId);
        if (!user || user.user_type !== UserType.BRAND) {
            throw new BadRequestException('Only brands can top up wallet');
        }

        let wallet = await this.walletsService.getOrCreateForUser(userId, UserType.BRAND);
        wallet = await this.stripeConnectService.ensureStripeCustomer(user, wallet);

        if (paymentMethodId) {
            const methods = await this.stripeConnectService.listPaymentMethods(wallet.stripe_customer_id!);
            const belongsToCustomer = methods.some((method) => method.id === paymentMethodId);
            if (!belongsToCustomer) {
                throw new BadRequestException('Payment method not found on your account');
            }
        }

        const walletConfig = this.configService.get('walletConfig');
        const currency = wallet.currency ?? walletConfig?.defaultCurrency ?? 'USD';
        const paymentsConfig = this.configService.get('paymentsConfig');
        const frontendUrl = paymentsConfig?.frontendUrl ?? 'http://localhost:3000';

        const response = await this.paymentsService.createPaymentWithProvider(
            PaymentProvider.STRIPE,
            amount,
            currency,
            {
                customerId: String(userId),
                customerEmail: user.email,
                description: `Wallet top-up for ${user.username}`,
                paymentMethodId,
                metadata: {
                    stripeCustomerId: wallet.stripe_customer_id,
                    walletTopUp: 'true',
                    walletId: String(wallet.id),
                    userId: String(userId),
                },
                returnUrl: `${frontendUrl}/#/settings/payments`,
                cancelUrl: `${frontendUrl}/#/settings/payments`,
            },
        );

        return {
            clientSecret: response.clientSecret,
            paymentId: response.paymentId,
            walletId: wallet.id,
            paymentMethodId: paymentMethodId ?? null,
        };
    }

    async completeTopUp(paymentIntentId: string, amount: number, walletId: number, userId: number) {
        const wallet = await this.walletsService.findById(walletId);
        if (wallet.user_id !== userId) {
            throw new BadRequestException('Wallet mismatch');
        }

        const existing = await this.ledgerService.findByIdempotencyKey(`topup:${paymentIntentId}`);
        if (existing) {
            return existing;
        }

        const entry = await this.ledgerService.createEntry({
            walletId: wallet.id,
            entryType: WalletEntryType.TOP_UP,
            status: WalletEntryStatus.COMPLETED,
            amount,
            currency: wallet.currency,
            idempotencyKey: `topup:${paymentIntentId}`,
            referenceType: WalletReferenceType.TOP_UP,
            stripeObjectId: paymentIntentId,
            description: 'Wallet top-up',
        });

        const user = await this.usersService.getUserById(userId);
        if (user) {
            await this.notificationEvents.publishNotification({
                userId,
                type: NotificationType.WALLET_TOP_UP,
                channels: [NotificationChannel.IN_APP],
                title: 'Wallet Top-Up Successful',
                message: `$${amount} has been added to your wallet.`,
                data: { amount, currency: wallet.currency },
                priority: 'normal',
            }).catch(() => undefined);

            await this.paymentInboxNotifications.notifyWalletTopUp(
                userId,
                amount,
                wallet.currency,
                paymentIntentId,
            ).catch(() => undefined);
        }

        return entry;
    }

    async confirmTopUp(userId: number, paymentId: string, walletId: number) {
        const wallet = await this.walletsService.findById(walletId);
        if (wallet.user_id !== userId) {
            throw new BadRequestException('Wallet mismatch');
        }

        const verification = await this.paymentsService.verifyPaymentWithProvider(
            PaymentProvider.STRIPE,
            paymentId,
        );

        if (!verification.success || verification.status !== 'succeeded') {
            throw new BadRequestException('Payment has not completed yet');
        }

        const metadata = verification.metadata ?? {};
        if (metadata.walletTopUp !== 'true') {
            throw new BadRequestException('Invalid top-up payment');
        }

        const metadataWalletId = parseInt(String(metadata.walletId), 10);
        const metadataUserId = parseInt(String(metadata.userId), 10);
        if (metadataWalletId !== walletId || metadataUserId !== userId) {
            throw new BadRequestException('Top-up payment does not match this wallet');
        }

        return this.completeTopUp(paymentId, verification.amount, walletId, userId);
    }

    async getPaymentMethods(userId: number) {
        const wallet = await this.walletsService.getOrCreateForUser(userId, UserType.BRAND);
        if (!wallet.stripe_customer_id) {
            return [];
        }
        return this.stripeConnectService.listPaymentMethods(wallet.stripe_customer_id);
    }

    async createSetupIntent(userId: number) {
        const user = await this.usersService.getUserById(userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        let wallet = await this.walletsService.getOrCreateForUser(userId, UserType.BRAND);
        wallet = await this.stripeConnectService.ensureStripeCustomer(user, wallet);

        const setupIntent = await this.stripeConnectService.createSetupIntent(wallet.stripe_customer_id!);
        return {
            clientSecret: setupIntent.client_secret,
            customerId: wallet.stripe_customer_id,
        };
    }

    async detachPaymentMethod(userId: number, paymentMethodId: string) {
        const wallet = await this.walletsService.findByUserId(userId);
        if (!wallet?.stripe_customer_id) {
            throw new BadRequestException('No payment methods configured');
        }
        return this.stripeConnectService.detachPaymentMethod(paymentMethodId);
    }
}
