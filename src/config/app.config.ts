import { registerAs } from "@nestjs/config"


export default registerAs('appConfig', () => ({
    environment: process.env.NODE_ENV || 'production',
    apiVersion: process.env.API_VERSION || '0.0.1',
    uploadStrategy: process.env.UPLOAD_STRATEGY || 'local',
}))

