import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';
import { PaymentGateway, CreatePaymentRequest, VerifyPaymentRequest, RefundPaymentRequest, PaymentResponse, PaymentVerificationResponse } from '../interfaces/payment-gateway.interface';
import { PaymentProvider } from '../../offerings/enums/payment-provider.enum';

@Injectable()
export class PayPalAdapter extends PaymentGateway {
    readonly provider = PaymentProvider.PAYPAL;
    private clientId: string;
    private clientSecret: string;
    private baseUrl: string;
    private axiosInstance: AxiosInstance;
    private accessToken: string | null = null;
    private tokenExpiry: number = 0;

    constructor(private configService: ConfigService) {
        super();
        const paypalConfig = this.configService.get('paypalConfig');
        
        this.clientId = paypalConfig?.clientId || this.configService.get<string>('PAYPAL_CLIENT_ID') || '';
        this.clientSecret = paypalConfig?.clientSecret || this.configService.get<string>('PAYPAL_CLIENT_SECRET') || '';
        this.baseUrl = paypalConfig?.baseUrl || (this.configService.get<string>('PAYPAL_MODE') !== 'live'
            ? 'https://api.sandbox.paypal.com'
            : 'https://api.paypal.com');

        if (!this.clientId || !this.clientSecret) {
            throw new Error('PayPal credentials are not configured. Please set PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET environment variables.');
        }

        this.axiosInstance = axios.create({
            baseURL: this.baseUrl,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    private async getAccessToken(): Promise<string> {
        // Check if token is still valid (with 5 minute buffer)
        if (this.accessToken && Date.now() < this.tokenExpiry - 300000) {
            return this.accessToken;
        }

        try {
            const response = await axios.post(
                `${this.baseUrl}/v1/oauth2/token`,
                'grant_type=client_credentials',
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    auth: {
                        username: this.clientId,
                        password: this.clientSecret,
                    },
                }
            );

            this.accessToken = response.data.access_token;
            this.tokenExpiry = Date.now() + (response.data.expires_in * 1000);
            return this.accessToken;
        } catch (error: any) {
            throw new Error(`Failed to get PayPal access token: ${error.message}`);
        }
    }

    async createPayment(request: CreatePaymentRequest): Promise<PaymentResponse> {
        try {
            const token = await this.getAccessToken();

            const orderData = {
                intent: 'CAPTURE',
                purchase_units: [
                    {
                        reference_id: request.orderId,
                        description: request.description || 'Payment',
                        amount: {
                            currency_code: request.currency.toUpperCase(),
                            value: request.amount.toFixed(2),
                        },
                        ...(request.customerEmail && {
                            payee: {
                                email_address: request.customerEmail,
                            },
                        }),
                    },
                ],
                ...(request.returnUrl && request.cancelUrl && {
                    application_context: {
                        return_url: request.returnUrl,
                        cancel_url: request.cancelUrl,
                        brand_name: 'GameIn',
                    },
                }),
            };

            const response = await this.axiosInstance.post('/v2/checkout/orders', orderData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const order = response.data;
            const approveUrl = order.links?.find((link: any) => link.rel === 'approve')?.href;

            return {
                success: true,
                paymentId: order.id,
                transactionId: order.id,
                redirectUrl: approveUrl,
                metadata: {
                    orderId: order.id,
                    status: order.status,
                },
            };
        } catch (error: any) {
            return {
                success: false,
                error: error.response?.data?.message || error.message || 'Failed to create PayPal payment',
            };
        }
    }

    async verifyPayment(request: VerifyPaymentRequest): Promise<PaymentVerificationResponse> {
        try {
            const token = await this.getAccessToken();

            const response = await this.axiosInstance.get(`/v2/checkout/orders/${request.paymentId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const order = response.data;
            const status = this.mapPayPalStatus(order.status);

            // Check amount if provided
            if (request.amount) {
                const orderAmount = parseFloat(order.purchase_units[0]?.amount?.value || '0');
                if (orderAmount !== request.amount) {
                    return {
                        success: false,
                        paymentId: order.id,
                        status: 'failed',
                        amount: orderAmount,
                        currency: order.purchase_units[0]?.amount?.currency_code || 'USD',
                        metadata: {
                            error: 'Amount mismatch',
                        },
                    };
                }
            }

            return {
                success: status === 'succeeded',
                paymentId: order.id,
                status,
                amount: parseFloat(order.purchase_units[0]?.amount?.value || '0'),
                currency: order.purchase_units[0]?.amount?.currency_code || 'USD',
                metadata: {
                    status: order.status,
                    captureId: order.purchase_units[0]?.payments?.captures?.[0]?.id,
                },
            };
        } catch (error: any) {
            return {
                success: false,
                paymentId: request.paymentId,
                status: 'failed',
                amount: 0,
                currency: 'USD',
                metadata: {
                    error: error.response?.data?.message || error.message || 'Failed to verify payment',
                },
            };
        }
    }

    async refundPayment(request: RefundPaymentRequest): Promise<PaymentResponse> {
        try {
            const token = await this.getAccessToken();

            // First get the order to find the capture ID
            const orderResponse = await this.axiosInstance.get(`/v2/checkout/orders/${request.paymentId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const captureId = orderResponse.data.purchase_units[0]?.payments?.captures?.[0]?.id;

            if (!captureId) {
                return {
                    success: false,
                    error: 'No capture found for this payment',
                };
            }

            const refundData: any = {};
            if (request.amount) {
                refundData.amount = {
                    value: request.amount.toFixed(2),
                    currency_code: orderResponse.data.purchase_units[0]?.amount?.currency_code || 'USD',
                };
            }

            if (request.reason) {
                refundData.note_to_payer = request.reason;
            }

            const refundResponse = await this.axiosInstance.post(
                `/v2/payments/captures/${captureId}/refund`,
                refundData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return {
                success: true,
                paymentId: request.paymentId,
                transactionId: refundResponse.data.id,
                metadata: {
                    refundId: refundResponse.data.id,
                    status: refundResponse.data.status,
                },
            };
        } catch (error: any) {
            return {
                success: false,
                error: error.response?.data?.message || error.message || 'Failed to process refund',
            };
        }
    }

    async getPaymentStatus(paymentId: string): Promise<PaymentVerificationResponse> {
        return this.verifyPayment({ paymentId });
    }

    async handleWebhook(payload: any, signature: string): Promise<PaymentVerificationResponse> {
        // PayPal webhook verification is more complex and requires signature verification
        // For now, we'll handle basic webhook events
        const eventType = payload.event_type;

        if (eventType === 'PAYMENT.CAPTURE.COMPLETED') {
            const resource = payload.resource;
            return {
                success: true,
                paymentId: resource.id,
                status: 'succeeded',
                amount: parseFloat(resource.amount.value),
                currency: resource.amount.currency_code,
                metadata: {
                    eventType,
                    captureId: resource.id,
                },
            };
        }

        if (eventType === 'PAYMENT.CAPTURE.DENIED' || eventType === 'PAYMENT.CAPTURE.REFUNDED') {
            const resource = payload.resource;
            return {
                success: false,
                paymentId: resource.id,
                status: eventType.includes('REFUNDED') ? 'refunded' : 'failed',
                amount: parseFloat(resource.amount.value),
                currency: resource.amount.currency_code,
                metadata: {
                    eventType,
                },
            };
        }

        throw new Error(`Unhandled webhook event type: ${eventType}`);
    }

    private mapPayPalStatus(status: string): 'succeeded' | 'failed' | 'pending' | 'refunded' {
        switch (status) {
            case 'COMPLETED':
                return 'succeeded';
            case 'SAVED':
            case 'APPROVED':
            case 'CREATED':
                return 'pending';
            case 'VOIDED':
            case 'CANCELLED':
                return 'failed';
            default:
                return 'pending';
        }
    }
}

