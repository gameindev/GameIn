import { Injectable, Logger } from '@nestjs/common';
import { StripeWebhookResult } from '../interfaces/stripe-webhook-result.interface';
import { PaymentProvider } from '../../offerings/enums/payment-provider.enum';
import { StripeAdapter } from '../adapters/stripe.adapter';
import { PaymentFlowService } from './payment-flow.service';
import { PaymentIntentService } from './payment-intent.service';
import { WalletWebhookService } from '../../wallets/providers/wallet-webhook.service';

@Injectable()
export class PaymentWebhookOrchestratorService {
    private readonly logger = new Logger(PaymentWebhookOrchestratorService.name);

    constructor(
        private readonly stripeAdapter: StripeAdapter,
        private readonly paymentFlowService: PaymentFlowService,
        private readonly paymentIntentService: PaymentIntentService,
        private readonly walletWebhookService: WalletWebhookService,
    ) {}

    async handleStripeWebhook(payload: Buffer | string, signature: string) {
        const parsed = this.stripeAdapter.parseWebhook(payload, signature);

        await this.walletWebhookService.handleStripeEvent(parsed);

        if (parsed.eventType === 'payment_intent.succeeded' || parsed.eventType === 'payment_intent.payment_failed') {
            await this.handlePaymentIntentEvent(parsed);
        }

        return parsed;
    }

    private async handlePaymentIntentEvent(parsed: StripeWebhookResult) {
        const metadata = parsed.verification?.metadata ?? {};
        const paymentIntentId = metadata.paymentIntentId
            ? parseInt(String(metadata.paymentIntentId), 10)
            : null;

        if (metadata.walletTopUp === 'true') {
            return;
        }

        if (!paymentIntentId || !parsed.verification?.paymentId) {
            return;
        }

        try {
            await this.paymentFlowService.verifyAndCompletePayment(
                paymentIntentId,
                parsed.verification.paymentId,
            );
        } catch (err: any) {
            this.logger.warn(`Webhook payment completion skipped: ${err?.message}`);
        }
    }
}
