import { registerAs } from "@nestjs/config";

export default registerAs('discordConfig', () => ({
    discordClientId: process.env.DISCORD_CLIENT_ID || '',
    discordClientSecret: process.env.DISCORD_CLIENT_SECRET || '',
    discordCallbackUrl: process.env.DISCORD_REDIRECT_URI || '',
    discordScopes: process.env.DISCORD_SCOPES || ''
}));
