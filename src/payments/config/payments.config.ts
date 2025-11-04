import { registerAs } from '@nestjs/config';

export default registerAs('paymentsConfig', () => {
    return {
        defaultProvider: process.env.DEFAULT_PAYMENT_PROVIDER || 'STRIPE',
        frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
        webhookPath: process.env.PAYMENT_WEBHOOK_PATH || '/api/payments/webhook',
    };
});

