import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { PaymentGateway, CreatePaymentRequest, VerifyPaymentRequest, RefundPaymentRequest, PaymentResponse, PaymentVerificationResponse } from '../interfaces/payment-gateway.interface';
import { PaymentProvider } from '../../offerings/enums/payment-provider.enum';

@Injectable()
export class StripeAdapter extends PaymentGateway {
    readonly provider = PaymentProvider.STRIPE;
    private stripe: Stripe;

    constructor(private configService: ConfigService) {
        super();
        const stripeConfig = this.configService.get('stripeConfig');
        const secretKey = stripeConfig?.secretKey || this.configService.get<string>('STRIPE_SECRET_KEY');
        
        if (!secretKey) {
            throw new Error('Stripe secret key is not configured. Please set STRIPE_SECRET_KEY environment variable.');
        }

        const apiVersion = stripeConfig?.apiVersion || this.configService.get<string>('STRIPE_API_VERSION') || '2025-10-29.preview';
        
        // Using Stripe API version 2025-10-29.preview as specified
        // Reference: https://docs.stripe.com/api?api-version=2025-10-29.preview
        // Note: Payment Intents API remains in v1 namespace, but API version controls behavior
        // Using type assertion for preview API version support
        this.stripe = new Stripe(secretKey, {
            apiVersion: apiVersion as any,
            typescript: true,
        });
    }

    async createPayment(request: CreatePaymentRequest): Promise<PaymentResponse> {
        try {
            const paymentIntent = await this.stripe.paymentIntents.create({
                amount: Math.round(request.amount * 100), // Convert to cents
                currency: request.currency.toLowerCase(),
                description: request.description,
                metadata: {
                    orderId: request.orderId,
                    customerId: request.customerId,
                    ...request.metadata,
                },
                ...(request.customerEmail && {
                    receipt_email: request.customerEmail,
                }),
            });

            return {
                success: true,
                paymentId: paymentIntent.id,
                clientSecret: paymentIntent.client_secret || undefined,
                transactionId: paymentIntent.id,
                metadata: {
                    clientSecret: paymentIntent.client_secret,
                },
            };
        } catch (error: any) {
            // Handle Stripe-specific errors
            // Reference: https://docs.stripe.com/api/errors
            const errorMessage = error.type 
                ? `${error.type}: ${error.message || error.raw?.message || 'Failed to create Stripe payment'}`
                : error.message || 'Failed to create Stripe payment';
            
            return {
                success: false,
                error: errorMessage,
                metadata: {
                    errorType: error.type,
                    errorCode: error.code,
                    declineCode: error.decline_code,
                },
            };
        }
    }

    async verifyPayment(request: VerifyPaymentRequest): Promise<PaymentVerificationResponse> {
        try {
            // Retrieve payment intent with expanded charges if needed
            // Reference: https://docs.stripe.com/api/payment_intents/retrieve
            const paymentIntent = await this.stripe.paymentIntents.retrieve(request.paymentId, {
                expand: ['latest_charge'], // Use latest_charge for newer API versions
            });

            const status = this.mapStripeStatus(paymentIntent.status);
            
            // Verify amount if provided
            if (request.amount && paymentIntent.amount !== Math.round(request.amount * 100)) {
                return {
                    success: false,
                    paymentId: paymentIntent.id,
                    status: 'failed',
                    amount: paymentIntent.amount / 100,
                    currency: paymentIntent.currency,
                    metadata: {
                        error: 'Amount mismatch',
                    },
                };
            }

            // Get charge ID - use latest_charge if available, otherwise try charges list
            let chargeId: string | undefined;
            if (typeof paymentIntent.latest_charge === 'object' && paymentIntent.latest_charge !== null) {
                chargeId = (paymentIntent.latest_charge as any).id;
            } else if (typeof paymentIntent.latest_charge === 'string') {
                chargeId = paymentIntent.latest_charge;
            }

            return {
                success: status === 'succeeded',
                paymentId: paymentIntent.id,
                status,
                amount: paymentIntent.amount / 100,
                currency: paymentIntent.currency,
                metadata: {
                    status: paymentIntent.status,
                    chargeId: chargeId,
                },
            };
        } catch (error: any) {
            // Handle Stripe-specific errors
            const errorMessage = error.type 
                ? `${error.type}: ${error.message || error.raw?.message || 'Failed to verify payment'}`
                : error.message || 'Failed to verify payment';
            
            return {
                success: false,
                paymentId: request.paymentId,
                status: 'failed',
                amount: 0,
                currency: 'usd',
                metadata: {
                    error: errorMessage,
                    errorType: error.type,
                    errorCode: error.code,
                },
            };
        }
    }

    async refundPayment(request: RefundPaymentRequest): Promise<PaymentResponse> {
        try {
            // First, get the payment intent to find the charge
            // Reference: https://docs.stripe.com/api/payment_intents/retrieve
            const paymentIntent = await this.stripe.paymentIntents.retrieve(request.paymentId, {
                expand: ['latest_charge'],
            });

            // Get charge ID - use latest_charge if available
            let chargeId: string | undefined;
            if (typeof paymentIntent.latest_charge === 'object' && paymentIntent.latest_charge !== null) {
                chargeId = (paymentIntent.latest_charge as any).id;
            } else if (typeof paymentIntent.latest_charge === 'string') {
                chargeId = paymentIntent.latest_charge;
            } else {
                // Fallback: list charges for this payment intent
                const charges = await this.stripe.charges.list({
                    payment_intent: request.paymentId,
                    limit: 1,
                });
                chargeId = charges.data[0]?.id;
            }

            if (!chargeId) {
                return {
                    success: false,
                    error: 'No charge found for this payment',
                };
            }

            const refundParams: Stripe.RefundCreateParams = {
                charge: chargeId,
                ...(request.amount && {
                    amount: Math.round(request.amount * 100),
                }),
                ...(request.reason && {
                    reason: request.reason as Stripe.RefundCreateParams.Reason,
                }),
            };

            const refund = await this.stripe.refunds.create(refundParams);

            return {
                success: true,
                paymentId: request.paymentId,
                transactionId: refund.id,
                metadata: {
                    refundId: refund.id,
                    status: refund.status,
                },
            };
        } catch (error: any) {
            // Handle Stripe-specific errors
            const errorMessage = error.type 
                ? `${error.type}: ${error.message || error.raw?.message || 'Failed to process refund'}`
                : error.message || 'Failed to process refund';
            
            return {
                success: false,
                error: errorMessage,
                metadata: {
                    errorType: error.type,
                    errorCode: error.code,
                },
            };
        }
    }

    async getPaymentStatus(paymentId: string): Promise<PaymentVerificationResponse> {
        return this.verifyPayment({ paymentId });
    }

    async handleWebhook(payload: any, signature: string): Promise<PaymentVerificationResponse> {
        const stripeConfig = this.configService.get('stripeConfig');
        const webhookSecret = stripeConfig?.webhookSecret || this.configService.get<string>('STRIPE_WEBHOOK_SECRET');
        
        if (!webhookSecret) {
            throw new Error('Stripe webhook secret is not configured. Please set STRIPE_WEBHOOK_SECRET environment variable.');
        }

        let event: Stripe.Event;

        try {
            event = this.stripe.webhooks.constructEvent(payload, signature, webhookSecret);
        } catch (error: any) {
            throw new Error(`Webhook signature verification failed: ${error.message}`);
        }

        if (event.type === 'payment_intent.succeeded') {
            const paymentIntent = event.data.object as Stripe.PaymentIntent;
            return {
                success: true,
                paymentId: paymentIntent.id,
                status: 'succeeded',
                amount: paymentIntent.amount / 100,
                currency: paymentIntent.currency,
                metadata: {
                    eventType: event.type,
                },
            };
        }

        if (event.type === 'payment_intent.payment_failed') {
            const paymentIntent = event.data.object as Stripe.PaymentIntent;
            return {
                success: false,
                paymentId: paymentIntent.id,
                status: 'failed',
                amount: paymentIntent.amount / 100,
                currency: paymentIntent.currency,
                metadata: {
                    eventType: event.type,
                },
            };
        }

        throw new Error(`Unhandled event type: ${event.type}`);
    }

    private mapStripeStatus(status: string): 'succeeded' | 'failed' | 'pending' | 'refunded' {
        switch (status) {
            case 'succeeded':
                return 'succeeded';
            case 'requires_payment_method':
            case 'requires_confirmation':
            case 'requires_action':
            case 'processing':
                return 'pending';
            case 'canceled':
                return 'failed';
            default:
                return 'failed';
        }
    }
}

