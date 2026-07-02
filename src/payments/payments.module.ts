import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './providers/payments.service';
import { PaymentGatewayFactory } from './providers/payment-gateway.factory';
import { PaymentIntentService } from './providers/payment-intent.service';
import { PaymentService } from './providers/payment.service';
import { PaymentRefundService } from './providers/payment-refund.service';
import { PaymentFlowService } from './providers/payment-flow.service';
import { PaymentWebhookOrchestratorService } from './providers/payment-webhook-orchestrator.service';
import { StripeAdapter } from './adapters/stripe.adapter';
import { PayPalAdapter } from './adapters/paypal.adapter';
import { RazorpayAdapter } from './adapters/razorpay.adapter';
import { PaymentIntent } from './payment-intent.entity';
import { Payment } from './payment.entity';
import { PaymentRefund } from './payment-refund.entity';
import { OfferingsOrderModule } from '../offerings-order/offerings-order.module';
import { InvoicesModule } from '../invoices/invoices.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { OfferingsModule } from '../offerings/offerings.module';
import { WalletsModule } from '../wallets/wallets.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([PaymentIntent, Payment, PaymentRefund]),
        forwardRef(() => InvoicesModule),
        forwardRef(() => OfferingsOrderModule),
        forwardRef(() => OfferingsModule),
        forwardRef(() => WalletsModule),
        NotificationsModule,
    ],
    providers: [
        PaymentsService,
        PaymentGatewayFactory,
        PaymentIntentService,
        PaymentService,
        PaymentRefundService,
        PaymentFlowService,
        PaymentWebhookOrchestratorService,
        StripeAdapter,
        PayPalAdapter,
        RazorpayAdapter,
    ],
    exports: [
        PaymentsService,
        PaymentIntentService,
        PaymentService,
        PaymentRefundService,
        PaymentFlowService,
        StripeAdapter,
    ],
    controllers: [PaymentsController],
})
export class PaymentsModule {}
