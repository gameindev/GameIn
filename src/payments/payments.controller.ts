import { Body, Controller, Get, Param, Post, Patch, UseInterceptors, ClassSerializerInterceptor, Headers, Req, RawBodyRequest, BadRequestException } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaymentsService } from './providers/payments.service';
import { PaymentIntentService } from './providers/payment-intent.service';
import { PaymentService } from './providers/payment.service';
import { PaymentRefundService } from './providers/payment-refund.service';
import { PaymentFlowService } from './providers/payment-flow.service';
import { PaymentWebhookOrchestratorService } from './providers/payment-webhook-orchestrator.service';
import { CreatePaymentDto } from './dtos/create-payment.dto';
import { CreateGatewayPaymentDto } from './dtos/create-gateway-payment.dto';
import { VerifyPaymentDto } from './dtos/verify-payment.dto';
import { RefundPaymentDto } from './dtos/refund-payment.dto';
import { CreatePaymentIntentDto } from './dtos/create-payment-intent.dto';
import { CreateRefundDto } from './dtos/create-refund.dto';
import { PaymentProvider } from '../offerings/enums/payment-provider.enum';
import { Auth } from '../auth/decorators/auth.decorator';
import { AuthType } from '../auth/enums/auth-type.enum';

@ApiTags('Payments')
@Controller('payments')
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
export class PaymentsController {
    constructor(
        private readonly paymentsService: PaymentsService,
        private readonly paymentIntentService: PaymentIntentService,
        private readonly paymentService: PaymentService,
        private readonly refundService: PaymentRefundService,
        private readonly paymentFlowService: PaymentFlowService,
        private readonly paymentWebhookOrchestrator: PaymentWebhookOrchestratorService,
    ) {}

    @Post('create')
    @ApiOperation({ summary: 'Create a payment', description: 'Create a payment using the specified payment gateway' })
    @ApiBody({ type: CreateGatewayPaymentDto })
    @ApiResponse({ status: 201, description: 'Payment created successfully' })
    async createPayment(@Body() dto: CreateGatewayPaymentDto) {
        return this.paymentsService.createPayment(dto);
    }



    @Post('verify')
    @ApiOperation({ summary: 'Verify a payment', description: 'Verify the status of a payment' })
    @ApiBody({ type: VerifyPaymentDto })
    @ApiResponse({ status: 200, description: 'Payment verified successfully' })
    async verifyPayment(@Body() dto: VerifyPaymentDto) {
        return this.paymentsService.verifyPayment(dto);
    }



    @Post('refund')
    @ApiOperation({ summary: 'Process a refund', description: 'Process a full or partial refund for a payment' })
    @ApiBody({ type: RefundPaymentDto })
    @ApiResponse({ status: 200, description: 'Refund processed successfully' })
    async refundPayment(@Body() dto: RefundPaymentDto) {
        return this.paymentsService.refundPayment(dto);
    }



    @Get('status/:provider/:paymentId')
    @ApiOperation({ summary: 'Get payment status', description: 'Get the current status of a payment' })
    @ApiParam({ name: 'provider', enum: PaymentProvider, description: 'Payment provider' })
    @ApiParam({ name: 'paymentId', description: 'Payment ID' })
    @ApiResponse({ status: 200, description: 'Payment status retrieved successfully' })
    async getPaymentStatus(
        @Param('provider') provider: PaymentProvider,
        @Param('paymentId') paymentId: string,
    ) {
        return this.paymentsService.getPaymentStatus(provider, paymentId);
    }



    @Get('providers')
    @ApiOperation({ summary: 'Get available payment providers', description: 'Get list of all available payment gateways' })
    @ApiResponse({ status: 200, description: 'Providers retrieved successfully' })
    async getProviders() {
        return {
            providers: this.paymentsService.getAvailableProviders(),
        };
    }



    @Post('webhook/:provider')
    @Auth(AuthType.None)
    @ApiOperation({ summary: 'Handle payment webhook', description: 'Handle webhook events from payment gateways. This endpoint should be publicly accessible (no auth required) for webhook delivery.' })
    @ApiParam({ name: 'provider', enum: PaymentProvider, description: 'Payment provider' })
    @ApiResponse({ status: 200, description: 'Webhook processed successfully' })
    async handleWebhook(
        @Param('provider') provider: PaymentProvider,
        @Req() req: RawBodyRequest<Request>,
        @Headers('stripe-signature') stripeSignature?: string,
        @Headers('x-razorpay-signature') razorpaySignature?: string,
        @Headers('x-paypal-transmission-id') paypalTransmissionId?: string,
    ) {
        let signature = '';
        if (provider === PaymentProvider.STRIPE && stripeSignature) {
            signature = stripeSignature;
        } else if (provider === PaymentProvider.RAZORPAY && razorpaySignature) {
            signature = razorpaySignature;
        } else if (provider === PaymentProvider.PAYPAL && paypalTransmissionId) {
            signature = paypalTransmissionId;
        }

        if (provider === PaymentProvider.STRIPE && !stripeSignature) {
            throw new BadRequestException('Missing stripe-signature header');
        }

        if (provider === PaymentProvider.STRIPE) {
            const payload = this.getStripeWebhookPayload(req);
            return this.paymentWebhookOrchestrator.handleStripeWebhook(payload, signature);
        }

        const payload = req.body ?? req.rawBody;
        return this.paymentsService.handleWebhook(provider, payload, signature);
    }

    /**
     * Stripe signature verification requires the untouched request body (Buffer).
     * Re-serializing parsed JSON will always fail verification.
     */
    private getStripeWebhookPayload(req: RawBodyRequest<Request>): Buffer {
        if (Buffer.isBuffer(req.body)) {
            return req.body;
        }

        if (req.rawBody) {
            return Buffer.isBuffer(req.rawBody)
                ? req.rawBody
                : Buffer.from(req.rawBody as Uint8Array);
        }

        throw new BadRequestException(
            'Stripe webhook raw body missing. Ensure express.raw middleware is applied to the webhook route.',
        );
    }



    // Payment Intent endpoints
    @Post('intent')
    @ApiOperation({ summary: 'Create payment intent', description: 'Create a new payment intent for an order' })
    @ApiBody({ type: CreatePaymentIntentDto })
    @ApiResponse({ status: 201, description: 'Payment intent created successfully' })
    async createPaymentIntent(@Body() dto: CreatePaymentIntentDto) {
        return this.paymentIntentService.create(dto);
    }



    @Get('intent/:id')
    @ApiOperation({ summary: 'Get payment intent by ID' })
    @ApiParam({ name: 'id', description: 'Payment Intent ID' })
    @ApiResponse({ status: 200, description: 'Payment intent retrieved successfully' })
    async getPaymentIntent(@Param('id') id: number) {
        return this.paymentIntentService.findOne(id, ['order', 'invoice', 'payments']);
    }



    @Get('intent/order/:orderId')
    @ApiOperation({ summary: 'Get payment intents by order ID' })
    @ApiParam({ name: 'orderId', description: 'Order ID' })
    @ApiResponse({ status: 200, description: 'Payment intents retrieved successfully' })
    async getPaymentIntentsByOrder(@Param('orderId') orderId: number) {
        return this.paymentIntentService.findByOrderId(orderId);
    }



    // Payment Flow endpoints
    @Post('flow/create/:orderId')
    @ApiOperation({ summary: 'Create payment flow', description: 'Create invoice and payment intent for an order' })
    @ApiParam({ name: 'orderId', description: 'Order ID' })
    @ApiBody({ schema: { properties: { provider: { type: 'string', enum: Object.values(PaymentProvider) } } } })
    @ApiResponse({ status: 201, description: 'Payment flow created successfully' })
    async createPaymentFlow(
        @Param('orderId') orderId: number,
        @Body('provider') provider: PaymentProvider,
    ) {
        return this.paymentFlowService.createPaymentFlow(orderId, provider);
    }



    @Post('flow/verify/:paymentIntentId')
    @ApiOperation({ summary: 'Verify and complete payment', description: 'Verify payment after gateway callback' })
    @ApiParam({ name: 'paymentIntentId', description: 'Payment Intent ID' })
    @ApiBody({ schema: { properties: { providerPaymentId: { type: 'string' } } } })
    @ApiResponse({ status: 200, description: 'Payment verified and completed' })
    async verifyAndCompletePayment(
        @Param('paymentIntentId') paymentIntentId: number,
        @Body('providerPaymentId') providerPaymentId: string,
    ) {
        return this.paymentFlowService.verifyAndCompletePayment(paymentIntentId, providerPaymentId);
    }



    // Refund endpoints
    @Post('refund/create')
    @ApiOperation({ summary: 'Create refund', description: 'Create a refund record' })
    @ApiBody({ type: CreateRefundDto })
    @ApiResponse({ status: 201, description: 'Refund created successfully' })
    async createRefund(@Body() dto: CreateRefundDto) {
        return this.refundService.create(dto);
    }



    @Post('refund/process/:paymentId')
    @ApiOperation({ summary: 'Process refund', description: 'Process refund through gateway and create record' })
    @ApiParam({ name: 'paymentId', description: 'Payment ID' })
    @ApiBody({ schema: { properties: { amount: { type: 'number' }, reason: { type: 'string' } } } })
    @ApiResponse({ status: 200, description: 'Refund processed successfully' })
    async processRefund(
        @Param('paymentId') paymentId: number,
        @Body('amount') amount?: number,
        @Body('reason') reason?: string,
    ) {
        return this.paymentFlowService.processRefund(paymentId, amount, reason);
    }



    @Get('refund/:id')
    @ApiOperation({ summary: 'Get refund by ID' })
    @ApiParam({ name: 'id', description: 'Refund ID' })
    @ApiResponse({ status: 200, description: 'Refund retrieved successfully' })
    async getRefund(@Param('id') id: number) {
        return this.refundService.findOne(id, ['payment']);
    }

    

    @Get('refund/payment/:paymentId')
    @ApiOperation({ summary: 'Get refunds by payment ID' })
    @ApiParam({ name: 'paymentId', description: 'Payment ID' })
    @ApiResponse({ status: 200, description: 'Refunds retrieved successfully' })
    async getRefundsByPayment(@Param('paymentId') paymentId: number) {
        return this.refundService.findByPaymentId(paymentId);
    }
}
