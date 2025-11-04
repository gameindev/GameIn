export const PAYMENT_ENDPOINTS = {
    // Create payment flow (creates invoice + payment intent + gateway payment)
    CREATE_FLOW: (orderId) => `/payments/flow/create/${orderId}`,
    
    // Verify and complete payment
    VERIFY_PAYMENT: (paymentIntentId) => `/payments/flow/verify/${paymentIntentId}`,
    
    // Get payment intent
    GET_INTENT: (id) => `/payments/intent/${id}`,
    
    // Get payment intents by order
    GET_INTENTS_BY_ORDER: (orderId) => `/payments/intent/order/${orderId}`,
    
    // Create refund
    CREATE_REFUND: () => `/payments/refund/create`,
    
    // Process refund
    PROCESS_REFUND: (paymentId) => `/payments/refund/process/${paymentId}`,
    
    // Get refund by ID
    GET_REFUND: (id) => `/payments/refund/${id}`,
    
    // Get refunds by payment ID
    GET_REFUNDS_BY_PAYMENT: (paymentId) => `/payments/refund/payment/${paymentId}`,
    
    // Get available providers
    GET_PROVIDERS: () => `/payments/providers`,
};

