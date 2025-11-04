import { registerAs } from '@nestjs/config';

export default registerAs('kafka', () => ({
    clientId: process.env.KAFKA_CLIENT_ID || 'gamein-backend',
    brokers: process.env.KAFKA_BROKERS?.split(',') || ['localhost:9092'],
    groupId: process.env.KAFKA_BROKERS || 'gamein-group',
    retry: {
        initialRetryTime: parseInt(process.env.KAFKA_RETRY_INITIAL_TIME || '100'),
        retries: parseInt(process.env.KAFKA_RETRIES || '8'),
    },
    connectionTimeout: parseInt(process.env.KAFKA_CONNECTION_TIMEOUT || '3000'),
    requestTimeout: parseInt(process.env.KAFKA_REQUEST_TIMEOUT || '30000'),
}));
