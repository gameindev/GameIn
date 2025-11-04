import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, Min, IsDateString, IsString } from 'class-validator';
import { InvoiceStatus } from '../enums/invoice-status.enum';

export class UpdateInvoiceDto {
    @ApiPropertyOptional({ description: 'Invoice status', enum: InvoiceStatus })
    @IsOptional()
    @IsEnum(InvoiceStatus)
    status?: InvoiceStatus;

    @ApiPropertyOptional({ description: 'Currency code' })
    @IsOptional()
    @IsString()
    currency?: string;

    @ApiPropertyOptional({ description: 'Amount due' })
    @IsOptional()
    @IsNumber()
    @Min(0)
    amount_due?: number;

    @ApiPropertyOptional({ description: 'Tax amount' })
    @IsOptional()
    @IsNumber()
    @Min(0)
    tax_amount?: number;

    @ApiPropertyOptional({ description: 'Platform fee' })
    @IsOptional()
    @IsNumber()
    @Min(0)
    platform_fee?: number;

    @ApiPropertyOptional({ description: 'Due date' })
    @IsOptional()
    @IsDateString()
    due_at?: string;

    @ApiPropertyOptional({ description: 'PDF URL' })
    @IsOptional()
    @IsString()
    pdf_url?: string;
}

