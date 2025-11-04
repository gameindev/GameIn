import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { PaymentProvider } from '../../offerings/enums/payment-provider.enum';

export class RefundPaymentDto {
    @ApiProperty({ description: 'Payment ID to refund' })
    @IsString()
    paymentId: string;

    @ApiProperty({ description: 'Payment provider', enum: PaymentProvider })
    @IsEnum(PaymentProvider)
    provider: PaymentProvider;

    @ApiPropertyOptional({ description: 'Partial refund amount (if not provided, full refund)' })
    @IsOptional()
    @IsNumber()
    @Min(0.01)
    amount?: number;

    @ApiPropertyOptional({ description: 'Refund reason' })
    @IsOptional()
    @IsString()
    reason?: string;
}

