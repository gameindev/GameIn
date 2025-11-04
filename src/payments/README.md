# Payment Service

This payment service implements the **Strategy Pattern** and **Adapter Pattern** to support multiple payment gateways (Stripe, PayPal, Razorpay) with dynamic provider selection based on database configuration.

## Architecture

### Design Patterns Used

1. **Strategy Pattern**: The `PaymentGateway` interface defines the contract, and each adapter (Stripe, PayPal, Razorpay) implements this interface. The `PaymentGatewayFactory` selects the appropriate strategy based on the provider type.

2. **Adapter Pattern**: Each payment gateway has its own API structure. The adapters (`StripeAdapter`, `PayPalAdapter`, `RazorpayAdapter`) adapt these external APIs to our unified interface.

3. **Factory Pattern**: The `PaymentGatewayFactory` creates and manages gateway instances.

## Structure

```
payments/
├── interfaces/
│   └── payment-gateway.interface.ts    # Gateway interface & contracts
├── adapters/
│   ├── stripe.adapter.ts               # Stripe implementation
│   ├── paypal.adapter.ts               # PayPal implementation
│   └── razorpay.adapter.ts             # Razorpay implementation
├── providers/
│   ├── payments.service.ts             # Main service (Strategy pattern)
│   └── payment-gateway.factory.ts       # Factory for gateway selection
├── dtos/
│   ├── create-payment.dto.ts
│   ├── verify-payment.dto.ts
│   └── refund-payment.dto.ts
└── payments.controller.ts               # REST API endpoints
```

## Usage

### Using Provider from Database

The service is designed to work with payment providers stored in the database (e.g., `OfferingPrice.payment_provider`):

```typescript
// Example: Create payment using provider from OfferingPrice
const offeringPrice = await this.offeringPriceService.getPriceByOfferingId(offeringId);
const provider = offeringPrice.payment_provider; // PaymentProvider.STRIPE, PAYPAL, or RAZORPAY

const payment = await this.paymentsService.createPaymentWithProvider(
    provider,
    parseFloat(offeringPrice.total),
    'USD',
    {
        orderId: order.id.toString(),
        customerId: user.id.toString(),
        customerEmail: user.email,
        description: `Payment for offering ${offering.title}`,
        returnUrl: `${frontendUrl}/payment/success`,
        cancelUrl: `${frontendUrl}/payment/cancel`,
    }
);
```

### Direct Usage with DTO

```typescript
// Create payment
const payment = await this.paymentsService.createPayment({
    provider: PaymentProvider.STRIPE,
    amount: 100.00,
    currency: 'USD',
    orderId: 'order_123',
    customerEmail: 'customer@example.com',
    description: 'Payment description',
});

// Verify payment
const verification = await this.paymentsService.verifyPayment({
    provider: PaymentProvider.STRIPE,
    paymentId: 'pi_1234567890',
    amount: 100.00,
});

// Refund payment
const refund = await this.paymentsService.refundPayment({
    provider: PaymentProvider.STRIPE,
    paymentId: 'pi_1234567890',
    amount: 50.00, // Partial refund
    reason: 'Customer request',
});
```

## Environment Variables

Add these to your `.env` file:

```env
# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# PayPal
PAYPAL_CLIENT_ID=...
PAYPAL_CLIENT_SECRET=...
PAYPAL_MODE=sandbox # or 'live'

# Razorpay
RAZORPAY_KEY_ID=...
RAZORPAY_KEY_SECRET=...
```

## Installation

Install required packages:

```bash
npm install stripe razorpay axios
```

## API Endpoints

- `POST /payments/create` - Create a payment
- `POST /payments/verify` - Verify a payment
- `POST /payments/refund` - Process a refund
- `GET /payments/status/:provider/:paymentId` - Get payment status
- `GET /payments/providers` - Get available providers
- `POST /payments/webhook/:provider` - Handle webhooks

## Adding New Payment Gateways

1. Create a new adapter class extending `PaymentGateway`:
```typescript
@Injectable()
export class NewGatewayAdapter extends PaymentGateway {
    readonly provider = PaymentProvider.NEW_GATEWAY;
    
    async createPayment(request: CreatePaymentRequest): Promise<PaymentResponse> {
        // Implementation
    }
    // ... other methods
}
```

2. Register it in `PaymentGatewayFactory`:
```typescript
constructor(
    // ... existing adapters
    private newGatewayAdapter: NewGatewayAdapter,
) {
    this.gateways.set(PaymentProvider.NEW_GATEWAY, this.newGatewayAdapter);
}
```

3. Add it to `PaymentsModule` providers.

## Notes

- The service automatically selects the gateway based on the `PaymentProvider` enum
- All gateways implement the same interface, making them interchangeable
- The factory pattern ensures only one instance of each gateway is created
- Database-driven provider selection allows changing payment gateways without code changes

