import { Injectable, Logger } from '@nestjs/common';
import { KafkaService } from './kafka.service';

@Injectable()
export class KafkaHealthService {
    private readonly logger = new Logger(KafkaHealthService.name);

    constructor(private readonly kafkaService: KafkaService) { }

    async checkHealth() {
        try {
            const isConnected = this.kafkaService.isConnected();

            if (!isConnected) {
                await this.kafkaService.ensureConnection();
            }

            return {
                status: 'healthy',
                connected: this.kafkaService.isConnected(),
                timestamp: new Date().toISOString(),
            };
        } catch (error) {
            this.logger.error('Kafka health check failed:', error);
            return {
                status: 'unhealthy',
                connected: false,
                error: error.message,
                timestamp: new Date().toISOString(),
            };
        }
    }
}
