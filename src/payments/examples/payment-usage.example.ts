/**
 * Example usage of PaymentsService with database-driven provider selection
 * 
 * This example shows how to use the payment service with providers stored in the database,
 * such as in OfferingPrice.payment_provider
 */

import { Injectable } from '@nestjs/common';
import { PaymentsService } from '../providers/payments.service';
import { PaymentProvider } from '../../offerings/enums/payment-provider.enum';
import { OfferingPriceService } from '../../offerings/offering-price/providers/offering-price.service';

@Injectable()
export class PaymentUsageExample {
    constructor(
        private readonly paymentsService: PaymentsService,
        private readonly offeringPriceService: OfferingPriceService,
    ) {}

    /**
     * Example: Create payment using provider from OfferingPrice entity
     */
    async createPaymentForOffering(offeringId: number, userId: number, userEmail: string) {
        // Get offering price which contains the payment_provider
        const offeringPrice = await this.offeringPriceService.getPriceByOfferingId(offeringId);
        
        if (!offeringPrice?.payment_provider) {
            throw new Error('Payment provider not configured for this offering');
        }

        // Use the provider from database
        const payment = await this.paymentsService.createPaymentWithProvider(
            offeringPrice.payment_provider, // PaymentProvider from database
            parseFloat(offeringPrice.total || '0'),
            'USD', // or get from offeringPrice if stored
            {
                orderId: `order_${offeringId}_${Date.now()}`,
                customerId: userId.toString(),
                customerEmail: userEmail,
                description: `Payment for offering ${offeringId}`,
                returnUrl: `${process.env.FRONTEND_URL}/payment/success`,
                cancelUrl: `${process.env.FRONTEND_URL}/payment/cancel`,
                metadata: {
                    offeringId,
                    userId,
                },
            }
        );

        return payment;
    }

    /**
     * Example: Verify payment after user completes it
     */
    async verifyPaymentForOffering(
        paymentId: string,
        offeringId: number,
        expectedAmount: number
    ) {
        // Get provider from database
        const offeringPrice = await this.offeringPriceService.getPriceByOfferingId(offeringId);
        
        if (!offeringPrice?.payment_provider) {
            throw new Error('Payment provider not configured');
        }

        const verification = await this.paymentsService.verifyPaymentWithProvider(
            offeringPrice.payment_provider,
            paymentId,
            {
                amount: expectedAmount,
            }
        );

        return verification;
    }

    /**
     * Example: Process refund
     */
    async refundPaymentForOffering(
        paymentId: string,
        offeringId: number,
        refundAmount?: number,
        reason?: string
    ) {
        // Get provider from database
        const offeringPrice = await this.offeringPriceService.getPriceByOfferingId(offeringId);
        
        if (!offeringPrice?.payment_provider) {
            throw new Error('Payment provider not configured');
        }

        const refund = await this.paymentsService.refundPaymentWithProvider(
            offeringPrice.payment_provider,
            paymentId,
            {
                amount: refundAmount, // Partial refund if specified, otherwise full refund
                reason,
            }
        );

        return refund;
    }

    /**
     * Example: Change payment provider dynamically
     * This could be called from an admin panel to change the provider for an offering
     */
    async changePaymentProvider(offeringId: number, newProvider: PaymentProvider) {
        // Update the provider in database
        await this.offeringPriceService.updatePaymentProvider(offeringId, newProvider);
        
        // Verify the new provider is available
        if (!this.paymentsService.isProviderAvailable(newProvider)) {
            throw new Error(`Payment provider ${newProvider} is not available`);
        }

        return { success: true, provider: newProvider };
    }
}

