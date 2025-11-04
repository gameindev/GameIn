import { registerAs } from "@nestjs/config";

export default registerAs('tiktokConfig', () => ({
    tiktokClientId: process.env.TIKTOK_CLIENT_ID || '',
    tiktokClientSecret: process.env.TIKTOK_CLIENT_SECRET || '',
    tiktokCallbackUrl: process.env.TIKTOK_REDIRECT_URI || '',
    tiktokScopes: process.env.TIKTOK_SCOPES || ''
}));
