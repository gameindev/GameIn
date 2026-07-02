import { Injectable, BadRequestException } from '@nestjs/common';
import { PaymentGatewayFactory } from './payment-gateway.factory';
import { PaymentProvider } from '../../offerings/enums/payment-provider.enum';
import { CreateGatewayPaymentDto } from '../dtos/create-gateway-payment.dto';
import { VerifyPaymentDto } from '../dtos/verify-payment.dto';
import { RefundPaymentDto } from '../dtos/refund-payment.dto';
import { PaymentResponse, PaymentVerificationResponse } from '../interfaces/payment-gateway.interface';

/**
 * Payment Service using Strategy Pattern
 * This service acts as a facade and delegates payment operations to the appropriate gateway adapter
 */
@Injectable()
export class PaymentsService {
    constructor(private readonly gatewayFactory: PaymentGatewayFactory) {}

    /**
     * Create a payment using the specified provider
     * The provider can be passed directly or retrieved from database (e.g., from offering_price)
     */
    async createPayment(dto: CreateGatewayPaymentDto): Promise<PaymentResponse> {
        const gateway = this.gatewayFactory.getGateway(dto.provider);

        const request = {
            amount: dto.amount,
            currency: dto.currency,
            orderId: dto.orderId,
            customerId: dto.customerId,
            customerEmail: dto.customerEmail,
            description: dto.description,
            paymentMethodId: dto.paymentMethodId,
            metadata: dto.metadata,
            returnUrl: dto.returnUrl,
            cancelUrl: dto.cancelUrl,
        };

        const result = await gateway.createPayment(request);

        if (!result.success) {
            throw new BadRequestException(result.error || 'Failed to create payment');
        }

        return result;
    }

    /**
     * Create payment with provider from database (e.g., from OfferingPrice)
     * This allows dynamic provider selection based on stored configuration
     */
    async createPaymentWithProvider(
        provider: PaymentProvider,
        amount: number,
        currency: string,
        options?: {
            orderId?: string;
            customerId?: string;
            customerEmail?: string;
            description?: string;
            paymentMethodId?: string;
            metadata?: Record<string, any>;
            returnUrl?: string;
            cancelUrl?: string;
        }
    ): Promise<PaymentResponse> {
        const dto: CreateGatewayPaymentDto = {
            provider,
            amount,
            currency,
            ...options,
        };
        return this.createPayment(dto);
    }

    /**
     * Verify a payment
     */
    async verifyPayment(dto: VerifyPaymentDto): Promise<PaymentVerificationResponse> {
        const gateway = this.gatewayFactory.getGateway(dto.provider);

        const request = {
            paymentId: dto.paymentId,
            orderId: dto.orderId,
            amount: dto.amount,
        };

        return gateway.verifyPayment(request);
    }

    /**
     * Verify payment with provider from database
     */
    async verifyPaymentWithProvider(
        provider: PaymentProvider,
        paymentId: string,
        options?: {
            orderId?: string;
            amount?: number;
        }
    ): Promise<PaymentVerificationResponse> {
        return this.verifyPayment({
            provider,
            paymentId,
            ...options,
        });
    }

    /**
     * Process a refund
     */
    async refundPayment(dto: RefundPaymentDto): Promise<PaymentResponse> {
        const gateway = this.gatewayFactory.getGateway(dto.provider);

        const request = {
            paymentId: dto.paymentId,
            amount: dto.amount,
            reason: dto.reason,
        };

        const result = await gateway.refundPayment(request);

        if (!result.success) {
            throw new BadRequestException(result.error || 'Failed to process refund');
        }

        return result;
    }

    /**
     * Refund payment with provider from database
     */
    async refundPaymentWithProvider(
        provider: PaymentProvider,
        paymentId: string,
        options?: {
            amount?: number;
            reason?: string;
        }
    ): Promise<PaymentResponse> {
        return this.refundPayment({
            provider,
            paymentId,
            ...options,
        });
    }

    /**
     * Get payment status
     */
    async getPaymentStatus(provider: PaymentProvider, paymentId: string): Promise<PaymentVerificationResponse> {
        const gateway = this.gatewayFactory.getGateway(provider);
        return gateway.getPaymentStatus(paymentId);
    }

    /**
     * Handle webhook from payment gateway
     */
    async handleWebhook(
        provider: PaymentProvider,
        payload: any,
        signature: string
    ): Promise<PaymentVerificationResponse> {
        const gateway = this.gatewayFactory.getGateway(provider);
        return gateway.handleWebhook(payload, signature);
    }

    /**
     * Get available payment providers
     */
    getAvailableProviders(): PaymentProvider[] {
        return this.gatewayFactory.getAvailableProviders();
    }

    /**
     * Check if a provider is available
     */
    isProviderAvailable(provider: PaymentProvider): boolean {
        return this.gatewayFactory.isProviderAvailable(provider);
    }
}
