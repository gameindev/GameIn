import { registerAs } from '@nestjs/config';

export default registerAs('walletConfig', () => ({
    releaseHoldDays: parseInt(process.env.WALLET_RELEASE_HOLD_DAYS ?? '7', 10),
    minWithdrawal: parseFloat(process.env.WALLET_MIN_WITHDRAWAL ?? '25'),
    instantPayoutEnabled: process.env.WALLET_INSTANT_PAYOUT_ENABLED !== 'false',
    defaultCurrency: process.env.WALLET_DEFAULT_CURRENCY ?? 'USD',
    stripeConnectClientId: process.env.STRIPE_CONNECT_CLIENT_ID,
    systemUserId: parseInt(process.env.GAMEIN_SYSTEM_USER_ID ?? '', 10) || undefined,
}));
