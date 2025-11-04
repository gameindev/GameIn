import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PaymentGateway, CreatePaymentRequest, VerifyPaymentRequest, RefundPaymentRequest, PaymentResponse, PaymentVerificationResponse } from '../interfaces/payment-gateway.interface';
import { PaymentProvider } from '../../offerings/enums/payment-provider.enum';
import crypto from 'crypto';

// Use require for Razorpay as it's a CommonJS module
const Razorpay = require('razorpay');

@Injectable()
export class RazorpayAdapter extends PaymentGateway {
    readonly provider = PaymentProvider.RAZORPAY;
    private razorpay: InstanceType<typeof Razorpay>;
    private keySecret: string;

    constructor(private configService: ConfigService) {
        super();
        const razorpayConfig = this.configService.get('razorpayConfig');
        
        const keyId = razorpayConfig?.keyId || this.configService.get<string>('RAZORPAY_KEY_ID');
        this.keySecret = razorpayConfig?.keySecret || this.configService.get<string>('RAZORPAY_KEY_SECRET') || '';

        if (!keyId || !this.keySecret) {
            throw new Error('Razorpay credentials are not configured. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET environment variables.');
        }

        this.razorpay = new Razorpay({
            key_id: keyId,
            key_secret: this.keySecret,
        });
    }

    async createPayment(request: CreatePaymentRequest): Promise<PaymentResponse> {
        try {
            const options = {
                amount: Math.round(request.amount * 100), // Convert to paise (smallest currency unit)
                currency: request.currency.toUpperCase(),
                receipt: request.orderId || `order_${Date.now()}`,
                notes: {
                    orderId: request.orderId,
                    customerId: request.customerId,
                    description: request.description,
                    ...request.metadata,
                },
            };

            const order = await this.razorpay.orders.create(options);

            return {
                success: true,
                paymentId: order.id,
                transactionId: order.id,
                metadata: {
                    orderId: order.id,
                    amount: order.amount,
                    currency: order.currency,
                    status: order.status,
                },
            };
        } catch (error: any) {
            return {
                success: false,
                error: error.message || error.error?.description || 'Failed to create Razorpay payment',
            };
        }
    }

    async verifyPayment(request: VerifyPaymentRequest): Promise<PaymentVerificationResponse> {
        try {
            const paymentId = request.paymentId;
            
            // Get payment details from Razorpay
            const payment = await this.razorpay.payments.fetch(paymentId);

            const status = this.mapRazorpayStatus(payment.status);

            // Verify signature if amount is provided (for security)
            if (request.amount) {
                const orderAmount = Number(payment.amount) / 100; // Convert from paise
                if (orderAmount !== request.amount) {
                    return {
                        success: false,
                        paymentId: payment.id,
                        status: 'failed',
                        amount: orderAmount,
                        currency: payment.currency,
                        metadata: {
                            error: 'Amount mismatch',
                        },
                    };
                }
            }

            return {
                success: status === 'succeeded',
                paymentId: payment.id,
                status,
                amount: Number(payment.amount) / 100, // Convert from paise
                currency: payment.currency,
                metadata: {
                    orderId: payment.order_id,
                    method: payment.method,
                    status: payment.status,
                },
            };
        } catch (error: any) {
            return {
                success: false,
                paymentId: request.paymentId,
                status: 'failed',
                amount: 0,
                currency: 'INR',
                metadata: {
                    error: error.message || error.error?.description || 'Failed to verify payment',
                },
            };
        }
    }

    async refundPayment(request: RefundPaymentRequest): Promise<PaymentResponse> {
        try {
            const refundParams: any = {
                payment_id: request.paymentId,
            };

            if (request.amount) {
                refundParams.amount = Math.round(request.amount * 100); // Convert to paise
            }

            if (request.reason) {
                refundParams.notes = {
                    reason: request.reason,
                };
            }

            const refund = await this.razorpay.refunds.all(refundParams);

            return {
                success: true,
                paymentId: request.paymentId,
                transactionId: refund.items[0].id,
                metadata: {
                    refundId: refund.items[0].id,
                    status: refund.items[0].status,
                    amount: refund.items[0].amount,
                },
            };
        } catch (error: any) {
            return {
                success: false,
                error: error.message || error.error?.description || 'Failed to process refund',
            };
        }
    }

    async getPaymentStatus(paymentId: string): Promise<PaymentVerificationResponse> {
        return this.verifyPayment({ paymentId });
    }

    async handleWebhook(payload: any, signature: string): Promise<PaymentVerificationResponse> {
        // Verify webhook signature
        const expectedSignature = crypto
            .createHmac('sha256', this.keySecret)
            .update(JSON.stringify(payload))
            .digest('hex');

        if (expectedSignature !== signature) {
            throw new Error('Invalid webhook signature');
        }

        const event = payload.event;
        const payment = payload.payload?.payment?.entity;

        if (!payment) {
            throw new Error('Payment data not found in webhook payload');
        }

        if (event === 'payment.captured') {
            return {
                success: true,
                paymentId: payment.id,
                status: 'succeeded',
                amount: payment.amount / 100, // Convert from paise
                currency: payment.currency,
                metadata: {
                    eventType: event,
                    orderId: payment.order_id,
                },
            };
        }

        if (event === 'payment.failed') {
            return {
                success: false,
                paymentId: payment.id,
                status: 'failed',
                amount: payment.amount / 100,
                currency: payment.currency,
                metadata: {
                    eventType: event,
                    error: payment.error_description,
                },
            };
        }

        if (event === 'refund.created' || event === 'refund.processed') {
            return {
                success: true,
                paymentId: payment.id,
                status: 'refunded',
                amount: payment.amount / 100,
                currency: payment.currency,
                metadata: {
                    eventType: event,
                    refundId: payment.id,
                },
            };
        }

        throw new Error(`Unhandled webhook event type: ${event}`);
    }

    /**
     * Verify payment signature (used when payment is successful on frontend)
     */
    verifyPaymentSignature(paymentId: string, orderId: string, signature: string): boolean {
        const text = `${orderId}|${paymentId}`;
        const expectedSignature = crypto
            .createHmac('sha256', this.keySecret)
            .update(text)
            .digest('hex');
        return expectedSignature === signature;
    }

    private mapRazorpayStatus(status: string): 'succeeded' | 'failed' | 'pending' | 'refunded' {
        switch (status) {
            case 'captured':
                return 'succeeded';
            case 'authorized':
            case 'created':
                return 'pending';
            case 'failed':
            case 'cancelled':
                return 'failed';
            case 'refunded':
                return 'refunded';
            default:
                return 'pending';
        }
    }
}

 