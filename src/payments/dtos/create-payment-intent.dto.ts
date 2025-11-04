import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsInt, Min, IsString } from 'class-validator';
import { PaymentProvider } from '@/offerings/enums/payment-provider.enum';

export class CreatePaymentIntentDto {
    @ApiProperty({ description: 'Order ID' })
    @IsInt()
    @Min(1)
    order_id: number;

    @ApiProperty({ description: 'Invoice ID' })
    @IsInt()
    @Min(1)
    invoice_id: number;

    @ApiProperty({ description: 'Payment provider', enum: PaymentProvider })
    @IsEnum(PaymentProvider)
    provider: PaymentProvider;

    @ApiProperty({ description: 'Amount' })
    @IsNumber()
    @Min(0.01)
    amount: number;

    @ApiPropertyOptional({ description: 'Currency code', default: 'USD' })
    @IsOptional()
    @IsString()
    currency?: string;

    @ApiPropertyOptional({ description: 'Additional metadata' })
    @IsOptional()
    meta_data?: Record<string, any>;
}

