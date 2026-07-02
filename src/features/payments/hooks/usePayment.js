import { useState, useCallback } from "react";
import paymentService from "../services/payment.service";
import { PaymentProvider } from "../../../shared/enums/paymentProviderEnum";
import { showNotificationHelper } from "../../../shared/utils/helpers/showNotification.helper";
import { NOTIFICATION_TYPES } from "../../../shared/enums/notificationTypesEnum";

import walletService from "../../settings/payment/services/wallet.service";

/**
 * Hook for handling payment flow
 */
export const usePayment = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * Initiate payment for an order
     * @param {number} orderId - Order ID
     * @param {string} provider - Payment provider (default: STRIPE)
     * @returns {Promise<Object>} Payment flow response
     */
    const initiatePayment = useCallback(async (orderId, provider = PaymentProvider.STRIPE) => {
        setLoading(true);
        setError(null);

        try {
            const response = await paymentService.createPaymentFlow(orderId, provider);
            
            // Handle different payment providers
            if (response?.gatewayResponse) {
                const gatewayResponse = response.gatewayResponse;
                
                // Stripe - redirect to checkout or use client secret
                if (provider === PaymentProvider.STRIPE && gatewayResponse.clientSecret) {
                    // Return response for Stripe Elements integration
                    return {
                        success: true,
                        paymentIntent: response.paymentIntent,
                        invoice: response.invoice,
                        clientSecret: gatewayResponse.clientSecret,
                        paymentId: gatewayResponse.paymentId,
                    };
                }
                
                // PayPal - redirect to PayPal checkout
                if (provider === PaymentProvider.PAYPAL && gatewayResponse.redirectUrl) {
                    window.location.href = gatewayResponse.redirectUrl;
                    return {
                        success: true,
                        redirecting: true,
                        redirectUrl: gatewayResponse.redirectUrl,
                    };
                }
                
                // Razorpay - return payment ID for Razorpay checkout
                if (provider === PaymentProvider.RAZORPAY && gatewayResponse.paymentId) {
                    return {
                        success: true,
                        paymentIntent: response.paymentIntent,
                        invoice: response.invoice,
                        razorpayOrderId: gatewayResponse.paymentId,
                        amount: response.paymentIntent?.amount,
                        currency: response.paymentIntent?.currency,
                    };
                }
            }
            
            return {
                success: true,
                ...response,
            };
        } catch (err) {
            const errorMessage = err?.response?.data?.message || err?.message || "Failed to initiate payment";
            setError(errorMessage);
            showNotificationHelper("Payment Error", errorMessage, NOTIFICATION_TYPES.ERROR);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Verify payment after gateway callback
     * @param {number} paymentIntentId - Payment Intent ID
     * @param {string} providerPaymentId - Payment ID from gateway
     * @returns {Promise<Object>} Verification response
     */
    const verifyPayment = useCallback(async (paymentIntentId, providerPaymentId) => {
        setLoading(true);
        setError(null);

        try {
            const response = await paymentService.verifyAndCompletePayment(paymentIntentId, providerPaymentId);
            
            if (response?.payment?.status === "succeeded" || response?.verification?.success) {
                showNotificationHelper(
                    "Payment Successful",
                    "Your payment has been processed successfully.",
                    NOTIFICATION_TYPES.SUCCESS
                );
            }
            
            return response;
        } catch (err) {
            const errorMessage = err?.response?.data?.message || err?.message || "Failed to verify payment";
            setError(errorMessage);
            showNotificationHelper("Payment Verification Failed", errorMessage, NOTIFICATION_TYPES.ERROR);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const payFromWallet = useCallback(async (orderId) => {
        setLoading(true);
        setError(null);

        try {
            const response = await walletService.payFromWallet(orderId);
            showNotificationHelper(
                "Payment Successful",
                "Order paid from your wallet balance.",
                NOTIFICATION_TYPES.SUCCESS
            );
            return { success: true, ...response };
        } catch (err) {
            const errorMessage = err?.response?.data?.message || err?.message || "Failed to pay from wallet";
            setError(errorMessage);
            showNotificationHelper("Wallet Payment Error", errorMessage, NOTIFICATION_TYPES.ERROR);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        loading,
        error,
        initiatePayment,
        verifyPayment,
        payFromWallet,
    };
};

export default usePayment;

