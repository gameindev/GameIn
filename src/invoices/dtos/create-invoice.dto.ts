import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsInt, Min, IsDateString } from 'class-validator';
import { InvoiceStatus } from '../enums/invoice-status.enum';

export class CreateInvoiceDto {
    @ApiProperty({ description: 'Order ID' })
    @IsInt()
    @Min(1)
    order_id: number;

    @ApiPropertyOptional({ description: 'Invoice status', enum: InvoiceStatus, default: InvoiceStatus.DRAFT })
    @IsOptional()
    @IsEnum(InvoiceStatus)
    status?: InvoiceStatus;

    @ApiPropertyOptional({ description: 'Currency code', default: 'USD' })
    @IsOptional()
    currency?: string;

    @ApiProperty({ description: 'Amount due' })
    @IsNumber()
    @Min(0)
    amount_due: number;

    @ApiPropertyOptional({ description: 'Tax amount', default: 0 })
    @IsOptional()
    @IsNumber()
    @Min(0)
    tax_amount?: number;

    @ApiPropertyOptional({ description: 'Platform fee', default: 0 })
    @IsOptional()
    @IsNumber()
    @Min(0)
    platform_fee?: number;

    @ApiPropertyOptional({ description: 'Due date' })
    @IsOptional()
    @IsDateString()
    due_at?: string;
}

