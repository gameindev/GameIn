import { registerAs } from "@nestjs/config";

export default registerAs('instagramConfig', () => ({
    instagramAppId: (process.env.INSTAGRAM_APP_ID || process.env.META_APP_ID || '').trim(),
    instagramAppSecret: (process.env.INSTAGRAM_APP_SECRET || process.env.META_APP_SECRET || '').trim(),
    instagramCallbackUrl: (process.env.INSTAGRAM_CALLBACK_URL || process.env.INSTAGRAM_REDIRECT_URI || '').trim(),
    instagramGraphVersion: (process.env.INSTAGRAM_GRAPH_VERSION || 'v21.0').trim(),
    instagramScopes: (
        process.env.INSTAGRAM_SCOPES ||
        'pages_show_list,pages_read_engagement,instagram_basic,instagram_manage_insights,business_management'
    ).trim(),
}));
