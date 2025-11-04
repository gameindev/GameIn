import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsString, IsOptional, IsInt, Min, IsNumber } from 'class-validator';
import { RefundStatus } from '../enums/refund-status.enum';

export class CreateRefundDto {
    @ApiProperty({ description: 'Payment ID' })
    @IsInt()
    @Min(1)
    payment_id: number;

    @ApiPropertyOptional({ description: 'Provider refund ID' })
    @IsOptional()
    @IsString()
    provider_refund_id?: string;

    @ApiProperty({ description: 'Refund amount' })
    @IsNumber()
    @Min(0.01)
    amount: number;

    @ApiPropertyOptional({ description: 'Refund status', enum: RefundStatus })
    @IsOptional()
    @IsEnum(RefundStatus)
    status?: RefundStatus;

    @ApiPropertyOptional({ description: 'Refund reason' })
    @IsOptional()
    @IsString()
    reason?: string;

    @ApiPropertyOptional({ description: 'Additional metadata' })
    @IsOptional()
    meta_data?: Record<string, any>;
}

