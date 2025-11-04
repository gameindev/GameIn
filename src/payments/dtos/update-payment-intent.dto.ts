import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsString, IsOptional } from 'class-validator';
import { PaymentStatus } from '../enums/payment-status.enum';

export class UpdatePaymentIntentDto {
    @ApiPropertyOptional({ description: 'Provider intent ID' })
    @IsOptional()
    @IsString()
    provider_intent_id?: string;

    @ApiPropertyOptional({ description: 'Client secret' })
    @IsOptional()
    @IsString()
    client_secret?: string;

    @ApiPropertyOptional({ description: 'Payment status', enum: PaymentStatus })
    @IsOptional()
    @IsEnum(PaymentStatus)
    status?: PaymentStatus;

    @ApiPropertyOptional({ description: 'Additional metadata' })
    @IsOptional()
    meta_data?: Record<string, any>;
}

