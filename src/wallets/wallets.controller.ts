import {
    Body,
    Controller,
    Delete,
    ForbiddenException,
    Get,
    Param,
    Post,
    Query,
    UseGuards,
    UseInterceptors,
    ClassSerializerInterceptor,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { WalletsService } from './providers/wallets.service';
import { WalletLedgerService } from './providers/wallet-ledger.service';
import { WalletFundingService } from './providers/wallet-funding.service';
import { WalletPaymentService } from './providers/wallet-payment.service';
import { WalletPayoutService } from './providers/wallet-payout.service';
import { WalletAnalyticsService } from './providers/wallet-analytics.service';
import { WalletReleaseService } from './providers/wallet-release.service';
import { ActiveUser } from '../auth/decorators/active-user.decorator';
import { ActiveUserData } from '../auth/interfaces/active-user-data.interface';
import { UserTypeGuard } from '../auth/guards/user-type.guard';
import { UserTypes } from '../auth/decorators/user-types.decorator';
import { UserType } from '../users/enums/user-type.enums';
import {
    ConnectOnboardDto,
    ConfirmTopUpWalletDto,
    LedgerQueryDto,
    TopUpWalletDto,
    WalletAnalyticsQueryDto,
    WithdrawWalletDto,
} from './dtos/wallet.dto';

@ApiTags('Wallets')
@Controller('wallets')
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(UserTypeGuard)
export class WalletsController {
    constructor(
        private readonly walletsService: WalletsService,
        private readonly ledgerService: WalletLedgerService,
        private readonly fundingService: WalletFundingService,
        private readonly paymentService: WalletPaymentService,
        private readonly payoutService: WalletPayoutService,
        private readonly analyticsService: WalletAnalyticsService,
        private readonly releaseService: WalletReleaseService,
    ) {}

    private assertWalletDevJobAllowed(endpointName: string): void {
        const env = process.env.NODE_ENV || 'development';
        if (env === 'production' && process.env.ALLOW_RUN_WALLET_RELEASE_NOW !== 'true') {
            throw new ForbiddenException(
                `${endpointName} is disabled in production unless ALLOW_RUN_WALLET_RELEASE_NOW=true`,
            );
        }
    }

    /**
     * Manual trigger for the hourly wallet release cron (`processDueReleases`).
     * Only processes SCHEDULED releases whose `release_at` is already in the past.
     */
    @Post('run-release-now')
    @ApiOperation({
        summary: 'Run wallet release job now (testing / ops)',
        description:
            'Non-production by default. In production set ALLOW_RUN_WALLET_RELEASE_NOW=true. Same rules as the scheduled job.',
    })
    @ApiResponse({ status: 200, description: '{ processed, failed } counts' })
    @ApiResponse({ status: 403, description: 'Blocked in production without opt-in env' })
    runReleaseNow() {
        this.assertWalletDevJobAllowed('run-release-now');
        return this.releaseService.processDueReleases();
    }

    /**
     * Sets `release_at` to now for all SCHEDULED releases still in the hold period.
     * Use before `run-release-now` when testing without waiting for WALLET_RELEASE_HOLD_DAYS.
     */
    @Post('make-releases-due')
    @ApiOperation({
        summary: 'Accelerate scheduled releases for testing',
        description:
            'Moves future release_at timestamps to now so run-release-now can process them immediately.',
    })
    @ApiResponse({ status: 200, description: '{ updated } count' })
    @ApiResponse({ status: 403, description: 'Blocked in production without opt-in env' })
    makeReleasesDue() {
        this.assertWalletDevJobAllowed('make-releases-due');
        return this.releaseService.makeScheduledReleasesDueNow();
    }

    /**
     * Convenience: accelerate holds then run the release job in one call.
     */
    @Post('run-wallet-jobs-now')
    @ApiOperation({
        summary: 'Accelerate and run wallet release job (testing)',
        description: 'Calls make-releases-due then run-release-now.',
    })
    @ApiResponse({
        status: 200,
        description: '{ accelerated, processed, failed } counts',
    })
    @ApiResponse({ status: 403, description: 'Blocked in production without opt-in env' })
    async runWalletJobsNow() {
        this.assertWalletDevJobAllowed('run-wallet-jobs-now');
        const { updated } = await this.releaseService.makeScheduledReleasesDueNow();
        const { processed, failed } = await this.releaseService.processDueReleases();
        return { accelerated: updated, processed, failed };
    }

    @Get('me')
    @UserTypes(UserType.BRAND, UserType.CREATOR)
    @ApiOperation({ summary: 'Get current user wallet summary' })
    async getMyWallet(@ActiveUser() user: ActiveUserData) {
        return this.walletsService.getWalletSummary(user.sub, user.user_type as UserType);
    }

    @Get('me/ledger')
    @UserTypes(UserType.BRAND, UserType.CREATOR)
    @ApiOperation({ summary: 'Get wallet transaction history' })
    async getMyLedger(@ActiveUser() user: ActiveUserData, @Query() query: LedgerQueryDto) {
        const wallet = await this.walletsService.getOrCreateForUser(user.sub, user.user_type as UserType);

        if (user.user_type === UserType.BRAND) {
            await this.paymentService.syncBrandLedgerHistory(user.sub, wallet.id).catch((error) => {
                console.error('Failed to sync brand ledger history:', error);
            });
        }

        return this.ledgerService.getLedgerPage(wallet.id, query.page ?? 1, query.limit ?? 20);
    }

    @Get('me/analytics')
    @UserTypes(UserType.BRAND, UserType.CREATOR)
    @ApiOperation({ summary: 'Wallet balances and ledger aggregates for analytics dashboards' })
    async getMyAnalytics(@ActiveUser() user: ActiveUserData, @Query() query: WalletAnalyticsQueryDto) {
        if (user.user_type === UserType.BRAND) {
            const wallet = await this.walletsService.getOrCreateForUser(user.sub, UserType.BRAND);
            await this.paymentService.syncBrandLedgerHistory(user.sub, wallet.id).catch((error) => {
                console.error('Failed to sync brand ledger history:', error);
            });
        }

        return this.analyticsService.getAnalytics(
            user.sub,
            user.user_type as UserType,
            query.days ?? 30,
        );
    }

    @Post('connect/onboard')
    @UserTypes(UserType.CREATOR)
    @ApiOperation({ summary: 'Start Stripe Connect onboarding' })
    async connectOnboard(@ActiveUser() user: ActiveUserData, @Body() dto: ConnectOnboardDto) {
        return this.payoutService.getConnectOnboardingUrl(user.sub, dto.refreshUrl, dto.returnUrl);
    }

    @Get('connect/status')
    @UserTypes(UserType.CREATOR)
    @ApiOperation({ summary: 'Get Stripe Connect status' })
    async connectStatus(@ActiveUser() user: ActiveUserData) {
        const wallet = await this.walletsService.getOrCreateForUser(user.sub, UserType.CREATOR);
        return {
            connectStatus: wallet.connect_status,
            payoutsEnabled: wallet.payouts_enabled,
            stripeConnectAccountId: wallet.stripe_connect_account_id,
        };
    }

    @Post('connect/dashboard')
    @UserTypes(UserType.CREATOR)
    @ApiOperation({ summary: 'Get Stripe Express dashboard link' })
    async connectDashboard(@ActiveUser() user: ActiveUserData) {
        return this.payoutService.getDashboardLink(user.sub);
    }

    @Post('top-up')
    @UserTypes(UserType.BRAND)
    @ApiOperation({ summary: 'Initiate wallet top-up via Stripe' })
    async topUp(@ActiveUser() user: ActiveUserData, @Body() dto: TopUpWalletDto) {
        return this.fundingService.initiateTopUp(user.sub, dto.amount, dto.paymentMethodId);
    }

    @Post('top-up/confirm')
    @UserTypes(UserType.BRAND)
    @ApiOperation({ summary: 'Confirm wallet top-up after Stripe payment succeeds' })
    async confirmTopUp(@ActiveUser() user: ActiveUserData, @Body() dto: ConfirmTopUpWalletDto) {
        const entry = await this.fundingService.confirmTopUp(user.sub, dto.paymentId, dto.walletId);
        const wallet = await this.walletsService.getOrCreateForUser(user.sub, UserType.BRAND);
        const balances = await this.ledgerService.getBalances(wallet.id);
        return { entry, balances };
    }

    @Post('pay/:orderId')
    @UserTypes(UserType.BRAND)
    @ApiOperation({ summary: 'Pay for an order from wallet balance' })
    async payFromWallet(@ActiveUser() user: ActiveUserData, @Param('orderId') orderId: number) {
        return this.paymentService.payOrderFromWallet(Number(orderId), user.sub);
    }

    @Get('payment-methods')
    @UserTypes(UserType.BRAND)
    @ApiOperation({ summary: 'List saved payment methods' })
    async getPaymentMethods(@ActiveUser() user: ActiveUserData) {
        const methods = await this.fundingService.getPaymentMethods(user.sub);
        return { items: methods };
    }

    @Post('payment-methods/setup')
    @UserTypes(UserType.BRAND)
    @ApiOperation({ summary: 'Create SetupIntent to add a payment method' })
    async setupPaymentMethod(@ActiveUser() user: ActiveUserData) {
        return this.fundingService.createSetupIntent(user.sub);
    }

    @Delete('payment-methods/:paymentMethodId')
    @UserTypes(UserType.BRAND)
    @ApiOperation({ summary: 'Remove a saved payment method' })
    async detachPaymentMethod(
        @ActiveUser() user: ActiveUserData,
        @Param('paymentMethodId') paymentMethodId: string,
    ) {
        await this.fundingService.detachPaymentMethod(user.sub, paymentMethodId);
        return { success: true };
    }

    @Post('withdraw')
    @UserTypes(UserType.CREATOR)
    @ApiOperation({ summary: 'Withdraw available balance to bank' })
    async withdraw(@ActiveUser() user: ActiveUserData, @Body() dto: WithdrawWalletDto) {
        return this.payoutService.withdraw(user.sub, dto.amount);
    }

    @Get('payouts')
    @UserTypes(UserType.CREATOR)
    @ApiOperation({ summary: 'Get payout history from Stripe' })
    async getPayouts(@ActiveUser() user: ActiveUserData) {
        return this.payoutService.getPayoutHistory(user.sub);
    }
}
