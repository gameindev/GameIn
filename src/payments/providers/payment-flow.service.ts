import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PaymentsService } from './payments.service';
import { PaymentIntentService } from './payment-intent.service';
import { PaymentService } from './payment.service';
import { PaymentRefundService } from './payment-refund.service';
import { PaymentStatus } from '../enums/payment-status.enum';
import { RefundStatus } from '../enums/refund-status.enum';
import { InvoicesService } from '../../invoices/providers/invoices.service';
import { OfferingsOrderService } from '../../offerings-order/providers/offerings-order.service';
import { OfferingsService } from '../../offerings/providers/offerings.service';
import { PaymentProvider } from '../../offerings/enums/payment-provider.enum';
import { InvoiceStatus } from '../../invoices/enums/invoice-status.enum';
import { OrderStatus } from '../../offerings-order/enums/order-status.enum';
import { NotificationEventsService } from '../../notifications/providers/notification-events.service';
import { NotificationType } from '../../notifications/enums/notification-type.enum';
import { NotificationChannel } from '../../notifications/enums/notification-channel.enum';

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
        private readonly offeringsService: OfferingsService,
        private readonly configService: ConfigService,
        private readonly notificationEvents: NotificationEventsService,
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

            // Get order with relations to access offering and brand
            const order = await this.offeringsOrderService.findOne(paymentIntent.order_id, ['offering', 'brand']);

            // Update order status (this will trigger order status notification)
            await this.offeringsOrderService.update(paymentIntent.order_id, {
                status: OrderStatus.PAID,
            });

            // Update offering status to SPONSORED
            if (order && order.offering_id && order.brand) {
                await this.offeringsService.sponsoreOfferings(order.offering_id, order.brand).catch((error) => {
                    console.error('Failed to update offering status to SPONSORED:', error);
                });
            }

            // Send payment received notification to creator
            await this.sendPaymentNotification(paymentIntent, payment, true).catch((error) => {
                console.error('Failed to send payment success notification:', error);
            });
        } else {
            // Send payment failed notification to brand
            await this.sendPaymentNotification(paymentIntent, payment, false).catch((error) => {
                console.error('Failed to send payment failure notification:', error);
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

    /**
     * Send payment notification (success or failure)
     */
    private async sendPaymentNotification(
        paymentIntent: any,
        payment: any,
        success: boolean,
    ) {
        // Get order with relations to access creator and brand
        const order = await this.offeringsOrderService.findOne(paymentIntent.order_id, ['creator', 'brand', 'offering']);

        if (!order) {
            console.error(`Order ${paymentIntent.order_id} not found for payment notification`);
            return;
        }

        const dashboardUrl = process.env.FRONTEND_HOST || process.env.FRONTEND_URL || 'https://gamein.gg';
        const amountStr = paymentIntent.amount != null ? String(paymentIntent.amount) : '';
        const currencyStr = paymentIntent.currency || 'USD';

        if (success) {
            // Notify creator about payment received
            await this.notificationEvents.publishNotification({
                userId: order.creator.id,
                type: NotificationType.PAYMENT_RECEIVED,
                channels: [NotificationChannel.IN_APP, NotificationChannel.EMAIL],
                title: 'Payment Received',
                message: `You received a payment of ${paymentIntent.currency} ${paymentIntent.amount} for order "${order.title}"`,
                data: {
                    orderId: order.id,
                    orderIdString: order.order_id,
                    paymentId: payment.id,
                    amount: paymentIntent.amount,
                    currency: paymentIntent.currency,
                    orderTitle: order.title,
                },
                metadata: {
                    email: order.creator.email,
                    emailTemplate: 'payment-received',
                    emailSubject: `Payment Received: ${paymentIntent.currency} ${paymentIntent.amount}`,
                    emailData: {
                        username: order.creator?.username || order.creator?.email || 'there',
                        orderTitle: order.title,
                        orderIdString: order.order_id,
                        amount: amountStr,
                        currency: currencyStr,
                        dashboardUrl,
                    },
                },
                priority: 'high',
            });
        } else {
            // Notify brand about payment failure
            await this.notificationEvents.publishNotification({
                userId: order.brand.id,
                type: NotificationType.PAYMENT_FAILED,
                channels: [NotificationChannel.IN_APP, NotificationChannel.EMAIL],
                title: 'Payment Failed',
                message: `Payment failed for order "${order.title}". Please try again.`,
                data: {
                    orderId: order.id,
                    orderIdString: order.order_id,
                    paymentId: payment?.id,
                    amount: paymentIntent.amount,
                    currency: paymentIntent.currency,
                    orderTitle: order.title,
                },
                metadata: {
                    email: order.brand.email,
                    emailTemplate: 'payment-failed',
                    emailSubject: `Payment Failed: ${order.title}`,
                    emailData: {
                        username: order.brand?.username || order.brand?.email || 'there',
                        orderTitle: order.title,
                        amount: amountStr,
                        currency: currencyStr,
                        dashboardUrl,
                    },
                },
                priority: 'high',
            });
        }
    }
}

