import { Injectable } from '@nestjs/common';
import { PaymentProvider } from '../../offerings/enums/payment-provider.enum';
import { PaymentGateway } from '../interfaces/payment-gateway.interface';
import { StripeAdapter } from '../adapters/stripe.adapter';
import { PayPalAdapter } from '../adapters/paypal.adapter';
import { RazorpayAdapter } from '../adapters/razorpay.adapter';

/**
 * Factory for creating payment gateway instances based on provider type
 * Implements the Factory pattern
 */
@Injectable()
export class PaymentGatewayFactory {
    private gateways: Map<PaymentProvider, PaymentGateway> = new Map();

    constructor(
        private stripeAdapter: StripeAdapter,
        private paypalAdapter: PayPalAdapter,
        private razorpayAdapter: RazorpayAdapter,
    ) {
        // Register all available gateways
        this.gateways.set(PaymentProvider.STRIPE, this.stripeAdapter);
        this.gateways.set(PaymentProvider.PAYPAL, this.paypalAdapter);
        this.gateways.set(PaymentProvider.RAZORPAY, this.razorpayAdapter);
    }

    /**
     * Get payment gateway by provider type
     * @param provider Payment provider enum
     * @returns Payment gateway instance
     * @throws Error if provider is not supported
     */
    getGateway(provider: PaymentProvider): PaymentGateway {
        const gateway = this.gateways.get(provider);

        if (!gateway) {
            throw new Error(`Payment provider ${provider} is not supported`);
        }

        return gateway;
    }

    /**
     * Get all available payment providers
     */
    getAvailableProviders(): PaymentProvider[] {
        return Array.from(this.gateways.keys());
    }

    /**
     * Check if a provider is available
     */
    isProviderAvailable(provider: PaymentProvider): boolean {
        return this.gateways.has(provider);
    }
}

