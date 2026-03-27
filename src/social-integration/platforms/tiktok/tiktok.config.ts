import { registerAs } from "@nestjs/config";

export default registerAs('tiktokConfig', () => ({
    tiktokClientKey: (process.env.TIKTOK_CLIENT_KEY || process.env.TIKTOK_CLIENT_ID || '').trim(),
    tiktokClientSecret: (process.env.TIKTOK_CLIENT_SECRET || '').trim(),
    tiktokCallbackUrl: (process.env.TIKTOK_REDIRECT_URI || process.env.TIKTOK_CALLBACK_URL || '').trim(),
    tiktokScopes: (process.env.TIKTOK_SCOPES || 'user.info.basic,user.info.stats,video.list').trim(),
}));
