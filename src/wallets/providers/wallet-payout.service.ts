import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
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

@Injectable()
export class WalletPayoutService {
    constructor(
        private readonly walletsService: WalletsService,
        private readonly ledgerService: WalletLedgerService,
        private readonly stripeConnectService: StripeConnectService,
        private readonly usersService: UsersService,
        private readonly configService: ConfigService,
        private readonly notificationEvents: NotificationEventsService,
    ) {}

    async withdraw(userId: number, amount?: number) {
        const user = await this.usersService.getUserById(userId);
        if (!user || user.user_type !== UserType.CREATOR) {
            throw new ForbiddenException('Only creators can withdraw');
        }

        const wallet = await this.walletsService.getOrCreateForUser(userId, UserType.CREATOR);
        if (!wallet.stripe_connect_account_id || !wallet.payouts_enabled) {
            throw new BadRequestException('Complete Stripe Connect onboarding before withdrawing');
        }

        const walletConfig = this.configService.get('walletConfig');
        const minWithdrawal = walletConfig?.minWithdrawal ?? 25;
        const balances = await this.ledgerService.getBalances(wallet.id);
        const withdrawAmount = amount ?? balances.available;

        if (withdrawAmount < minWithdrawal) {
            throw new BadRequestException(`Minimum withdrawal is $${minWithdrawal}`);
        }

        if (withdrawAmount > balances.available) {
            throw new BadRequestException('Insufficient available balance');
        }

        const stripeBalance = await this.stripeConnectService.getConnectBalance(
            wallet.stripe_connect_account_id,
        );

        if (stripeBalance.available < withdrawAmount) {
            throw new BadRequestException(
                'Funds are still processing in Stripe. Please try again shortly.',
            );
        }

        const payout = await this.stripeConnectService.createPayout({
            connectAccountId: wallet.stripe_connect_account_id,
            amount: withdrawAmount,
            currency: wallet.currency,
            instant: walletConfig?.instantPayoutEnabled,
        });

        await this.ledgerService.createEntry({
            walletId: wallet.id,
            entryType: WalletEntryType.WITHDRAW,
            status: WalletEntryStatus.PENDING,
            amount: withdrawAmount,
            currency: wallet.currency,
            idempotencyKey: `withdraw-pending:${payout.id}`,
            referenceType: WalletReferenceType.PAYOUT,
            stripeObjectId: payout.id,
            description: 'Withdrawal to bank',
            metaData: { userId: String(userId) },
        });

        return {
            payoutId: payout.id,
            amount: withdrawAmount,
            currency: wallet.currency,
            status: payout.status,
        };
    }

    async getPayoutHistory(userId: number) {
        const wallet = await this.walletsService.findByUserId(userId);
        if (!wallet?.stripe_connect_account_id) {
            return { items: [] };
        }

        const payouts = await this.stripeConnectService.listPayouts(wallet.stripe_connect_account_id);
        return { items: payouts.data };
    }

    async getConnectOnboardingUrl(userId: number, refreshUrl: string, returnUrl: string) {
        const user = await this.usersService.getUserById(userId);
        if (!user || user.user_type !== UserType.CREATOR) {
            throw new ForbiddenException('Only creators can onboard Stripe Connect');
        }

        let wallet = await this.walletsService.getOrCreateForUser(userId, UserType.CREATOR);
        wallet = await this.stripeConnectService.ensureExpressAccount(user, wallet);

        const url = await this.stripeConnectService.createAccountLink(wallet, refreshUrl, returnUrl);

        if (wallet.connect_status === 'NOT_STARTED' as any) {
            await this.notificationEvents.publishNotification({
                userId,
                type: NotificationType.CONNECT_SETUP_REQUIRED,
                channels: [NotificationChannel.IN_APP],
                title: 'Complete Payout Setup',
                message: 'Connect your bank account to receive sponsorship earnings.',
                priority: 'high',
            }).catch(() => undefined);
        }

        return { url, connectStatus: wallet.connect_status };
    }

    async getDashboardLink(userId: number) {
        const wallet = await this.walletsService.getOrCreateForUser(userId, UserType.CREATOR);
        if (!wallet.stripe_connect_account_id) {
            throw new BadRequestException('Stripe Connect not configured');
        }
        const url = await this.stripeConnectService.createDashboardLink(wallet);
        return { url };
    }
}
