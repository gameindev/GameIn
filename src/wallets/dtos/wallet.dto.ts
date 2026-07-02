import { IsNumber, IsOptional, IsPositive, IsString, IsUrl, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/** Stripe Connect return/refresh URLs — allow localhost without a TLD and hash routes. */
const CONNECT_URL_OPTIONS = {
    require_tld: false,
    allow_fragments: true,
    protocols: ['http', 'https'] as string[],
};
export class TopUpWalletDto {
    @ApiProperty({ example: 100 })
    @IsNumber()
    @IsPositive()
    amount: number;

    @ApiPropertyOptional({ description: 'Saved Stripe payment method ID to charge' })
    @IsOptional()
    @IsString()
    paymentMethodId?: string;
}

export class ConfirmTopUpWalletDto {
    @ApiProperty({ description: 'Stripe PaymentIntent ID (pi_...)' })
    @IsString()
    paymentId: string;

    @ApiProperty({ description: 'Wallet ID returned from top-up initiation' })
    @IsNumber()
    @IsPositive()
    walletId: number;
}

export class WithdrawWalletDto {
    @ApiPropertyOptional({ example: 250 })
    @IsOptional()
    @IsNumber()
    @Min(1)
    amount?: number;
}

export class ConnectOnboardDto {
    @ApiProperty({ example: 'http://localhost:5173/#/settings/payments' })
    @IsUrl(CONNECT_URL_OPTIONS)
    refreshUrl: string;

    @ApiProperty({ example: 'http://localhost:5173/#/settings/payments' })
    @IsUrl(CONNECT_URL_OPTIONS)
    returnUrl: string;
}
export class LedgerQueryDto {
    @ApiPropertyOptional({ default: 1 })
    @IsOptional()
    @IsNumber()
    page?: number;

    @ApiPropertyOptional({ default: 20 })
    @IsOptional()
    @IsNumber()
    limit?: number;
}

export class WalletAnalyticsQueryDto {
    @ApiPropertyOptional({ default: 30, description: 'Rolling window in days' })
    @IsOptional()
    @IsNumber()
    days?: number;
}

export class DetachPaymentMethodDto {
    @ApiProperty()
    @IsString()
    paymentMethodId: string;
}
