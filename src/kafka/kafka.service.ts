import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Kafka, Producer, Consumer, EachMessagePayload } from 'kafkajs';

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
    private readonly logger = new Logger(KafkaService.name);
    private kafka: Kafka;
    private producer: Producer;
    private consumer: Consumer;
    private messagePersistenceConsumer: Consumer;
    private kafkaConfig: any;
    private isInitializing = false;

    constructor(private configService: ConfigService) { }

    async onModuleInit() {
        this.kafkaConfig = this.configService.get('kafka');
        await this.initializeKafkaComponents();
        await this.connectWithRetry();
    }

    private async initializeKafkaComponents(): Promise<void> {
        
        // Ensure kafkaConfig is available
        if (!this.kafkaConfig) {
            this.kafkaConfig = this.configService.get('kafka');

            if (!this.kafkaConfig) {
                throw new Error('Kafka configuration is not available. Please check your environment variables.');
            }
        }

        const kafkaOptions: any = {
            clientId: this.kafkaConfig.clientId,
            brokers: this.kafkaConfig.brokers,
            ssl: this.kafkaConfig.ssl ?? true,
            sasl: this.kafkaConfig.sasl ?? {
                mechanism: 'plain',
                username: process.env.KAFKA_SASL_USERNAME,
                password: process.env.KAFKA_SASL_PASSWORD,
            },
            retry: {
                retries: this.kafkaConfig.retries ?? 10,
            },
            connectionTimeout: this.kafkaConfig.connectionTimeout ?? 5000,
            requestTimeout: this.kafkaConfig.requestTimeout ?? 30000,
        };


        this.kafka = new Kafka(kafkaOptions);

        this.logger.log(`🔗 Connecting to Kafka: ${this.kafkaConfig.brokers.join(', ')}`);

        // Configure consumer with session timeout and heartbeat interval
        const consumerOptions = {
            groupId: this.kafkaConfig.groupId,
            sessionTimeout: this.kafkaConfig.sessionTimeout || 30000,
            heartbeatInterval: this.kafkaConfig.heartbeatInterval || 3000,
            maxWaitTimeInMs: 5000,
            retry: {
                initialRetryTime: this.kafkaConfig.retry?.initialRetryTime || 100,
                retries: this.kafkaConfig.retry?.retries || 8,
            },
        };

        this.producer = this.kafka.producer();
        this.consumer = this.kafka.consumer(consumerOptions);

        // Create a separate consumer for message persistence with its own group
        this.messagePersistenceConsumer = this.kafka.consumer({
            ...consumerOptions,
            groupId: `${this.kafkaConfig.groupId}-message-persistence`
        });
    }

    private async connectWithRetry(): Promise<void> {
        if (this.isInitializing) {
            this.logger.warn('Kafka connection already in progress, skipping duplicate initialization');
            return;
        }

        // Ensure kafkaConfig is initialized
        if (!this.kafkaConfig) {
            this.logger.warn('Kafka config not initialized, initializing now...');
            this.kafkaConfig = this.configService.get('kafka');

            // If still not available, use defaults
            if (!this.kafkaConfig) {
                this.logger.error('Kafka config not available, using defaults');
                this.kafkaConfig = {
                    maxRetries: 10,
                    retryDelay: 2000,
                    sessionTimeout: 30000,
                    heartbeatInterval: 3000,
                };
            }
        }

        // If Kafka instance or consumers are not initialized, initialize them first
        if (!this.kafka || !this.producer || !this.consumer || !this.messagePersistenceConsumer) {
            this.logger.log('Initializing Kafka components before connecting...');
            await this.initializeKafkaComponents();
        }

        this.isInitializing = true;
        const maxRetries = this.kafkaConfig?.maxRetries || 10;
        const retryDelay = this.kafkaConfig?.retryDelay || 2000;

        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                // Disconnect producer first if already connected (safe to call even if not connected)
                try {
                    await this.producer?.disconnect();
                } catch (disconnectError) {
                    // Ignore disconnect errors
                }

                // Connect producer first
                await this.producer.connect();
                this.logger.log('Kafka producer connected successfully');

                // Connect consumers with retry logic for group coordinator errors
                await this.connectConsumerWithRetry(this.consumer, 'main consumer', attempt);
                await this.connectConsumerWithRetry(this.messagePersistenceConsumer, 'message persistence consumer', attempt);

                this.logger.log('Kafka producer and consumers connected successfully');
                this.isInitializing = false;
                return;
            } catch (error) {
                const errorMessage = error?.message || String(error);
                const isGroupCoordinatorError =
                    errorMessage.includes('group coordinator') ||
                    errorMessage.includes('GroupCoordinator') ||
                    errorMessage.includes('COORDINATOR_NOT_AVAILABLE') ||
                    errorMessage.includes('NOT_COORDINATOR') ||
                    errorMessage.includes('The group coordinator is not available');

                if (isGroupCoordinatorError && attempt < maxRetries) {
                    const delay = retryDelay * attempt; // Exponential backoff
                    this.logger.warn(
                        `Group coordinator not available (attempt ${attempt}/${maxRetries}). ` +
                        `Retrying in ${delay}ms...`
                    );
                    await this.sleep(delay);
                    continue;
                }

                if (attempt === maxRetries) {
                    this.logger.error(`Failed to connect to Kafka after ${maxRetries} attempts:`, error);
                    this.logger.warn('Kafka connection failed, will retry on next message send');
                } else {
                    this.logger.warn(`Kafka connection attempt ${attempt} failed:`, errorMessage);
                    await this.sleep(retryDelay);
                }
            }
        }

        this.isInitializing = false;
    }

    private async connectConsumerWithRetry(consumer: Consumer, consumerName: string, attempt: number): Promise<void> {
        const maxRetries = 5;
        const baseDelay = 1000;

        for (let retry = 1; retry <= maxRetries; retry++) {
            try {
                // Try to disconnect first if already connected (safe to call even if not connected)
                try {
                    await consumer.disconnect();
                } catch (disconnectError) {
                    // Ignore disconnect errors (consumer might not be connected)
                }

                await consumer.connect();
                this.logger.log(`Kafka ${consumerName} connected successfully`);
                return;
            } catch (error) {
                const errorMessage = error?.message || String(error);
                const isGroupCoordinatorError =
                    errorMessage.includes('group coordinator') ||
                    errorMessage.includes('GroupCoordinator') ||
                    errorMessage.includes('COORDINATOR_NOT_AVAILABLE') ||
                    errorMessage.includes('NOT_COORDINATOR') ||
                    errorMessage.includes('The group coordinator is not available');

                // Check if already connected (this is sometimes OK)
                if (errorMessage.includes('already connected') || errorMessage.includes('Already connected')) {
                    this.logger.log(`Kafka ${consumerName} already connected`);
                    return;
                }

                if (isGroupCoordinatorError && retry < maxRetries) {
                    const delay = baseDelay * retry;
                    this.logger.warn(
                        `${consumerName}: Group coordinator not available (retry ${retry}/${maxRetries}). ` +
                        `Waiting ${delay}ms before retry...`
                    );
                    await this.sleep(delay);
                    continue;
                }

                if (retry === maxRetries) {
                    throw new Error(`${consumerName} connection failed after ${maxRetries} retries: ${errorMessage}`);
                }

                await this.sleep(baseDelay);
            }
        }
    }

    private sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async onModuleDestroy() {
        try {
            await this.producer?.disconnect();
            await this.consumer?.disconnect();
            await this.messagePersistenceConsumer?.disconnect();
            this.logger.log('Kafka connections closed');
        } catch (error) {
            this.logger.error('Error closing Kafka connections:', error);
        }
    }

    async sendMessage(topic: string, message: any, partition?: number) {
        try {
            // Ensure producer is connected
            await this.ensureConnection();

            if (!this.producer) {
                throw new Error('Kafka producer is not initialized. Make sure Kafka service is connected.');
            }

            // Create topic if it doesn't exist
            await this.createTopicIfNotExists(topic);

            const result = await this.producer.send({
                topic,
                messages: [{
                    key: message.key || null,
                    value: JSON.stringify(message.value || message),
                    partition,
                }],
            });

            this.logger.log(`Message sent to topic ${topic}:`, result);
            return result;
        } catch (error) {
            this.logger.error(`Failed to send message to topic ${topic}:`, error);
            throw error;
        }
    }

    async subscribeToTopic(topic: string, handler: (payload: EachMessagePayload) => Promise<void>, fromBeginning: boolean = false) {
        try {
            // Ensure consumer is connected before subscribing
            await this.ensureConnection();

            if (!this.consumer) {
                throw new Error('Kafka consumer is not initialized. Make sure Kafka service is connected.');
            }

            // Create topic if it doesn't exist
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

    async subscribeToMessagePersistence(topic: string, handler: (payload: EachMessagePayload) => Promise<void>, fromBeginning: boolean = true) {
        try {
            // Ensure consumer is connected before subscribing
            await this.ensureConnection();

            if (!this.messagePersistenceConsumer) {
                throw new Error('Kafka message persistence consumer is not initialized. Make sure Kafka service is connected.');
            }

            // Create topic if it doesn't exist
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

            this.logger.log(`Message persistence consumer subscribed to topic: ${topic} (fromBeginning: ${fromBeginning})`);
        } catch (error) {
            this.logger.error(`Failed to subscribe message persistence consumer to topic ${topic}:`, error);
            throw error;
        }
    }

    async createTopic(topic: string, numPartitions: number = 1, replicationFactor: number = 1) {
        const admin = this.kafka.admin();
        try {
            await admin.connect();

            const topicExists = await admin.listTopics().then(topics => topics.includes(topic));

            if (!topicExists) {
                await admin.createTopics({
                    topics: [{
                        topic,
                        numPartitions,
                        replicationFactor,
                    }],
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

    async createTopicIfNotExists(topic: string, numPartitions: number = 1, replicationFactor: number = 1) {
        try {
            const admin = this.kafka.admin();
            await admin.connect();

            const topics = await admin.listTopics();

            if (!topics.includes(topic)) {
                await admin.createTopics({
                    topics: [{
                        topic,
                        numPartitions,
                        replicationFactor,
                    }],
                });
                this.logger.log(`Topic ${topic} created automatically`);
            }
        } catch (error) {
            this.logger.warn(`Could not create topic ${topic} automatically:`, error.message);
            // Don't throw error, just log warning
        }
    }

    getProducer(): Producer {
        return this.producer;
    }

    getConsumer(): Consumer {
        return this.consumer;
    }

    isConnected(): boolean {
        // Check if all components are initialized
        if (!this.producer || !this.consumer || !this.messagePersistenceConsumer || !this.kafka) {
            return false;
        }

        // Note: KafkaJS doesn't expose connection state directly, so we check if initialized
        // The actual connection state is managed internally by KafkaJS
        return true;
    }

    async ensureConnection(): Promise<void> {
        if (!this.isConnected()) {
            this.logger.log('Reconnecting to Kafka...');
            await this.connectWithRetry();
        } else {
            // Verify connections are actually working by checking if we can reconnect if needed
            try {
                // Quick check: try to get metadata (lightweight operation)
                const admin = this.kafka.admin();
                await admin.connect();
                await admin.listTopics();
                await admin.disconnect();
            } catch (error) {
                this.logger.warn('Kafka connection appears to be lost, reconnecting...');
                await this.connectWithRetry();
            }
        }
    }
}
