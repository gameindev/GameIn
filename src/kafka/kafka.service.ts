import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Kafka, Producer, Consumer, EachMessagePayload } from 'kafkajs';

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
    subscribe(arg0: string, arg1: (message: any) => Promise<void>) {
        throw new Error('Method not implemented.');
    }
    private readonly logger = new Logger(KafkaService.name);
    private kafka: Kafka;
    private producer: Producer;
    private consumer: Consumer;
    private messagePersistenceConsumer: Consumer;

    constructor(private configService: ConfigService) { }

    async onModuleInit() {
        const kafkaConfig = this.configService.get('kafka');

        this.kafka = new Kafka({
            clientId: kafkaConfig.clientId,
            brokers: kafkaConfig.brokers,
            retry: kafkaConfig.retry,
            connectionTimeout: kafkaConfig.connectionTimeout,
            requestTimeout: kafkaConfig.requestTimeout,
        });

        this.producer = this.kafka.producer();
        this.consumer = this.kafka.consumer({
            groupId: kafkaConfig.groupId
        });

        // Create a separate consumer for message persistence with its own group
        this.messagePersistenceConsumer = this.kafka.consumer({
            groupId: `${kafkaConfig.groupId}-message-persistence`
        });

        try {
            await this.producer.connect();
            await this.consumer.connect();
            await this.messagePersistenceConsumer.connect();
            this.logger.log('Kafka producer and consumers connected successfully');
        } catch (error) {
            this.logger.error('Failed to connect to Kafka:', error);
            // Don't throw error to prevent app crash, just log it
            this.logger.warn('Kafka connection failed, will retry on next message send');
        }
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
        return !!(this.producer && this.consumer && this.messagePersistenceConsumer && this.kafka);
    }

    async ensureConnection(): Promise<void> {
        if (!this.isConnected()) {
            this.logger.log('Reconnecting to Kafka...');
            await this.onModuleInit();
        }
    }
}
