import { registerAs } from "@nestjs/config";


export default registerAs('database', () => ({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || '',
    ssl: process.env.DATABASE_SSL || 'true',
    logging: process.env.TYPEORM_LOGGING,
    name: process.env.DB_NAME || 'postgres',
    synchronize: false,
    autoLoadEntities: false,
}))
