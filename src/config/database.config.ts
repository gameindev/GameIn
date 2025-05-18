import { registerAs } from "@nestjs/config";


export default registerAs('database', () => ({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || '',
    name: process.env.DB_NAME || 'postgres',
    synchronize: process.env.DB_SYNCHRONIZE === 'true' ? true : false,
    autoLoadEntities: process.env.DB_AUTOLOAD_ENTITIES === 'true' ? true : false,
}))