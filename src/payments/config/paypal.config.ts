import { registerAs } from '@nestjs/config';

export default registerAs('paypalConfig', () => {
    return {
        clientId: process.env.PAYPAL_CLIENT_ID,
        clientSecret: process.env.PAYPAL_CLIENT_SECRET,
        mode: process.env.PAYPAL_MODE || 'sandbox', // 'sandbox' or 'live'
        baseUrl: process.env.PAYPAL_MODE === 'live' 
            ? 'https://api.paypal.com' 
            : 'https://api.sandbox.paypal.com',
    };
});

