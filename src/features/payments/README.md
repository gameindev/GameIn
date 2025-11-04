# Payment Feature Implementation

## Overview
This feature implements payment processing for offerings using multiple payment gateways (Stripe, PayPal, Razorpay) with an adapter/strategy pattern.

## Architecture

### Backend
- **Payment Service**: Orchestrates payments using the appropriate gateway adapter
- **Payment Flow Service**: Handles complete payment flow (invoice → payment intent → gateway → verification)
- **Adapters**: 
  - `StripeAdapter` - Stripe payment processing
  - `PayPalAdapter` - PayPal payment processing
  - `RazorpayAdapter` - Razorpay payment processing
- **Entities**: PaymentIntent, Payment, PaymentRefund, Invoice

### Frontend
- **Payment Service**: API service for payment endpoints
- **Payment Hook**: React hook for payment flow (`usePayment`)
- **Checkout Modal**: UI component for checkout summary

## Payment Flow

1. **Order Creation**: When a brand user edits an offering, an order is automatically created (if not exists)
2. **Payment Initiation**: User clicks "Proceed Payment" in CheckoutModal
3. **Payment Flow Creation**: 
   - Creates invoice (if not exists)
   - Creates payment intent
   - Initiates payment with selected gateway
4. **Gateway Handling**:
   - **Stripe**: Returns client secret for Stripe Elements integration
   - **PayPal**: Redirects to PayPal checkout
   - **Razorpay**: Returns order ID for Razorpay checkout
5. **Payment Verification**: After gateway callback, payment is verified and order status updated

## Usage

```javascript
import usePayment from "../payments/hooks/usePayment";

const { initiatePayment, loading } = usePayment();

// Initiate payment
const response = await initiatePayment(orderId, PaymentProvider.STRIPE);

// Handle response based on provider
if (response.clientSecret) {
    // Stripe: Use Stripe Elements
} else if (response.redirectUrl) {
    // PayPal: Already redirected
} else if (response.razorpayOrderId) {
    // Razorpay: Open Razorpay checkout
}
```

## Next Steps (To Complete Full Implementation)

1. **Stripe Elements Integration**: Create Stripe checkout component using Stripe.js
2. **Razorpay Checkout**: Load Razorpay script and initialize checkout
3. **Payment Success/Failure Pages**: Create pages to handle payment callbacks
4. **Payment Status Updates**: Poll or use webhooks to update payment status
5. **Error Handling**: Enhanced error handling for different failure scenarios

## API Endpoints

- `POST /payments/flow/create/:orderId` - Create payment flow
- `POST /payments/flow/verify/:paymentIntentId` - Verify payment
- `GET /payments/intent/:id` - Get payment intent
- `GET /payments/intent/order/:orderId` - Get payment intents by order
- `POST /payments/webhook/:provider` - Webhook handler

## Environment Variables

- `STRIPE_SECRET_KEY` - Stripe secret key
- `STRIPE_PUBLISHABLE_KEY` - Stripe publishable key (for frontend)
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook secret
- `PAYPAL_CLIENT_ID` - PayPal client ID
- `PAYPAL_CLIENT_SECRET` - PayPal client secret
- `PAYPAL_MODE` - PayPal mode (sandbox/live)
- `RAZORPAY_KEY_ID` - Razorpay key ID
- `RAZORPAY_KEY_SECRET` - Razorpay key secret
- `RAZORPAY_WEBHOOK_SECRET` - Razorpay webhook secret
- `FRONTEND_URL` - Frontend URL for redirects

