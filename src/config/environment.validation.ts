import * as Joi from 'joi';


export default Joi.object({
    NODE_ENV: Joi.string()
        .valid('development', 'production', 'test', 'staging')
        .default('development'),
    PORT: Joi.number().default(5432),
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().required(),
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_NAME: Joi.string().required(),
    DATABASE_SSL: Joi.string().required(),
    JWT_SECRET: Joi.string().required(),
    JWT_TOKEN_AUDIENCE: Joi.string().required(),
    JWT_TOKEN_ISSUER: Joi.string().required(),
    JWT_ACCESS_TOKEN_TTL: Joi.number().required(),
    JWT_REFRESH_TOKEN_TTL: Joi.number().required(),
    API_VERSION: Joi.string().required(),
    UPLOAD_STRATEGY: Joi.string().valid('local', 's3', 'do').default('local'),

    // Stripe Configuration
    STRIPE_SECRET_KEY: Joi.string().optional(),
    STRIPE_PUBLISHABLE_KEY: Joi.string().optional(),
    STRIPE_WEBHOOK_SECRET: Joi.string().optional(),
    STRIPE_API_VERSION: Joi.string().optional().default('2025-10-29.preview'),

    // PayPal Configuration
    PAYPAL_CLIENT_ID: Joi.string().optional(),
    PAYPAL_CLIENT_SECRET: Joi.string().optional(),
    PAYPAL_MODE: Joi.string().valid('sandbox', 'live').optional().default('sandbox'),

    // Razorpay Configuration
    RAZORPAY_KEY_ID: Joi.string().optional(),
    RAZORPAY_KEY_SECRET: Joi.string().optional(),
    RAZORPAY_WEBHOOK_SECRET: Joi.string().optional(),

    // Payment General Configuration
    DEFAULT_PAYMENT_PROVIDER: Joi.string().valid('STRIPE', 'PAYPAL', 'RAZORPAY', 'MANUAL').optional().default('STRIPE'),
    FRONTEND_URL: Joi.string().uri().optional().default('http://localhost:3000'),
    PAYMENT_WEBHOOK_PATH: Joi.string().optional().default('/api/payments/webhook'),

    // Wallet Configuration
    STRIPE_CONNECT_CLIENT_ID: Joi.string().optional(),
    WALLET_RELEASE_HOLD_DAYS: Joi.number().optional().default(7),
    WALLET_MIN_WITHDRAWAL: Joi.number().optional().default(25),
    WALLET_INSTANT_PAYOUT_ENABLED: Joi.string().optional().default('true'),
    WALLET_DEFAULT_CURRENCY: Joi.string().optional().default('USD'),
})