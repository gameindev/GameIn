/**
 * Example: How to integrate notifications in other services
 * 
 * This file shows examples of how to use the notification system
 * from other services in your application.
 */

import { Injectable } from '@nestjs/common';
import { NotificationEventsService } from '../providers/notification-events.service';
import { NotificationType } from '../enums/notification-type.enum';
import { NotificationChannel } from '../enums/notification-channel.enum';

/**
 * Example: Chat Service Integration
 */
@Injectable()
export class ChatServiceExample {
    constructor(
        private readonly notificationEvents: NotificationEventsService,
    ) {}

    async sendMessage(conversationId: number, senderId: number, receiverId: number, content: string) {
        // ... your message sending logic ...

        // Notify receiver about new message
        await this.notificationEvents.notifyNewMessage(
            receiverId,
            conversationId,
            'Sender Name', // Get from user service
            content.substring(0, 50), // Preview
        );
    }
}

/**
 * Example: Offer Service Integration
 */
@Injectable()
export class OfferServiceExample {
    constructor(
        private readonly notificationEvents: NotificationEventsService,
    ) {}

    async createOffer(offeringId: number, creatorId: number, amount: number) {
        // ... your offer creation logic ...

        // Notify creator about new offer
        await this.notificationEvents.notifyOfferReceived(
            creatorId,
            offeringId,
            amount,
        );
    }

    async acceptOffer(offerId: number, brandId: number, creatorId: number) {
        // ... your offer acceptance logic ...

        // Notify both parties
        await this.notificationEvents.publishNotification({
            userId: brandId,
            type: NotificationType.OFFER_ACCEPTED,
            channels: [NotificationChannel.IN_APP, NotificationChannel.EMAIL],
            title: 'Offer Accepted',
            message: `Your offer has been accepted by the creator`,
            data: { offerId, creatorId },
            metadata: { email: 'brand@example.com' },
        });

        await this.notificationEvents.publishNotification({
            userId: creatorId,
            type: NotificationType.OFFER_ACCEPTED,
            channels: [NotificationChannel.IN_APP],
            title: 'Offer Accepted',
            message: `You have accepted the offer`,
            data: { offerId, brandId },
        });
    }
}

/**
 * Example: Payment Service Integration
 */
@Injectable()
export class PaymentServiceExample {
    constructor(
        private readonly notificationEvents: NotificationEventsService,
    ) {}

    async processPayment(orderId: number, userId: number, amount: number) {
        // ... your payment processing logic ...

        // Notify user about payment
        await this.notificationEvents.notifyPaymentReceived(
            userId,
            amount,
            orderId,
        );
    }
}

/**
 * Example: User Service Integration
 */
@Injectable()
export class UserServiceExample {
    constructor(
        private readonly notificationEvents: NotificationEventsService,
    ) {}

    async createUser(userData: any) {
        // ... your user creation logic ...

        // Send welcome notification
        await this.notificationEvents.publishNotification({
            userId: userData.id,
            type: NotificationType.USER_WELCOME,
            channels: [NotificationChannel.IN_APP, NotificationChannel.EMAIL],
            title: 'Welcome to GameIn!',
            message: 'Thank you for joining us. Get started by creating your profile.',
            data: { userId: userData.id },
            metadata: { email: userData.email },
        });
    }

    async verifyUser(userId: number, email: string) {
        // ... your verification logic ...

        // Send verification confirmation
        await this.notificationEvents.publishNotification({
            userId,
            type: NotificationType.USER_VERIFIED,
            channels: [NotificationChannel.EMAIL],
            title: 'Account Verified',
            message: 'Your account has been successfully verified.',
            metadata: { email },
        });
    }
}

/**
 * Example: Order Service Integration
 */
@Injectable()
export class OrderServiceExample {
    constructor(
        private readonly notificationEvents: NotificationEventsService,
    ) {}

    async completeOrder(orderId: number, userId: number) {
        // ... your order completion logic ...

        // Notify user
        await this.notificationEvents.publishNotification({
            userId,
            type: NotificationType.ORDER_COMPLETED,
            channels: [NotificationChannel.IN_APP, NotificationChannel.EMAIL],
            title: 'Order Completed',
            message: `Your order #${orderId} has been completed successfully.`,
            data: { orderId },
            priority: 'high',
        });
    }
}

