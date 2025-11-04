import { Controller, Post, Body, Get, Param, Logger } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { KafkaHealthService } from './kafka-health.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Kafka')
@Controller('kafka')
@ApiBearerAuth()
export class KafkaController {
    private readonly logger = new Logger(KafkaController.name);

    constructor(
        private readonly kafkaService: KafkaService,
        private readonly kafkaHealthService: KafkaHealthService,
    ) { }

    @Post('send')
    @ApiOperation({ summary: 'Send a message to Kafka topic' })
    @ApiResponse({ status: 200, description: 'Message sent successfully' })
    async sendMessage(
        @Body() body: { topic: string; message: any; key?: string; partition?: number }
    ) {
        try {
            const result = await this.kafkaService.sendMessage(
                body.topic,
                { key: body.key, value: body.message },
                body.partition
            );

            this.logger.log(`Message sent to topic ${body.topic}`);
            return {
                success: true,
                result,
                message: `Message sent to topic ${body.topic}`,
            };
        } catch (error) {
            this.logger.error('Failed to send message:', error);
            throw error;
        }
    }

    @Post('topic/create')
    @ApiOperation({ summary: 'Create a new Kafka topic' })
    @ApiResponse({ status: 200, description: 'Topic created successfully' })
    async createTopic(
        @Body() body: { topic: string; partitions?: number; replicationFactor?: number }
    ) {
        try {
            await this.kafkaService.createTopic(
                body.topic,
                body.partitions || 1,
                body.replicationFactor || 1
            );

            this.logger.log(`Topic ${body.topic} created successfully`);
            return {
                success: true,
                message: `Topic ${body.topic} created successfully`,
            };
        } catch (error) {
            this.logger.error('Failed to create topic:', error);
            throw error;
        }
    }

    @Get('health')
    @ApiOperation({ summary: 'Check Kafka service health' })
    @ApiResponse({ status: 200, description: 'Kafka service is healthy' })
    async healthCheck() {
        return this.kafkaHealthService.checkHealth();
    }
}
