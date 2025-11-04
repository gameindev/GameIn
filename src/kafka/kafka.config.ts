import { registerAs } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';

export default registerAs('kafka', () => {
    const brokers = process.env.KAFKA_BROKERS?.split(',') || ['localhost:9092'];
    const useSsl = process.env.KAFKA_USE_SSL === 'true';
    const useSasl = process.env.KAFKA_USE_SASL === 'true';

    // SSL Configuration
    let ssl: any = false;
    if (useSsl) {
        const caCertPath = process.env.KAFKA_CA_CERT_PATH || path.join(process.cwd(), 'certs', 'kafka-ca-certificate.crt');
        try {
            const caCert = fs.readFileSync(caCertPath, 'utf8');
            ssl = {
                rejectUnauthorized: true,
                ca: [caCert],
            };
        } catch (error) {
            console.warn(`Warning: Could not read CA certificate from ${caCertPath}. SSL may not work properly.`);
            ssl = {
                rejectUnauthorized: false, // Fallback: allow self-signed certificates
            };
        }
    }

    // SASL Configuration
    let sasl: any = undefined;
    if (useSasl) {
        sasl = {
            mechanism: process.env.KAFKA_SASL_MECHANISM || 'plain',
            username: process.env.KAFKA_SASL_USERNAME || '',
            password: process.env.KAFKA_SASL_PASSWORD || '',
        };
    }

    return {
        clientId: process.env.KAFKA_CLIENT_ID || 'gamein-backend',
        brokers,
        groupId: process.env.KAFKA_GROUP_ID || 'gamein-group',
        ssl,
        sasl,
        retry: {
            initialRetryTime: parseInt(process.env.KAFKA_RETRY_INITIAL_TIME || '100'),
            retries: parseInt(process.env.KAFKA_RETRIES || '8'),
        },
        connectionTimeout: parseInt(process.env.KAFKA_CONNECTION_TIMEOUT || '3000'),
        requestTimeout: parseInt(process.env.KAFKA_REQUEST_TIMEOUT || '30000'),
        // Consumer-specific configuration
        sessionTimeout: parseInt(process.env.KAFKA_SESSION_TIMEOUT || '30000'),
        heartbeatInterval: parseInt(process.env.KAFKA_HEARTBEAT_INTERVAL || '3000'),
        maxRetries: parseInt(process.env.KAFKA_CONSUMER_MAX_RETRIES || '10'),
        retryDelay: parseInt(process.env.KAFKA_CONSUMER_RETRY_DELAY || '2000'),
    };
});
