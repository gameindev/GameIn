# Payment Service Implementation

Complete payment system implementation with invoice management, payment intents, payments, and refunds integrated with offerings-order.

## Architecture Overview

### Flow
1. **Order Created** → `OfferingOrder` with status `PENDING_PAYMENT`
2. **Invoice Generated** → `Invoice` created for the order
3. **Payment Intent Created** → `PaymentIntent` with gateway provider
4. **Payment Processed** → `Payment` record after gateway verification
5. **Refund (if needed)** → `PaymentRefund` records

## Modules

### 1. Invoices Module (`src/invoices/`)
- **Entity**: `Invoice`
- **Service**: `InvoicesService`
- **Controller**: `InvoicesController`
- **Enums**: `InvoiceStatus` (DRAFT, OPEN, PAID, VOID, UNCOLLECTIBLE, REFUNDED)
- **Features**:
  - Auto-generate unique invoice numbers
  - Track invoice status
  - Calculate tax and platform fees
  - PDF generation support

### 2. Payments Module (`src/payments/`)
- **Entities**: `PaymentIntent`, `Payment`, `PaymentRefund`
- **Services**:
  - `PaymentIntentService` - Manage payment intents
  - `PaymentService` - Handle payment records
  - `PaymentRefundService` - Process refunds
  - `PaymentFlowService` - Orchestrate complete payment flow
- **Enums**: 
  - `PaymentStatus` (REQUIRES_PAYMENT_METHOD, REQUIRES_CONFIRMATION, REQUIRES_ACTION, PROCESSING, SUCCEEDED, FAILED, CANCELED)
  - `RefundStatus` (PENDING, PROCESSING, SUCCEEDED, FAILED, CANCELED)

## API Endpoints

### Invoices
- `POST /invoices` - Create invoice
- `GET /invoices/:id` - Get invoice by ID
- `GET /invoices/order/:orderId` - Get invoice by order ID
- `PATCH /invoices/:id` - Update invoice
- `PATCH /invoices/:id/paid` - Mark invoice as paid
- `DELETE /invoices/:id` - Delete invoice

### Payment Intents
- `POST /payments/intent` - Create payment intent
- `GET /payments/intent/:id` - Get payment intent by ID
- `GET /payments/intent/order/:orderId` - Get payment intents by order ID

### Payment Flow
- `POST /payments/flow/create/:orderId` - Create complete payment flow (invoice + payment intent + gateway)
- `POST /payments/flow/verify/:paymentIntentId` - Verify and complete payment after gateway callback

### Payments
- `POST /payments/create` - Create payment record
- `POST /payments/verify` - Verify payment
- `POST /payments/refund` - Process refund through gateway

### Refunds
- `POST /payments/refund/create` - Create refund record
- `POST /payments/refund/process/:paymentId` - Process refund (gateway + record)
- `GET /payments/refund/:id` - Get refund by ID
- `GET /payments/refund/payment/:paymentId` - Get refunds by payment ID

## Usage Examples

### Complete Payment Flow

```typescript
// 1. Create order (existing)
const order = await offeringsOrderService.createOfferingOrder(dto, user);

// 2. Create payment flow (invoice + payment intent + gateway)
const flow = await paymentFlowService.createPaymentFlow(
    order.id,
    PaymentProvider.STRIPE
);

// Response includes:
// - invoice: Invoice entity
// - paymentIntent: PaymentIntent entity
// - gatewayResponse: Payment gateway response with clientSecret/redirectUrl

// 3. User completes payment on frontend using gateway response

// 4. After gateway callback, verify and complete
const result = await paymentFlowService.verifyAndCompletePayment(
    flow.paymentIntent.id,
    providerPaymentId // From gateway
);

// This automatically:
// - Creates Payment record
// - Updates PaymentIntent status
// - Marks Invoice as PAID
// - Updates Order status to PAID
```

### Process Refund

```typescript
// Process refund (handles gateway + creates refund record)
const refund = await paymentFlowService.processRefund(
    paymentId,
    amount, // Optional: partial refund
    'Customer request' // Reason
);

// Automatically:
// - Processes refund through gateway
// - Creates PaymentRefund record
// - Updates Invoice to REFUNDED if full refund
// - Updates Order status to REFUNDED
```

## Database Schema

### Invoice
- `id`, `order_id`, `invoice_number` (unique)
- `status`, `currency`, `amount_due`
- `tax_amount`, `platform_fee`
- `issued_at`, `due_at`, `pdf_url`

### PaymentIntent
- `id`, `order_id`, `invoice_id`
- `provider` (STRIPE, PAYPAL, RAZORPAY, MANUAL)
- `provider_intent_id`, `client_secret`
- `amount`, `currency`, `status`
- `meta_data` (JSONB)

### Payment
- `id`, `payment_intent_id`
- `provider_payment_id` (unique)
- `amount_captured`, `currency`, `status`
- `receipt_url`, `failure_code`, `failure_message`
- `succeeded_at`, `meta_data` (JSONB)

### PaymentRefund
- `id`, `payment_id`
- `provider_refund_id` (unique)
- `amount`, `status`, `reason`
- `meta_data` (JSONB)

## Integration with Offerings-Order

The `PaymentFlowService` integrates seamlessly:
- Automatically creates invoice when payment flow starts
- Updates order status based on payment status
- Handles refunds and updates order to REFUNDED status
- Links all payment records to the order

## Error Handling

All services include:
- Validation of related entities
- Amount verification (payment <= intent, refund <= payment)
- Status validation (can't refund non-succeeded payments)
- Proper error messages with HTTP status codes

## Future Enhancements

- Webhook handlers for automatic payment status updates
- PDF invoice generation
- Payment retry logic
- Partial payment support
- Payment method storage for faster checkout
- Automated reconciliation

