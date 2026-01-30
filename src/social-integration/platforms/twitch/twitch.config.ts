import { registerAs } from "@nestjs/config";

function getEnv(key: string, alt?: string): string {
    const v = process.env[key] || process.env[alt!];
    return (v && typeof v === 'string') ? v.trim() : '';
}

export default registerAs('twitchConfig', () => ({
    twitchClientId: getEnv('TWITCH_CLIENT_ID'),
    twitchClientSecret: getEnv('TWITCH_CLIENT_SECRET'),
    twitchCallbackUrl: getEnv('TWITCH_CALLBACK_URL', 'TWITCH_REDIRECT_URI'),
}));
