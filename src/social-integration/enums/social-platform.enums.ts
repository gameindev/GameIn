export enum SocialPlatform {
    TWITCH = "TWITCH",
    INSTAGRAM = "INSTAGRAM",
    X = "X",
    YOUTUBE = "YOUTUBE",
    TIKTOK = "TIKTOK",
    DISCORD = "DISCORD",
    KICK = 'KICK',
    FACEBOOK = 'FACEBOOK',
    SNAPCHAT = 'SNAPCHAT',
    PINTEREST = 'PINTEREST',
    LINKEDIN = 'LINKEDIN',
    THREADS = 'THREADS',
    OTHER = 'OTHER' 
}

/** Platforms implemented for OAuth connect, stats, and scheduled sync in social-integration. */
export const SOCIAL_INTEGRATION_OAUTH_PLATFORMS: readonly SocialPlatform[] = [
    SocialPlatform.TWITCH,
    SocialPlatform.INSTAGRAM,
    SocialPlatform.X,
    SocialPlatform.YOUTUBE,
    SocialPlatform.TIKTOK,
] as const;

export type ConnectionState = 'ADD' | 'CONNECT' | 'CONNECTED';