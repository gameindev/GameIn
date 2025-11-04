import { PaymentProvider } from '../../offerings/enums/payment-provider.enum';

/**
 * Payment response interface
 */
export interface PaymentResponse {
    success: boolean;
    paymentId?: string;
    transactionId?: string;
    redirectUrl?: string;
    clientSecret?: string;
    error?: string;
    metadata?: Record<string, any>;
}

/**
 * Payment verification response
 */
export interface PaymentVerificationResponse {
    success: boolean;
    paymentId: string;
    status: 'succeeded' | 'failed' | 'pending' | 'refunded';
    amount: number;
    currency: string;
    metadata?: Record<string, any>;
}

/**
 * Create payment request
 */
export interface CreatePaymentRequest {
    amount: number;
    currency: string;
    orderId?: string;
    customerId?: string;
    customerEmail?: string;
    description?: string;
    metadata?: Record<string, any>;
    returnUrl?: string;
    cancelUrl?: string;
}

/**
 * Verify payment request
 */
export interface VerifyPaymentRequest {
    paymentId: string;
    orderId?: string;
    amount?: number;
}

/**
 * Refund payment request
 */
export interface RefundPaymentRequest {
    paymentId: string;
    amount?: number; // Partial refund if specified
    reason?: string;
}

/**
 * Abstract payment gateway interface
 * This interface defines the contract that all payment gateway adapters must implement
 */
export abstract class PaymentGateway {
    abstract readonly provider: PaymentProvider;

    /**
     * Create a payment intent/session
     */
    abstract createPayment(request: CreatePaymentRequest): Promise<PaymentResponse>;

    /**
     * Verify a payment
     */
    abstract verifyPayment(request: VerifyPaymentRequest): Promise<PaymentVerificationResponse>;

    /**
     * Process a refund
     */
    abstract refundPayment(request: RefundPaymentRequest): Promise<PaymentResponse>;

    /**
     * Get payment status
     */
    abstract getPaymentStatus(paymentId: string): Promise<PaymentVerificationResponse>;

    /**
     * Webhook handler for payment events
     */
    abstract handleWebhook(payload: any, signature: string): Promise<PaymentVerificationResponse>;
}

