import { registerAs } from "@nestjs/config";

export default registerAs('xConfig', () => ({
    xClientId: process.env.X_CLIENT_ID || '',
    xClientSecret: process.env.X_CLIENT_SECRET || '',
    xCallbackUrl: process.env.X_REDIRECT_URI || '',
    xScopes: process.env.X_SCOPES || ''
}));
