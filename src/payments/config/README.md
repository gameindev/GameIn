# Payment Configuration

This directory contains configuration files for payment gateway integrations.

## Configuration Files

### `stripe.config.ts`
Stripe payment gateway configuration.

**Environment Variables:**
- `STRIPE_SECRET_KEY` - Stripe secret key (required for Stripe adapter)
- `STRIPE_PUBLISHABLE_KEY` - Stripe publishable key (optional, for frontend use)
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook signing secret (required for webhooks)
- `STRIPE_API_VERSION` - Stripe API version (default: `2025-10-29.preview`)

**Usage:**
```typescript
const stripeConfig = this.configService.get('stripeConfig');
const secretKey = stripeConfig.secretKey;
```

### `paypal.config.ts`
PayPal payment gateway configuration.

**Environment Variables:**
- `PAYPAL_CLIENT_ID` - PayPal client ID (required)
- `PAYPAL_CLIENT_SECRET` - PayPal client secret (required)
- `PAYPAL_MODE` - PayPal mode: `sandbox` or `live` (default: `sandbox`)

**Usage:**
```typescript
const paypalConfig = this.configService.get('paypalConfig');
const clientId = paypalConfig.clientId;
const baseUrl = paypalConfig.baseUrl; // Automatically set based on mode
```

### `razorpay.config.ts`
Razorpay payment gateway configuration.

**Environment Variables:**
- `RAZORPAY_KEY_ID` - Razorpay key ID (required)
- `RAZORPAY_KEY_SECRET` - Razorpay key secret (required)
- `RAZORPAY_WEBHOOK_SECRET` - Razorpay webhook secret (optional)

**Usage:**
```typescript
const razorpayConfig = this.configService.get('razorpayConfig');
const keyId = razorpayConfig.keyId;
```

### `payments.config.ts`
General payment configuration.

**Environment Variables:**
- `DEFAULT_PAYMENT_PROVIDER` - Default provider: `STRIPE`, `PAYPAL`, `RAZORPAY`, `MANUAL` (default: `STRIPE`)
- `FRONTEND_URL` - Frontend URL for redirect URLs (default: `http://localhost:3000`)
- `PAYMENT_WEBHOOK_PATH` - Webhook endpoint path (default: `/api/payments/webhook`)

**Usage:**
```typescript
const paymentsConfig = this.configService.get('paymentsConfig');
const frontendUrl = paymentsConfig.frontendUrl;
```

## Environment Variables Example

Add these to your `.env` file:

```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
STRIPE_API_VERSION=2025-10-29.preview

# PayPal Configuration
PAYPAL_CLIENT_ID=your_paypal_client_id_here
PAYPAL_CLIENT_SECRET=your_paypal_client_secret_here
PAYPAL_MODE=sandbox  # Use 'sandbox' for testing, 'live' for production

# Razorpay Configuration
RAZORPAY_KEY_ID=your_razorpay_key_id_here
RAZORPAY_KEY_SECRET=your_razorpay_key_secret_here
RAZORPAY_WEBHOOK_SECRET=your_razorpay_webhook_secret_here

# Payment General Configuration
DEFAULT_PAYMENT_PROVIDER=STRIPE  # Options: STRIPE, PAYPAL, RAZORPAY, MANUAL
FRONTEND_URL=http://localhost:3000
PAYMENT_WEBHOOK_PATH=/api/payments/webhook
```

## Configuration Priority

The adapters check configuration in the following order:
1. Config namespace (e.g., `stripeConfig`)
2. Direct environment variable (e.g., `STRIPE_SECRET_KEY`)

This allows flexibility - you can use either the config namespace or direct env variables.

## Validation

All payment-related environment variables are validated in `environment.validation.ts` using Joi schemas. They are marked as optional (except for the specific provider you're using), so the application won't fail if you're not using all providers.

## Notes

- **Stripe**: Requires secret key. Webhook secret is only needed for webhook handling.
- **PayPal**: Requires both client ID and secret. Mode determines sandbox vs production.
- **Razorpay**: Requires both key ID and secret key.
- **All configurations**: Support fallback to direct environment variables for backward compatibility.

