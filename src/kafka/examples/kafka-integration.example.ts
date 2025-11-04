import { Injectable, Logger } from '@nestjs/common';
import { UserEventsService } from '../events/user-events.service';

/**
 * Example service showing how to integrate Kafka events with your existing services
 * This is just an example - you would integrate this pattern into your actual services
 */
@Injectable()
export class KafkaIntegrationExample {
    private readonly logger = new Logger(KafkaIntegrationExample.name);

    constructor(private readonly userEventsService: UserEventsService) { }

    /**
     * Example: How to publish events when a user is created
     * You would call this from your actual user creation logic
     */
    async handleUserCreated(userData: {
        id: string;
        email: string;
        username: string;
        createdAt: Date;
    }) {
        try {
            // Your existing business logic here
            this.logger.log(`Creating user: ${userData.username}`);

            // Publish Kafka event
            await this.userEventsService.publishUserCreated({
                userId: userData.id,
                email: userData.email,
                username: userData.username,
                createdAt: userData.createdAt.toISOString(),
            });

            this.logger.log(`User created and event published: ${userData.id}`);
        } catch (error) {
            this.logger.error('Failed to handle user creation:', error);
            throw error;
        }
    }

    /**
     * Example: How to publish events when a user is updated
     * You would call this from your actual user update logic
     */
    async handleUserUpdated(userId: string, updatedFields: string[]) {
        try {
            // Your existing business logic here
            this.logger.log(`Updating user: ${userId}`);

            // Publish Kafka event
            await this.userEventsService.publishUserUpdated({
                userId,
                updatedFields,
                updatedAt: new Date().toISOString(),
            });

            this.logger.log(`User updated and event published: ${userId}`);
        } catch (error) {
            this.logger.error('Failed to handle user update:', error);
            throw error;
        }
    }

    /**
     * Example: How to subscribe to events when your service starts
     * You would call this in your service's onModuleInit method
     */
    async initializeEventSubscriptions() {
        try {
            await this.userEventsService.subscribeToUserEvents();
            this.logger.log('Event subscriptions initialized');
        } catch (error) {
            this.logger.error('Failed to initialize event subscriptions:', error);
            throw error;
        }
    }
}
