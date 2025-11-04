import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PaymentsService } from './payments.service';
import { PaymentIntentService } from './payment-intent.service';
import { PaymentService } from './payment.service';
import { PaymentRefundService } from './payment-refund.service';
import { InvoicesService } from '@/invoices/providers/invoices.service';
import { OfferingsOrderService } from '@/offerings-order/providers/offerings-order.service';
import { PaymentProvider } from '@/offerings/enums/payment-provider.enum';
import { PaymentStatus } from '../enums/payment-status.enum';
import { InvoiceStatus } from '@/invoices/enums/invoice-status.enum';
import { OrderStatus } from '@/offerings-order/enums/order-status.enum';
import { RefundStatus } from '../enums/refund-status.enum';

/**
 * Service that orchestrates the complete payment flow from order to payment completion
 */
@Injectable()
export class PaymentFlowService {
    constructor(
        private readonly paymentsService: PaymentsService,
        private readonly paymentIntentService: PaymentIntentService,
        private readonly paymentService: PaymentService,
        private readonly refundService: PaymentRefundService,
        private readonly invoicesService: InvoicesService,
        private readonly offeringsOrderService: OfferingsOrderService,
        private readonly configService: ConfigService,
    ) {}

    /**
     * Complete flow: Create invoice and payment intent for an order
     */
    async createPaymentFlow(orderId: number, provider: PaymentProvider) {
        // Get order
        const order = await this.offeringsOrderService.findOne(orderId);

        if (!order) {
            throw new NotFoundException(`Order with ID ${orderId} not found`);
        }

        // Check if invoice already exists
        let invoice = await this.invoicesService.findByOrderId(orderId);
        
        if (!invoice) {
            // Create invoice
            invoice = await this.invoicesService.create({
                order_id: orderId,
                currency: order.currency,
                amount_due: Number(order.total),
                tax_amount: Number(order.tax),
                platform_fee: Number(order.fee),
                status: InvoiceStatus.OPEN,
            });
        }

        // Create payment intent
        const paymentIntent = await this.paymentIntentService.create({
            order_id: orderId,
            invoice_id: invoice.id,
            provider,
            amount: Number(order.total),
            currency: order.currency,
        });

        // Get frontend URL from config
        const paymentsConfig = this.configService.get('paymentsConfig');
        const frontendUrl = paymentsConfig?.frontendUrl || this.configService.get<string>('FRONTEND_URL') || 'http://localhost:3000';

        // Create payment with gateway
        const gatewayResponse = await this.paymentsService.createPaymentWithProvider(
            provider,
            Number(order.total),
            order.currency,
            {
                orderId: order.order_id,
                description: `Payment for order ${order.order_id}`,
                returnUrl: `${frontendUrl}/payment/success`,
                cancelUrl: `${frontendUrl}/payment/cancel`,
                metadata: {
                    orderId: order.id,
                    invoiceId: invoice.id,
                    paymentIntentId: paymentIntent.id,
                },
            }
        );

        // Update payment intent with provider data
        await this.paymentIntentService.update(paymentIntent.id, {
            provider_intent_id: gatewayResponse.paymentId,
            client_secret: gatewayResponse.clientSecret,
            status: PaymentStatus.REQUIRES_CONFIRMATION,
            meta_data: gatewayResponse.metadata,
        });

        return {
            paymentIntent,
            invoice,
            gatewayResponse,
        };
    }

    /**
     * Verify and complete payment after gateway callback
     */
    async verifyAndCompletePayment(paymentIntentId: number, providerPaymentId: string) {
        const paymentIntent = await this.paymentIntentService.findOne(paymentIntentId, ['order', 'invoice']);

        if (!paymentIntent.provider_intent_id) {
            throw new BadRequestException('Payment intent does not have a provider intent ID');
        }

        // Verify payment with gateway
        const verification = await this.paymentsService.verifyPaymentWithProvider(
            paymentIntent.provider,
            providerPaymentId,
            {
                orderId: paymentIntent.provider_intent_id,
                amount: Number(paymentIntent.amount),
            }
        );

        // Check if payment record already exists
        let payment = await this.paymentService.findByProviderPaymentId(providerPaymentId);

        if (!payment) {
            // Create payment record
            payment = await this.paymentService.create({
                payment_intent_id: paymentIntent.id,
                provider_payment_id: providerPaymentId,
                amount_captured: verification.amount,
                currency: verification.currency,
                status: verification.success ? PaymentStatus.SUCCEEDED : PaymentStatus.FAILED,
                succeeded_at: verification.success ? new Date().toISOString() : undefined,
                meta_data: verification.metadata,
            });
        } else {
            // Update existing payment
            if (verification.success) {
                payment = await this.paymentService.markAsSucceeded(
                    payment.id,
                    verification.metadata?.receiptUrl
                );
            } else {
                payment = await this.paymentService.markAsFailed(
                    payment.id,
                    verification.metadata?.errorCode,
                    verification.metadata?.error
                );
            }
        }

        // Update invoice status if payment succeeded
        if (verification.success && verification.status === 'succeeded') {
            await this.invoicesService.markAsPaid(paymentIntent.invoice_id);

            // Update order status
            await this.offeringsOrderService.update(paymentIntent.order_id, {
                status: OrderStatus.PAID,
            });
            
        }

        return {
            payment,
            paymentIntent,
            verification,
        };
    }

    /**
     * Process refund for a payment
     */
    async processRefund(paymentId: number, amount?: number, reason?: string) {
        const payment = await this.paymentService.findOne(paymentId, ['payment_intent']);

        if (payment.status !== PaymentStatus.SUCCEEDED) {
            throw new BadRequestException('Only succeeded payments can be refunded');
        }

        const paymentIntent = payment.payment_intent;

        // Process refund with gateway
        const refundResponse = await this.paymentsService.refundPaymentWithProvider(
            paymentIntent.provider,
            payment.provider_payment_id || '',
            {
                amount,
                reason,
            }
        );

        // Create refund record
        const refund = await this.refundService.create({
            payment_id: payment.id,
            provider_refund_id: refundResponse.transactionId,
            amount: amount || Number(payment.amount_captured),
            reason,
            status: RefundStatus.SUCCEEDED,
            meta_data: refundResponse.metadata,
        });

        // Update invoice if full refund
        const totalRefunded = await this.calculateTotalRefunded(payment.id);
        if (totalRefunded >= Number(payment.amount_captured)) {
            await this.invoicesService.markAsRefunded(paymentIntent.invoice_id);

            // Update order status
            await this.offeringsOrderService.update(paymentIntent.order_id, {
                status: OrderStatus.REFUNDED,
            });
        }

        return refund;
    }

    /**
     * Calculate total refunded amount for a payment
     */
    private async calculateTotalRefunded(paymentId: number): Promise<number> {
        const refunds = await this.refundService.findByPaymentId(paymentId);
        return refunds
            .filter(refund => refund.status === RefundStatus.SUCCEEDED)
            .reduce((sum, refund) => sum + Number(refund.amount), 0);
    }
}

