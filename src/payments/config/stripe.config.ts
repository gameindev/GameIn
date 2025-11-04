import { registerAs } from '@nestjs/config';

export default registerAs('stripeConfig', () => {
    return {
        secretKey: process.env.STRIPE_SECRET_KEY,
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
        webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
        apiVersion: process.env.STRIPE_API_VERSION || '2025-10-29.preview',
    };
});

