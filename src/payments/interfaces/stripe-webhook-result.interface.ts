import Stripe from 'stripe';

export interface StripeWebhookResult {
    eventType: string;
    eventId: string;
    object: Stripe.Event.Data.Object;
    /** Legacy payment verification shape for payment_intent events */
    verification?: {
        success: boolean;
        paymentId: string;
        status: 'succeeded' | 'failed' | 'pending' | 'refunded';
        amount: number;
        currency: string;
        metadata?: Record<string, any>;
    };
}
