import { registerAs } from "@nestjs/config";

function getEnv(key: string, alt?: string): string {
    const v = process.env[key] || process.env[alt!];
    return (v && typeof v === 'string') ? v.trim() : '';
}

export default registerAs('youtubeConfig', () => ({
    youtubeClientId: getEnv('YOUTUBE_CLIENT_ID', 'GOOGLE_CLIENT_ID'),
    youtubeClientSecret: getEnv('YOUTUBE_CLIENT_SECRET', 'GOOGLE_CLIENT_SECRET'),
    youtubeCallbackUrl: getEnv('YOUTUBE_REDIRECT_URI', 'YOUTUBE_CALLBACK_URL'),
}));
