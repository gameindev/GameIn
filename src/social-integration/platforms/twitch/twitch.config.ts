import { registerAs } from "@nestjs/config";

export default registerAs('twitchConfig', () => ({
    twitchClientId: process.env.TWITCH_CLIENT_ID || '',
    twitchClientSecret: process.env.TWITCH_CLIENT_SECRET || '',
    twitchCallbackUrl: process.env.TWITCH_CALLBACK_URL || '',
}));
