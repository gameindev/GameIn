import { registerAs } from "@nestjs/config";

function getEnv(key: string, alt?: string): string {
    const v = process.env[key] || process.env[alt!];
    return (v && typeof v === 'string') ? v.trim() : '';
}

export default registerAs('xConfig', () => ({
    xClientId: getEnv('X_CLIENT_ID'),
    xClientSecret: getEnv('X_CLIENT_SECRET'),
    xCallbackUrl: getEnv('X_REDIRECT_URI', 'X_CALLBACK_URL'),
    xScopes: getEnv('X_SCOPES') || 'tweet.read users.read offline.access',
}));
