import api from "../../../app/services/api";
import { PAYMENT_ENDPOINTS } from "../api/payment_endpoints";
import { PaymentProvider } from "../../../shared/enums/paymentProviderEnum";

/**
 * Payment API service
 */
const paymentService = {
    /**
     * Create payment flow for an order
     * This creates invoice, payment intent, and initiates payment with gateway
     * @param {number} orderId - Order ID
     * @param {string} provider - Payment provider (STRIPE, PAYPAL, RAZORPAY)
     * @returns {Promise<Object>} Payment flow response with payment intent, invoice, and gateway response
     */
    createPaymentFlow: async (orderId, provider = PaymentProvider.STRIPE) => {
        try {
            const response = await api.post(PAYMENT_ENDPOINTS.CREATE_FLOW(orderId), {
                provider,
            });
            return response?.data?.data || response?.data;
        } catch (error) {
            console.error("Error creating payment flow:", error);
            throw error;
        }
    },

    /**
     * Verify and complete payment after gateway callback
     * @param {number} paymentIntentId - Payment Intent ID
     * @param {string} providerPaymentId - Payment ID from gateway (e.g., Stripe payment intent ID)
     * @returns {Promise<Object>} Payment verification response
     */
    verifyAndCompletePayment: async (paymentIntentId, providerPaymentId) => {
        try {
            const response = await api.post(PAYMENT_ENDPOINTS.VERIFY_PAYMENT(paymentIntentId), {
                providerPaymentId,
            });
            return response?.data?.data || response?.data;
        } catch (error) {
            console.error("Error verifying payment:", error);
            throw error;
        }
    },

    /**
     * Get payment intent by ID
     * @param {number} id - Payment Intent ID
     * @returns {Promise<Object>} Payment intent details
     */
    getPaymentIntent: async (id) => {
        try {
            const response = await api.get(PAYMENT_ENDPOINTS.GET_INTENT(id));
            return response?.data?.data || response?.data;
        } catch (error) {
            console.error("Error fetching payment intent:", error);
            throw error;
        }
    },

    /**
     * Get payment intents by order ID
     * @param {number} orderId - Order ID
     * @returns {Promise<Array>} Array of payment intents
     */
    getPaymentIntentsByOrder: async (orderId) => {
        try {
            const response = await api.get(PAYMENT_ENDPOINTS.GET_INTENTS_BY_ORDER(orderId));
            return response?.data?.data || response?.data || [];
        } catch (error) {
            console.error("Error fetching payment intents:", error);
            throw error;
        }
    },

    /**
     * Get available payment providers
     * @returns {Promise<Array>} Array of available payment providers
     */
    getAvailableProviders: async () => {
        try {
            const response = await api.get(PAYMENT_ENDPOINTS.GET_PROVIDERS());
            return response?.data?.providers || [];
        } catch (error) {
            console.error("Error fetching providers:", error);
            throw error;
        }
    },
};

export default paymentService;

