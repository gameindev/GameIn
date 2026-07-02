import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString, IsEmail, Min, IsObject } from 'class-validator';
import { PaymentProvider } from '../../offerings/enums/payment-provider.enum';

export class CreateGatewayPaymentDto {
    @ApiProperty({ description: 'Payment amount' })
    @IsNumber()
    @Min(0.01)
    amount: number;

    @ApiProperty({ description: 'Currency code (e.g., USD, INR, EUR)' })
    @IsString()
    currency: string;

    @ApiProperty({ description: 'Payment provider', enum: PaymentProvider })
    @IsEnum(PaymentProvider)
    provider: PaymentProvider;

    @ApiPropertyOptional({ description: 'Order ID' })
    @IsOptional()
    @IsString()
    orderId?: string;

    @ApiPropertyOptional({ description: 'Customer ID' })
    @IsOptional()
    @IsString()
    customerId?: string;

    @ApiPropertyOptional({ description: 'Customer email' })
    @IsOptional()
    @IsEmail()
    customerEmail?: string;

    @ApiPropertyOptional({ description: 'Payment description' })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiPropertyOptional({ description: 'Saved Stripe payment method ID' })
    @IsOptional()
    @IsString()
    paymentMethodId?: string;

    @ApiPropertyOptional({ description: 'Return URL for redirect after payment' })
    @IsOptional()
    @IsString()
    returnUrl?: string;

    @ApiPropertyOptional({ description: 'Cancel URL for redirect if payment is cancelled' })
    @IsOptional()
    @IsString()
    cancelUrl?: string;

    @ApiPropertyOptional({ description: 'Additional metadata' })
    @IsOptional()
    @IsObject()
    metadata?: Record<string, any>;
}

