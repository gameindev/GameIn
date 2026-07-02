import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { StripeAdapter } from '../../payments/adapters/stripe.adapter';
import { Wallet } from '../wallet.entity';
import { ConnectOnboardingStatus } from '../enums/connect-onboarding-status.enum';
import { WalletsService } from './wallets.service';
import { User } from '../../users/user.entity';

@Injectable()
export class StripeConnectService {
    private stripe: Stripe;

    constructor(
        private readonly stripeAdapter: StripeAdapter,
        private readonly configService: ConfigService,
        private readonly walletsService: WalletsService,
    ) {
        this.stripe = this.stripeAdapter.getStripeClient();
    }

    async ensureExpressAccount(user: User, wallet: Wallet): Promise<Wallet> {
        if (wallet.stripe_connect_account_id) {
            return wallet;
        }

        const account = await this.stripe.accounts.create({
            type: 'express',
            email: user.email,
            capabilities: {
                transfers: { requested: true },
            },
            metadata: {
                userId: String(user.id),
                username: user.username,
            },
        });

        return this.walletsService.updateWallet(wallet.id, {
            stripe_connect_account_id: account.id,
            connect_status: ConnectOnboardingStatus.PENDING,
        });
    }

    async ensureStripeCustomer(user: User, wallet: Wallet): Promise<Wallet> {
        if (wallet.stripe_customer_id) {
            return wallet;
        }

        const customer = await this.stripe.customers.create({
            email: user.email,
            name: user.username,
            metadata: { userId: String(user.id) },
        });

        return this.walletsService.updateWallet(wallet.id, {
            stripe_customer_id: customer.id,
        });
    }

    async createAccountLink(wallet: Wallet, refreshUrl: string, returnUrl: string) {
        if (!wallet.stripe_connect_account_id) {
            throw new Error('Connect account not created');
        }

        const link = await this.stripe.accountLinks.create({
            account: wallet.stripe_connect_account_id,
            refresh_url: refreshUrl,
            return_url: returnUrl,
            type: 'account_onboarding',
        });

        return link.url;
    }

    async createDashboardLink(wallet: Wallet) {
        if (!wallet.stripe_connect_account_id) {
            throw new Error('Connect account not created');
        }

        const link = await this.stripe.accounts.createLoginLink(wallet.stripe_connect_account_id);
        return link.url;
    }

    async syncAccountFromStripe(accountId: string) {
        const wallet = await this.walletsService.findByConnectAccountId(accountId);
        if (!wallet) {
            return null;
        }

        const account = await this.stripe.accounts.retrieve(accountId);
        const payoutsEnabled = account.payouts_enabled ?? false;
        const detailsSubmitted = account.details_submitted ?? false;

        let connectStatus = ConnectOnboardingStatus.PENDING;
        if (payoutsEnabled && detailsSubmitted) {
            connectStatus = ConnectOnboardingStatus.ACTIVE;
        } else if (account.requirements?.disabled_reason) {
            connectStatus = ConnectOnboardingStatus.RESTRICTED;
        }

        return this.walletsService.updateWallet(wallet.id, {
            connect_status: connectStatus,
            payouts_enabled: payoutsEnabled,
        });
    }

    async transferToCreator(params: {
        destinationAccountId: string;
        amount: number;
        currency: string;
        orderId: number;
        transferGroup?: string;
    }) {
        const transfer = await this.stripe.transfers.create({
            amount: Math.round(params.amount * 100),
            currency: params.currency.toLowerCase(),
            destination: params.destinationAccountId,
            transfer_group: params.transferGroup ?? `order_${params.orderId}`,
            metadata: {
                orderId: String(params.orderId),
            },
        });

        return transfer;
    }

    async createPayout(params: {
        connectAccountId: string;
        amount: number;
        currency: string;
        instant?: boolean;
    }) {
        const payoutParams: Stripe.PayoutCreateParams = {
            amount: Math.round(params.amount * 100),
            currency: params.currency.toLowerCase(),
        };

        const walletConfig = this.configService.get('walletConfig');
        if (params.instant && walletConfig?.instantPayoutEnabled) {
            payoutParams.method = 'instant';
        }

        return this.stripe.payouts.create(payoutParams, {
            stripeAccount: params.connectAccountId,
        });
    }

    async getConnectBalance(connectAccountId: string) {
        const balance = await this.stripe.balance.retrieve({
            stripeAccount: connectAccountId,
        });

        const available = balance.available.reduce((sum, b) => sum + b.amount, 0) / 100;
        const pending = balance.pending.reduce((sum, b) => sum + b.amount, 0) / 100;

        return { available, pending, raw: balance };
    }

    async listPaymentMethods(customerId: string) {
        const methods = await this.stripe.paymentMethods.list({
            customer: customerId,
            type: 'card',
        });
        return methods.data;
    }

    async createSetupIntent(customerId: string) {
        return this.stripe.setupIntents.create({
            customer: customerId,
            payment_method_types: ['card'],
        });
    }

    async detachPaymentMethod(paymentMethodId: string) {
        return this.stripe.paymentMethods.detach(paymentMethodId);
    }

    async listPayouts(connectAccountId: string, limit = 20) {
        return this.stripe.payouts.list({ limit }, { stripeAccount: connectAccountId });
    }
}
