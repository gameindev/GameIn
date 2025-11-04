import { Injectable, Logger } from '@nestjs/common';
import { KafkaService } from '../kafka.service';
import { EachMessagePayload } from 'kafkajs';

export interface UserCreatedEvent {
    userId: string;
    email: string;
    username: string;
    createdAt: string;
}

export interface UserUpdatedEvent {
    userId: string;
    updatedFields: string[];
    updatedAt: string;
}

@Injectable()
export class UserEventsService {
    private readonly logger = new Logger(UserEventsService.name);

    constructor(private readonly kafkaService: KafkaService) { }

    async publishUserCreated(userData: UserCreatedEvent) {
        try {
            await this.kafkaService.sendMessage('user.created', {
                key: userData.userId,
                value: userData,
            });

            this.logger.log(`User created event published for user ${userData.userId}`);
        } catch (error) {
            this.logger.error('Failed to publish user created event:', error);
            throw error;
        }
    }

    async publishUserUpdated(userData: UserUpdatedEvent) {
        try {
            await this.kafkaService.sendMessage('user.updated', {
                key: userData.userId,
                value: userData,
            });

            this.logger.log(`User updated event published for user ${userData.userId}`);
        } catch (error) {
            this.logger.error('Failed to publish user updated event:', error);
            throw error;
        }
    }

    async subscribeToUserEvents() {
        try {
            // Subscribe to user events
            await this.kafkaService.subscribeToTopic('user.created', this.handleUserCreated.bind(this));
            await this.kafkaService.subscribeToTopic('user.updated', this.handleUserUpdated.bind(this));

            this.logger.log('Subscribed to user events');
        } catch (error) {
            this.logger.error('Failed to subscribe to user events:', error);
            throw error;
        }
    }

    private async handleUserCreated(payload: EachMessagePayload) {
        try {
            const message = JSON.parse(payload.message.value.toString());
            this.logger.log('Processing user created event:', message);

            // Add your business logic here
            // For example: send welcome email, create user profile, etc.

        } catch (error) {
            this.logger.error('Error handling user created event:', error);
        }
    }

    private async handleUserUpdated(payload: EachMessagePayload) {
        try {
            const message = JSON.parse(payload.message.value.toString());
            this.logger.log('Processing user updated event:', message);

            // Add your business logic here
            // For example: update search index, send notification, etc.

        } catch (error) {
            this.logger.error('Error handling user updated event:', error);
        }
    }
}
