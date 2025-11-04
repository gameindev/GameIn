import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsString, IsOptional, IsInt, Min, IsDateString } from 'class-validator';
import { PaymentStatus } from '../enums/payment-status.enum';

export class CreatePaymentDto {
    @ApiProperty({ description: 'Payment Intent ID' })
    @IsInt()
    @Min(1)
    payment_intent_id: number;

    @ApiPropertyOptional({ description: 'Provider payment ID' })
    @IsOptional()
    @IsString()
    provider_payment_id?: string;

    @ApiProperty({ description: 'Amount captured' })
    @IsOptional()
    @Min(0.01)
    amount_captured: number;

    @ApiPropertyOptional({ description: 'Currency code', default: 'USD' })
    @IsOptional()
    @IsString()
    currency?: string;

    @ApiPropertyOptional({ description: 'Payment status', enum: PaymentStatus })
    @IsOptional()
    @IsEnum(PaymentStatus)
    status?: PaymentStatus;

    @ApiPropertyOptional({ description: 'Receipt URL' })
    @IsOptional()
    @IsString()
    receipt_url?: string;

    @ApiPropertyOptional({ description: 'Failure code' })
    @IsOptional()
    @IsString()
    failure_code?: string;

    @ApiPropertyOptional({ description: 'Failure message' })
    @IsOptional()
    @IsString()
    failure_message?: string;

    @ApiPropertyOptional({ description: 'Additional metadata' })
    @IsOptional()
    meta_data?: Record<string, any>;

    @ApiPropertyOptional({ description: 'Succeeded at timestamp' })
    @IsOptional()
    @IsDateString()
    succeeded_at?: string;
}
