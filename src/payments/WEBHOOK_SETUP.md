# Payment Webhook Setup Guide

## Overview

**Yes, you need to create webhooks in Stripe (and other payment platforms)** to receive real-time payment status updates. Webhooks allow your backend to automatically update payment records, invoices, and order status without polling.

## Stripe Webhook Setup

### Why You Need Stripe Webhooks

- **Automatic Payment Status Updates**: Get notified when payments succeed or fail
- **Reliability**: Webhooks are more reliable than polling for payment status
- **Real-time Processing**: Update your database immediately when payment status changes
- **Payment Verification**: Automatically verify and complete payments after user completes checkout

### Currently Supported Stripe Events

Your implementation currently handles:
- `payment_intent.succeeded` - When a payment intent is successfully completed
- `payment_intent.payment_failed` - When a payment intent fails

### Step 1: Create Webhook Endpoint in Stripe Dashboard

1. **Log in to Stripe Dashboard**
   - Go to https://dashboard.stripe.com
   - Select your account (test mode for development, live mode for production)

2. **Navigate to Webhooks**
   - Click "Developers" in the left sidebar
   - Click "Webhooks"

3. **Add Endpoint**
   - Click "Add endpoint"
   - Enter your webhook URL:
     ```
     https://your-domain.com/api/payments/webhook/STRIPE
     ```
     Or for local development:
     ```
     https://your-ngrok-url.ngrok.io/api/payments/webhook/STRIPE
     ```

4. **Select Events to Listen For**
   Select these events:
   - ✅ `payment_intent.succeeded`
   - ✅ `payment_intent.payment_failed`
   - `payment_intent.canceled` (optional, for future handling)
   - `charge.refunded` (optional, for refund handling)

5. **Copy Webhook Signing Secret**
   - After creating the endpoint, click on it
   - Find "Signing secret"
   - Click "Reveal" and copy the secret (starts with `whsec_`)
   - Add it to your `.env` file:
     ```env
     STRIPE_WEBHOOK_SECRET=whsec_your_secret_here
     ```

### Step 2: Testing Webhooks Locally (Development)

#### Option A: Using Stripe CLI (Recommended)

1. **Install Stripe CLI**
   ```bash
   # Windows (using Scoop or Chocolatey)
   # Or download from: https://stripe.com/docs/stripe-cli
   
   # Mac
   brew install stripe/stripe-cli/stripe
   
   # Linux
   wget https://github.com/stripe/stripe-cli/releases/latest/download/stripe_1.x.x_linux_x86_64.tar.gz
   ```

2. **Login to Stripe**
   ```bash
   stripe login
   ```

3. **Forward Webhooks to Local Server**
   ```bash
   stripe listen --forward-to http://localhost:3000/api/payments/webhook/STRIPE
   ```
   
   This will:
   - Show a webhook signing secret (different from dashboard secret)
   - Forward all events to your local endpoint
   - Display events in real-time

4. **Trigger Test Events**
   ```bash
   # Trigger a successful payment event
   stripe trigger payment_intent.succeeded
   
   # Trigger a failed payment event
   stripe trigger payment_intent.payment_failed
   ```

#### Option B: Using ngrok (Alternative)

1. **Install ngrok**
   ```bash
   # Download from: https://ngrok.com/download
   ```

2. **Start ngrok tunnel**
   ```bash
   ngrok http 3000
   ```

3. **Use ngrok URL in Stripe Dashboard**
   - Copy the HTTPS URL (e.g., `https://abc123.ngrok.io`)
   - Add it as webhook endpoint: `https://abc123.ngrok.io/api/payments/webhook/STRIPE`

### Step 3: Webhook Endpoint URL Structure

Your webhook endpoint is:
```
POST /api/payments/webhook/STRIPE
```

The endpoint:
- Accepts raw request body (Stripe sends raw JSON)
- Verifies signature using `stripe-signature` header
- Returns 200 OK for successful processing

### Step 4: Important Notes

1. **Raw Body Required**: Stripe webhook signature verification requires the raw request body, not parsed JSON. Make sure your NestJS app is configured to handle raw bodies for webhook routes.

2. **Signature Header**: Stripe sends the signature in the `stripe-signature` header (not `x-signature`)

3. **Event Duplication**: Stripe may send the same event multiple times. Implement idempotency handling.

### Step 5: Production Setup

1. **Create Live Mode Webhook**
   - Switch to live mode in Stripe Dashboard
   - Create a new webhook endpoint with your production URL
   - Copy the live webhook signing secret
   - Update production `.env` file

2. **Use Environment-Specific Secrets**
   ```env
   # Development
   STRIPE_WEBHOOK_SECRET=whsec_test_xxx
   
   # Production
   STRIPE_WEBHOOK_SECRET=whsec_live_xxx
   ```

3. **Monitor Webhook Delivery**
   - Check Stripe Dashboard > Webhooks > Your endpoint
   - View delivery logs and retry failed deliveries
   - Set up alerts for failed deliveries

## PayPal Webhook Setup

### Supported Events
- `PAYMENT.CAPTURE.COMPLETED`
- `PAYMENT.CAPTURE.DENIED`
- `PAYMENT.CAPTURE.REFUNDED`

### Setup Steps

1. **PayPal Developer Dashboard**
   - Go to https://developer.paypal.com/dashboard
   - Navigate to your app > Webhooks

2. **Create Webhook**
   - Add webhook URL: `https://your-domain.com/api/payments/webhook/PAYPAL`
   - Select events:
     - `PAYMENT.CAPTURE.COMPLETED`
     - `PAYMENT.CAPTURE.DENIED`
     - `PAYMENT.CAPTURE.REFUNDED`

## Razorpay Webhook Setup

### Supported Events
- `payment.captured`
- `payment.failed`
- `refund.created`
- `refund.processed`

### Setup Steps

1. **Razorpay Dashboard**
   - Go to https://dashboard.razorpay.com
   - Navigate to Settings > Webhooks

2. **Create Webhook**
   - Add webhook URL: `https://your-domain.com/api/payments/webhook/RAZORPAY`
   - Select events:
     - `payment.captured`
     - `payment.failed`
     - `refund.created`
     - `refund.processed`

3. **Get Webhook Secret**
   - Copy the webhook secret from the webhook settings
   - Add to `.env`:
     ```env
     RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
     ```

## Webhook Security Best Practices

1. **Always Verify Signatures**: Never process webhooks without signature verification
2. **Use HTTPS**: Always use HTTPS endpoints for webhooks
3. **Idempotency**: Handle duplicate webhook deliveries (Stripe sends events multiple times)
4. **Rate Limiting**: Consider rate limiting on webhook endpoints (but Stripe will retry)
5. **Logging**: Log all webhook events for debugging

## Testing Checklist

- [ ] Stripe webhook endpoint created in dashboard
- [ ] Webhook signing secret added to `.env`
- [ ] Webhook endpoint accessible (test with Stripe CLI or ngrok)
- [ ] Test `payment_intent.succeeded` event
- [ ] Test `payment_intent.payment_failed` event
- [ ] Verify payment records update automatically
- [ ] Monitor webhook delivery logs in Stripe Dashboard

## Troubleshooting

### Webhook Not Receiving Events
- Check webhook URL is correct and accessible
- Verify signature header name (`stripe-signature` for Stripe)
- Check webhook endpoint is returning 200 OK
- Review Stripe Dashboard webhook delivery logs
- Ensure your server is accessible from the internet (not behind firewall)

### Signature Verification Fails
- Ensure webhook secret matches the one in Stripe Dashboard
- Check you're using the correct secret for test/live mode
- Verify the raw request body is being passed (not parsed JSON)
- For Stripe CLI, use the secret shown when running `stripe listen`

### Local Development Issues
- Use Stripe CLI for easiest local testing
- Ensure ngrok tunnel is active if using ngrok
- Check firewall/antivirus isn't blocking connections
- Verify your NestJS app can receive raw body for webhook routes

## Quick Start Summary

**To get started quickly:**

1. Install Stripe CLI: `brew install stripe/stripe-cli/stripe` (Mac) or download for Windows
2. Login: `stripe login`
3. Start forwarding: `stripe listen --forward-to http://localhost:3000/api/payments/webhook/STRIPE`
4. Copy the webhook secret shown and add to `.env` as `STRIPE_WEBHOOK_SECRET`
5. Test: `stripe trigger payment_intent.succeeded`
6. For production, create webhook in Stripe Dashboard and use production URL




