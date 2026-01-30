import { registerAs } from "@nestjs/config";

function getEnv(key: string, alt?: string): string {
    const v = process.env[key] || process.env[alt!];
    return (v && typeof v === 'string') ? v.trim() : '';
}

export default registerAs('discordConfig', () => ({
    discordClientId: getEnv('DISCORD_CLIENT_ID'),
    discordClientSecret: getEnv('DISCORD_CLIENT_SECRET'),
    discordCallbackUrl: getEnv('DISCORD_REDIRECT_URI', 'DISCORD_CALLBACK_URL'),
    discordScopes: getEnv('DISCORD_SCOPES') || 'identify email',
}));
