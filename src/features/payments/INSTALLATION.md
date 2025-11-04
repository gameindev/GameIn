# Payment Integration Installation

## Required Packages

To use Stripe checkout, install the following packages:

```bash
npm install @stripe/stripe-js @stripe/react-stripe-js
```

## Environment Variables

Add the following environment variables to your `.env` file:

```env
# Stripe
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Razorpay
VITE_RAZORPAY_KEY_ID=rzp_test_...
```

## Backend Environment Variables

Make sure your backend has the following environment variables configured:

```env
# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_API_VERSION=2025-10-29.preview

# PayPal
PAYPAL_CLIENT_ID=...
PAYPAL_CLIENT_SECRET=...
PAYPAL_MODE=sandbox

# Razorpay
RAZORPAY_KEY_ID=rzp_test_...
RAZORPAY_KEY_SECRET=...
RAZORPAY_WEBHOOK_SECRET=...

# General
FRONTEND_URL=http://localhost:5173
DEFAULT_PAYMENT_PROVIDER=STRIPE
```

