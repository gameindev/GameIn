import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { PaymentProvider } from '../../offerings/enums/payment-provider.enum';

export class VerifyPaymentDto {
    @ApiProperty({ description: 'Payment ID from gateway' })
    @IsString()
    paymentId: string;

    @ApiProperty({ description: 'Payment provider', enum: PaymentProvider })
    @IsEnum(PaymentProvider)
    provider: PaymentProvider;

    @ApiPropertyOptional({ description: 'Order ID for verification' })
    @IsOptional()
    @IsString()
    orderId?: string;

    @ApiPropertyOptional({ description: 'Expected amount for verification' })
    @IsOptional()
    @IsNumber()
    @Min(0.01)
    amount?: number;
}

