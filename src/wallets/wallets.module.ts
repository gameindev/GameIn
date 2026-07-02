import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './wallet.entity';
import { WalletLedgerEntry } from './wallet-ledger-entry.entity';
import { WalletRelease } from './wallet-release.entity';
import { WalletsController } from './wallets.controller';
import { WalletsService } from './providers/wallets.service';
import { WalletLedgerService } from './providers/wallet-ledger.service';
import { StripeConnectService } from './providers/stripe-connect.service';
import { WalletReleaseService } from './providers/wallet-release.service';
import { WalletFundingService } from './providers/wallet-funding.service';
import { WalletWebhookService } from './providers/wallet-webhook.service';
import { WalletPaymentService } from './providers/wallet-payment.service';
import { WalletPayoutService } from './providers/wallet-payout.service';
import { WalletAnalyticsService } from './providers/wallet-analytics.service';
import { WalletReleaseScheduler } from './scheduler/wallet-release.scheduler';
import { PaymentsModule } from '../payments/payments.module';
import { OfferingsOrderModule } from '../offerings-order/offerings-order.module';
import { InvoicesModule } from '../invoices/invoices.module';
import { OfferingsModule } from '../offerings/offerings.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { UsersModule } from '../users/users.module';
import { PaymentIntent } from '../payments/payment-intent.entity';
import { OfferingOrder } from '../offerings-order/offering-order.entity';
import { Payment } from '../payments/payment.entity';
import { ChatModule } from '../chat/chat.module';
import { PaymentInboxNotificationService } from './providers/payment-inbox-notification.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Wallet, WalletLedgerEntry, WalletRelease, PaymentIntent, OfferingOrder, Payment]),
        forwardRef(() => PaymentsModule),
        forwardRef(() => OfferingsOrderModule),
        forwardRef(() => InvoicesModule),
        forwardRef(() => OfferingsModule),
        NotificationsModule,
        UsersModule,
        ChatModule,
    ],
    controllers: [WalletsController],
    providers: [
        WalletsService,
        WalletLedgerService,
        StripeConnectService,
        WalletReleaseService,
        WalletFundingService,
        WalletWebhookService,
        WalletPaymentService,
        WalletPayoutService,
        WalletAnalyticsService,
        WalletReleaseScheduler,
        PaymentInboxNotificationService,
    ],
    exports: [
        WalletsService,
        WalletLedgerService,
        WalletReleaseService,
        WalletWebhookService,
        WalletPaymentService,
        StripeConnectService,
        WalletAnalyticsService,
        PaymentInboxNotificationService,
    ],
})
export class WalletsModule {}
