import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Kafka, Producer, Consumer, EachMessagePayload, logLevel } from 'kafkajs';

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
    private readonly logger = new Logger(KafkaService.name);
    private kafka: Kafka;
    private producer: Producer;
    private consumer: Consumer;
    private messagePersistenceConsumer: Consumer;
    private kafkaConfig: any;
    private isInitializing = false;
    private isProducerConnected = false;
    private reconnectingProducer = false;

    constructor(private configService: ConfigService) {}

    async onModuleInit() {
        this.kafkaConfig = this.configService.get('kafka');
        await this.initializeKafkaComponents();
        await this.connectWithRetry();
        this.setupProducerEventListeners();
    }

    private async initializeKafkaComponents(): Promise<void> {
        if (!this.kafkaConfig) {
            this.kafkaConfig = this.configService.get('kafka');
            if (!this.kafkaConfig) throw new Error('Kafka configuration not available.');
        }

        this.kafka = new Kafka({
            clientId: this.kafkaConfig.clientId,
            brokers: this.kafkaConfig.brokers,
            ssl: this.kafkaConfig.ssl ?? true,
            sasl: this.kafkaConfig.sasl ?? {
                mechanism: 'plain',
                username: process.env.KAFKA_SASL_USERNAME,
                password: process.env.KAFKA_SASL_PASSWORD,
            },
            logLevel: logLevel.NOTHING,
            retry: { retries: 8, initialRetryTime: 200, factor: 0.3 },
        });

        const baseConsumerConfig = {
            sessionTimeout: this.kafkaConfig.sessionTimeout || 30000,
            heartbeatInterval: this.kafkaConfig.heartbeatInterval || 3000,
            retry: { retries: 5 },
        };

        this.producer = this.kafka.producer({
            allowAutoTopicCreation: true,
            idempotent: true,
            retry: { retries: 8, initialRetryTime: 300 },
        });

        this.consumer = this.kafka.consumer({
            ...baseConsumerConfig,
            groupId: this.kafkaConfig.groupId,
        });

        this.messagePersistenceConsumer = this.kafka.consumer({
            ...baseConsumerConfig,
            groupId: `${this.kafkaConfig.groupId}-message-persistence`,
        });
    }

    private async connectWithRetry(): Promise<void> {
        if (this.isInitializing) {
            this.logger.warn('Kafka connection already in progress');
            return;
        }

        this.isInitializing = true;
        const maxRetries = this.kafkaConfig?.maxRetries || 10;
        const retryDelay = this.kafkaConfig?.retryDelay || 2000;

        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                await this.producer.connect();
                this.isProducerConnected = true;
                this.logger.log('✅ Kafka producer connected');
                await this.consumer.connect();
                await this.messagePersistenceConsumer.connect();
                this.logger.log('✅ Kafka consumers connected');
                this.isInitializing = false;
                return;
            } catch (error) {
                this.logger.warn(`Kafka connection attempt ${attempt} failed: ${error.message}`);
                await this.sleep(retryDelay * attempt);
            }
        }

        this.isInitializing = false;
        this.logger.error(`❌ Failed to connect to Kafka after ${maxRetries} attempts`);
    }

    private setupProducerEventListeners() {
        this.producer.on(this.producer.events.CONNECT, () => {
            this.isProducerConnected = true;
            this.logger.log('🔗 Kafka producer connected');
        });

        this.producer.on(this.producer.events.DISCONNECT, async () => {
            this.isProducerConnected = false;
            if (this.reconnectingProducer) return;
            this.reconnectingProducer = true;
            this.logger.warn('⚠️ Kafka producer disconnected — attempting to reconnect...');
            await this.retryReconnectProducer();
        });

        this.producer.on(this.producer.events.REQUEST_TIMEOUT, () => {
            this.logger.warn('⌛ Kafka producer request timed out');
        });
    }

    private async retryReconnectProducer() {
        for (let attempt = 1; attempt <= 10; attempt++) {
            try {
                await this.producer.connect();
                this.isProducerConnected = true;
                this.reconnectingProducer = false;
                this.logger.log('✅ Kafka producer reconnected successfully');
                return;
            } catch (err) {
                this.logger.warn(`Reconnect attempt ${attempt} failed: ${err.message}`);
                await this.sleep(3000 * attempt);
            }
        }
        this.logger.error('❌ Failed to reconnect Kafka producer after multiple attempts');
        this.reconnectingProducer = false;
    }

    async sendMessage(topic: string, message: any, partition?: number) {
        try {
            if (!this.isProducerConnected) {
                this.logger.warn('Producer disconnected — attempting reconnection before sending...');
                await this.retryReconnectProducer();
            }

            await this.createTopicIfNotExists(topic);

            const result = await this.producer.send({
                topic,
                messages: [
                    {
                        key: message.key || null,
                        value: JSON.stringify(message.value || message),
                        partition,
                    },
                ],
            });

            this.logger.log(`📤 Message sent to topic ${topic}`, result);
            return result;
        } catch (error) {
            this.logger.error(`Failed to send message to topic ${topic}:`, error);
            throw error;
        }
    }

    async subscribeToTopic(
        topic: string,
        handler: (payload: EachMessagePayload) => Promise<void>,
        fromBeginning: boolean = false,
    ) {
        try {
            await this.ensureConnection();
            await this.createTopicIfNotExists(topic);
            await this.consumer.subscribe({ topic, fromBeginning });

            await this.consumer.run({
                eachMessage: async (payload) => {
                    try {
                        await handler(payload);
                    } catch (error) {
                        this.logger.error(`Error processing message from topic ${topic}:`, error);
                    }
                },
            });

            this.logger.log(`Subscribed to topic: ${topic} (fromBeginning: ${fromBeginning})`);
        } catch (error) {
            this.logger.error(`Failed to subscribe to topic ${topic}:`, error);
            throw error;
        }
    }

    async subscribeToMessagePersistence(
        topic: string,
        handler: (payload: EachMessagePayload) => Promise<void>,
        fromBeginning: boolean = true,
    ) {
        try {
            await this.ensureConnection();
            await this.createTopicIfNotExists(topic);
            await this.messagePersistenceConsumer.subscribe({ topic, fromBeginning });

            await this.messagePersistenceConsumer.run({
                eachMessage: async (payload) => {
                    try {
                        await handler(payload);
                    } catch (error) {
                        this.logger.error(`Error processing message from topic ${topic}:`, error);
                    }
                },
            });

            this.logger.log(
                `Message persistence consumer subscribed to topic: ${topic} (fromBeginning: ${fromBeginning})`,
            );
        } catch (error) {
            this.logger.error(`Failed to subscribe message persistence consumer to topic ${topic}:`, error);
            throw error;
        }
    }

    async createTopic(topic: string, numPartitions = 1, replicationFactor = 1) {
        const admin = this.kafka.admin();
        try {
            await admin.connect();
            const topicExists = (await admin.listTopics()).includes(topic);

            if (!topicExists) {
                await admin.createTopics({
                    topics: [{ topic, numPartitions, replicationFactor }],
                });
                this.logger.log(`Topic ${topic} created successfully`);
            } else {
                this.logger.log(`Topic ${topic} already exists`);
            }
        } catch (error) {
            this.logger.error(`Failed to create topic ${topic}:`, error);
            throw error;
        } finally {
            await admin.disconnect();
        }
    }

    async createTopicIfNotExists(topic: string, numPartitions = 1, replicationFactor = 1) {
        try {
            const admin = this.kafka.admin();
            await admin.connect();

            const topics = await admin.listTopics();
            if (!topics.includes(topic)) {
                await admin.createTopics({
                    topics: [{ topic, numPartitions, replicationFactor }],
                });
                this.logger.log(`Topic ${topic} created automatically`);
            }
        } catch (error) {
            this.logger.warn(`Could not create topic ${topic} automatically:`, error.message);
        }
    }

    isConnected(): boolean {
        return !!this.kafka && !!this.producer && !!this.consumer && !!this.messagePersistenceConsumer;
    }

    async ensureConnection(): Promise<void> {
        if (!this.isConnected()) {
            this.logger.warn('Kafka not connected — reconnecting...');
            await this.connectWithRetry();
        } else {
            try {
                const admin = this.kafka.admin();
                await admin.connect();
                await admin.listTopics();
                await admin.disconnect();
            } catch (error) {
                this.logger.warn('Kafka connection appears lost — reconnecting...');
                await this.connectWithRetry();
            }
        }
    }

    private sleep(ms: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async onModuleDestroy() {
        try {
            await this.producer?.disconnect();
            await this.consumer?.disconnect();
            await this.messagePersistenceConsumer?.disconnect();
            this.logger.log('🧹 Kafka connections closed');
        } catch (error) {
            this.logger.error('Error closing Kafka connections:', error);
        }
    }
}
