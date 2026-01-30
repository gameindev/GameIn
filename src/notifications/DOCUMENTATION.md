# Notification Service - Complete Documentation

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Installation & Setup](#installation--setup)
4. [Configuration](#configuration)
5. [API Reference](#api-reference)
6. [Usage Guide](#usage-guide)
7. [Integration Examples](#integration-examples)
8. [Channel Providers](#channel-providers)
9. [User Preferences](#user-preferences)
10. [Real-Time Delivery](#real-time-delivery)
11. [Error Handling & Retries](#error-handling--retries)
12. [Testing](#testing)
13. [Monitoring & Observability](#monitoring--observability)
14. [Troubleshooting](#troubleshooting)
15. [Best Practices](#best-practices)
16. [Advanced Features](#advanced-features)
17. [FAQ](#faq)

---

## Overview

The Notification Service is a **scalable, loosely coupled, event-driven microservice** designed to handle multi-channel notifications (in-app, email, SMS, push) for the GameIn platform. It uses Kafka for asynchronous message processing, ensuring high performance and reliability.

### Key Features

- ✅ **Multi-Channel Support**: In-app, Email, SMS, Push notifications
- ✅ **Event-Driven Architecture**: Kafka-based async processing
- ✅ **Loose Coupling**: Services communicate via events, not direct dependencies
- ✅ **User Preferences**: Granular control over notification settings
- ✅ **Real-Time Delivery**: Instant in-app notifications via Redis/WebSocket
- ✅ **Scalable**: Handles high volumes through Kafka queuing
- ✅ **Reliable**: Retry logic and error tracking
- ✅ **Extensible**: Easy to add new channels or notification types

### Use Cases

- User activity notifications (new messages, offers, orders)
- System announcements and maintenance notices
- Transaction confirmations (payments, invoices)
- Social interactions (follows, profile views)
- Team collaboration (invites, member updates)

---

## Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Application Services                       │
│  (Chat, Orders, Payments, Users, etc.)                        │
└──────────────────────┬───────────────────────────────────────┘
                       │
                       │ NotificationEventsService.publishNotification()
                       │ (Loosely Coupled - No Direct Dependency)
                       ▼
┌─────────────────────────────────────────────────────────────┐
│              Kafka Topic: notifications.send                 │
│  - Partitioned by userId for ordering                       │
│  - High throughput, persistent storage                       │
└──────────────────────┬───────────────────────────────────────┘
                       │
                       │ Consumer Group: notification-consumer
                       ▼
┌─────────────────────────────────────────────────────────────┐
│         NotificationConsumerService (Kafka Consumer)         │
│  - Listens to notifications.send topic                      │
│  - Validates and processes events asynchronously             │
│  - Handles retries and error recovery                        │
└──────────────────────┬───────────────────────────────────────┘
                       │
                       │ NotificationService.sendNotification()
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                  NotificationService                          │
│  - Checks user preferences                                   │
│  - Routes to channel providers                               │
│  - Tracks notification status                                │
│  - Manages preferences CRUD                                  │
└──────────────────────┬───────────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┬──────────────┐
        │              │              │              │
        ▼              ▼              ▼              ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ In-App       │ │ Email        │ │ SMS          │ │ Push         │
│ Provider     │ │ Provider     │ │ Provider     │ │ Provider     │
└──────┬───────┘ └──────┬───────┘ └──────┬───────┘ └──────┬───────┘
       │                │                 │                 │
       ▼                ▼                 ▼                 ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ Redis        │ │ Email        │ │ SMS          │ │ Push         │
│ Pub/Sub      │ │ Service       │ │ Provider     │ │ Provider     │
│ WebSocket    │ │ (SMTP/SES)    │ │ (Twilio)     │ │ (FCM/APNs)   │
└──────┬───────┘ └──────┬───────┘ └──────┬───────┘ └──────┬───────┘
       │                │                 │                 │
       └────────────────┴─────────────────┴─────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│              PostgreSQL Database                             │
│  - notifications (history, status tracking)                 │
│  - notification_preferences (user settings)                 │
└─────────────────────────────────────────────────────────────┘
```

### Component Details

#### 1. NotificationEventsService
- **Role**: Event Publisher
- **Pattern**: Publisher-Subscriber
- **Technology**: Kafka Producer
- **Purpose**: Allows other services to publish notification events without direct coupling

#### 2. NotificationConsumerService
- **Role**: Event Consumer
- **Pattern**: Message Queue Consumer
- **Technology**: Kafka Consumer
- **Purpose**: Processes notification events asynchronously from Kafka

#### 3. NotificationService
- **Role**: Business Logic Orchestrator
- **Pattern**: Service Layer
- **Purpose**: Core notification routing, preference management, status tracking

#### 4. Channel Providers
- **Role**: Delivery Handlers
- **Pattern**: Strategy Pattern
- **Purpose**: Handle delivery for specific channels (In-App, Email, SMS, Push)

#### 5. NotificationChannelFactory
- **Role**: Provider Factory
- **Pattern**: Factory Pattern
- **Purpose**: Returns appropriate channel provider instance

---

## Installation & Setup

### Prerequisites

- Node.js 18+
- PostgreSQL 12+
- Kafka (local or remote)
- Redis (for in-app notifications)
- Email service configured (SMTP/SES/SendGrid)

### Step 1: Database Migration

Run the migration to create notification tables:

```bash
npm run migration:run
```

This creates:
- `notifications` table
- `notification_preferences` table
- Required enums and indexes

### Step 2: Environment Variables

Add to your `.env` file:

```env
# Kafka Configuration (Required)
KAFKA_CLIENT_ID=gamein-backend
KAFKA_BROKERS=localhost:9092
KAFKA_GROUP_ID=gamein-group

# SMS Configuration (Optional)
SMS_ENABLED=false
SMS_PROVIDER=none  # twilio, aws-sns, messagebird

# Push Configuration (Optional)
PUSH_ENABLED=false
PUSH_PROVIDER=none  # fcm, apns, onesignal

# Email Configuration (Already configured in EmailsModule)
# SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD
# or SENDGRID_API_KEY, or AWS SES credentials
```

### Step 3: Module Import

The `NotificationsModule` is already imported in `app.module.ts`. Verify it's included:

```typescript
import { NotificationsModule } from './notifications/notifications.module';

@Module({
    imports: [
        // ... other modules
        NotificationsModule,
    ],
})
export class AppModule {}
```

### Step 4: Verify Kafka Connection

Check that Kafka is running and accessible:

```bash
# Check Kafka health
curl http://localhost:3000/kafka/health
```

### Step 5: Test Notification

Send a test notification via API:

```bash
curl -X POST http://localhost:3000/notifications/send \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "userId": 1,
    "type": "CUSTOM",
    "channels": ["IN_APP"],
    "title": "Test Notification",
    "message": "This is a test notification"
  }'
```

---

## Configuration

### Notification Types

Available notification types (extend as needed):

```typescript
enum NotificationType {
    // User Events
    USER_WELCOME = 'USER_WELCOME',
    USER_VERIFIED = 'USER_VERIFIED',
    PASSWORD_RESET = 'PASSWORD_RESET',
    
    // Chat Events
    NEW_MESSAGE = 'NEW_MESSAGE',
    MESSAGE_READ = 'MESSAGE_READ',
    CONVERSATION_INVITE = 'CONVERSATION_INVITE',
    
    // Offer/Order Events
    OFFER_RECEIVED = 'OFFER_RECEIVED',
    OFFER_ACCEPTED = 'OFFER_ACCEPTED',
    OFFER_REJECTED = 'OFFER_REJECTED',
    ORDER_CREATED = 'ORDER_CREATED',
    ORDER_COMPLETED = 'ORDER_COMPLETED',
    ORDER_CANCELLED = 'ORDER_CANCELLED',
    
    // Payment Events
    PAYMENT_RECEIVED = 'PAYMENT_RECEIVED',
    PAYMENT_FAILED = 'PAYMENT_FAILED',
    INVOICE_GENERATED = 'INVOICE_GENERATED',
    
    // Social Events
    NEW_FOLLOWER = 'NEW_FOLLOWER',
    PROFILE_VIEW = 'PROFILE_VIEW',
    
    // Team Events
    TEAM_INVITE = 'TEAM_INVITE',
    TEAM_MEMBER_ADDED = 'TEAM_MEMBER_ADDED',
    
    // System Events
    SYSTEM_ANNOUNCEMENT = 'SYSTEM_ANNOUNCEMENT',
    MAINTENANCE_NOTICE = 'MAINTENANCE_NOTICE',
    
    // Custom
    CUSTOM = 'CUSTOM',
}
```

### Notification Channels

```typescript
enum NotificationChannel {
    IN_APP = 'IN_APP',  // Real-time in-app notifications
    EMAIL = 'EMAIL',     // Email notifications
    SMS = 'SMS',         // SMS notifications
    PUSH = 'PUSH',       // Push notifications
}
```

### Notification Status

```typescript
enum NotificationStatus {
    PENDING = 'PENDING',     // Queued, not yet sent
    SENT = 'SENT',           // Successfully sent to provider
    DELIVERED = 'DELIVERED', // Confirmed delivery (email opened, etc.)
    READ = 'READ',           // User has read the notification
    FAILED = 'FAILED',       // Failed to send
}
```

---

## API Reference

### REST API Endpoints

All endpoints require authentication via `AccessTokenGuard`.

#### Base URL
```
http://localhost:3000/notifications
```

#### 1. Get User Notifications

**GET** `/notifications`

Retrieve notifications for the authenticated user.

**Query Parameters:**
- `limit` (number, optional): Number of notifications to return (default: 50)
- `offset` (number, optional): Pagination offset (default: 0)
- `unreadOnly` (boolean, optional): Filter only unread notifications (default: false)

**Response:**
```json
{
    "success": true,
    "data": [
        {
            "id": 1,
            "user_id": 123,
            "type": "NEW_MESSAGE",
            "channel": "IN_APP",
            "status": "SENT",
            "title": "New Message",
            "message": "You have a new message from John",
            "data": {
                "conversationId": 456,
                "senderName": "John"
            },
            "read_at": null,
            "created_at": "2024-01-15T10:30:00Z"
        }
    ],
    "total": 25
}
```

**Example:**
```bash
curl -X GET "http://localhost:3000/notifications?limit=20&offset=0&unreadOnly=true" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### 2. Get Notification Preferences

**GET** `/notifications/preferences`

Get all notification preferences for the authenticated user.

**Response:**
```json
{
    "success": true,
    "data": [
        {
            "id": 1,
            "user_id": 123,
            "type": "NEW_MESSAGE",
            "channel": "EMAIL",
            "enabled": false,
            "created_at": "2024-01-15T10:00:00Z",
            "updated_at": "2024-01-15T10:00:00Z"
        }
    ]
}
```

#### 3. Update Notification Preference

**PUT** `/notifications/preferences`

Update a specific notification preference.

**Request Body:**
```json
{
    "type": "NEW_MESSAGE",
    "channel": "EMAIL",
    "enabled": false
}
```

**Response:**
```json
{
    "success": true,
    "data": {
        "id": 1,
        "user_id": 123,
        "type": "NEW_MESSAGE",
        "channel": "EMAIL",
        "enabled": false,
        "updated_at": "2024-01-15T10:30:00Z"
    }
}
```

#### 4. Mark Notification as Read

**PUT** `/notifications/:id/read`

Mark a specific notification as read.

**Path Parameters:**
- `id` (number): Notification ID

**Response:**
```json
{
    "success": true,
    "data": {
        "id": 1,
        "read_at": "2024-01-15T10:35:00Z",
        "status": "READ"
    }
}
```

#### 5. Mark All Notifications as Read

**PUT** `/notifications/read-all`

Mark all unread notifications for the user as read.

**Response:**
```json
{
    "success": true,
    "data": {
        "count": 5
    }
}
```

#### 6. Delete Notification

**DELETE** `/notifications/:id`

Delete a specific notification.

**Path Parameters:**
- `id` (number): Notification ID

**Response:**
```json
{
    "success": true,
    "message": "Notification deleted"
}
```

#### 7. Send Notification (Admin/Testing)

**POST** `/notifications/send`

Send a notification directly (for testing or admin use).

**Request Body:**
```json
{
    "userId": 123,
    "type": "CUSTOM",
    "channels": ["IN_APP", "EMAIL"],
    "title": "Test Notification",
    "message": "This is a test",
    "data": {
        "customField": "value"
    },
    "metadata": {
        "email": "user@example.com"
    },
    "priority": "normal",
    "delaySeconds": 0
}
```

**Response:**
```json
{
    "success": true,
    "data": [
        {
            "channel": "IN_APP",
            "success": true,
            "externalId": "1"
        },
        {
            "channel": "EMAIL",
            "success": true,
            "externalId": "msg-123456"
        }
    ]
}
```

---

## Usage Guide

### Method 1: Event-Driven (Recommended)

Use `NotificationEventsService` to publish events to Kafka. This is the **recommended approach** for production as it's:
- Loosely coupled
- Non-blocking
- Scalable
- Resilient to failures

#### Step 1: Inject Service

```typescript
import { Injectable } from '@nestjs/common';
import { NotificationEventsService } from '../notifications/providers/notification-events.service';
import { NotificationType } from '../notifications/enums/notification-type.enum';
import { NotificationChannel } from '../notifications/enums/notification-channel.enum';

@Injectable()
export class YourService {
    constructor(
        private readonly notificationEvents: NotificationEventsService,
    ) {}
}
```

#### Step 2: Publish Notification Event

```typescript
async someAction() {
    // Your business logic here
    
    // Publish notification event (async, non-blocking)
    await this.notificationEvents.publishNotification({
        userId: 123,
        type: NotificationType.NEW_MESSAGE,
        channels: [NotificationChannel.IN_APP, NotificationChannel.EMAIL],
        title: 'New Message',
        message: 'You have a new message from John',
        data: {
            conversationId: 456,
            senderId: 789,
            senderName: 'John'
        },
        metadata: {
            email: 'user@example.com',  // Required for email channel
            phoneNumber: '+1234567890', // Required for SMS channel
            deviceTokens: ['token1', 'token2'], // Required for push channel
        },
        priority: 'high',
        delaySeconds: 0,  // Optional: delay sending by X seconds
    });
}
```

#### Step 3: Use Convenience Methods

```typescript
// New message notification
await this.notificationEvents.notifyNewMessage(
    userId,
    conversationId,
    'John Doe',
    'Hey, check this out!'
);

// Offer received notification
await this.notificationEvents.notifyOfferReceived(
    userId,
    offerId,
    500
);

// Payment received notification
await this.notificationEvents.notifyPaymentReceived(
    userId,
    1000,
    orderId
);
```

### Method 2: Direct Service Call (Synchronous)

Use `NotificationService` for synchronous, immediate delivery. Use this when:
- You need immediate feedback
- Testing
- Admin operations

```typescript
import { Injectable } from '@nestjs/common';
import { NotificationService } from '../notifications/providers/notification.service';
import { NotificationType } from '../notifications/enums/notification-type.enum';
import { NotificationChannel } from '../notifications/enums/notification-channel.enum';

@Injectable()
export class YourService {
    constructor(
        private readonly notificationService: NotificationService,
    ) {}

    async someAction() {
        // Send notification directly (synchronous)
        const result = await this.notificationService.sendNotification({
            userId: 123,
            type: NotificationType.ORDER_COMPLETED,
            channels: [NotificationChannel.IN_APP],
            title: 'Order Completed',
            message: 'Your order has been completed',
            data: { orderId: 789 },
        });

        console.log('Notification sent:', result.success);
    }
}
```

---

## Integration Examples

### Example 1: Chat Service Integration

```typescript
import { Injectable } from '@nestjs/common';
import { NotificationEventsService } from '../notifications/providers/notification-events.service';
import { NotificationType } from '../notifications/enums/notification-type.enum';
import { NotificationChannel } from '../notifications/enums/notification-channel.enum';

@Injectable()
export class ChatService {
    constructor(
        private readonly notificationEvents: NotificationEventsService,
        // ... other dependencies
    ) {}

    async sendMessage(conversationId: number, senderId: number, content: string) {
        // 1. Save message to database
        const message = await this.saveMessage(conversationId, senderId, content);
        
        // 2. Get conversation participants (excluding sender)
        const participants = await this.getConversationParticipants(conversationId);
        const recipients = participants.filter(p => p.userId !== senderId);
        
        // 3. Get sender info
        const sender = await this.getUser(senderId);
        
        // 4. Notify each recipient
        for (const recipient of recipients) {
            await this.notificationEvents.publishNotification({
                userId: recipient.userId,
                type: NotificationType.NEW_MESSAGE,
                channels: [
                    NotificationChannel.IN_APP,
                    NotificationChannel.EMAIL,  // Only if user is offline
                    NotificationChannel.PUSH,   // Only if user is offline
                ],
                title: 'New Message',
                message: `${sender.username}: ${content.substring(0, 50)}${content.length > 50 ? '...' : ''}`,
                data: {
                    conversationId,
                    messageId: message.id,
                    senderId,
                    senderName: sender.username,
                },
                metadata: {
                    email: recipient.email,
                    deviceTokens: recipient.deviceTokens || [],
                },
                priority: 'high',
            });
        }
        
        return message;
    }
}
```

### Example 2: Order Service Integration

```typescript
import { Injectable } from '@nestjs/common';
import { NotificationEventsService } from '../notifications/providers/notification-events.service';
import { NotificationType } from '../notifications/enums/notification-type.enum';
import { NotificationChannel } from '../notifications/enums/notification-channel.enum';

@Injectable()
export class OrderService {
    constructor(
        private readonly notificationEvents: NotificationEventsService,
    ) {}

    async createOrder(userId: number, orderData: any) {
        // Create order
        const order = await this.saveOrder(userId, orderData);
        
        // Notify user
        await this.notificationEvents.publishNotification({
            userId,
            type: NotificationType.ORDER_CREATED,
            channels: [NotificationChannel.IN_APP, NotificationChannel.EMAIL],
            title: 'Order Created',
            message: `Your order #${order.id} has been created successfully`,
            data: {
                orderId: order.id,
                amount: order.total,
                items: order.items,
            },
            metadata: {
                email: order.user.email,
            },
        });
        
        return order;
    }

    async completeOrder(orderId: number) {
        const order = await this.getOrder(orderId);
        
        // Update order status
        order.status = 'COMPLETED';
        await this.saveOrder(order);
        
        // Notify user
        await this.notificationEvents.publishNotification({
            userId: order.userId,
            type: NotificationType.ORDER_COMPLETED,
            channels: [NotificationChannel.IN_APP, NotificationChannel.EMAIL],
            title: 'Order Completed',
            message: `Your order #${order.id} has been completed`,
            data: {
                orderId: order.id,
            },
            metadata: {
                email: order.user.email,
            },
            priority: 'high',
        });
    }
}
```

### Example 3: Payment Service Integration

```typescript
import { Injectable } from '@nestjs/common';
import { NotificationEventsService } from '../notifications/providers/notification-events.service';

@Injectable()
export class PaymentService {
    constructor(
        private readonly notificationEvents: NotificationEventsService,
    ) {}

    async processPayment(paymentData: any) {
        // Process payment
        const payment = await this.chargePayment(paymentData);
        
        if (payment.success) {
            // Notify success
            await this.notificationEvents.notifyPaymentReceived(
                payment.userId,
                payment.amount,
                payment.orderId
            );
        } else {
            // Notify failure
            await this.notificationEvents.publishNotification({
                userId: payment.userId,
                type: NotificationType.PAYMENT_FAILED,
                channels: [NotificationChannel.IN_APP, NotificationChannel.EMAIL],
                title: 'Payment Failed',
                message: `Your payment of $${payment.amount} failed. Please try again.`,
                data: {
                    paymentId: payment.id,
                    orderId: payment.orderId,
                    error: payment.error,
                },
                metadata: {
                    email: payment.user.email,
                },
                priority: 'high',
            });
        }
        
        return payment;
    }
}
```

### Example 4: User Service Integration

```typescript
import { Injectable } from '@nestjs/common';
import { NotificationEventsService } from '../notifications/providers/notification-events.service';
import { NotificationType } from '../notifications/enums/notification-type.enum';
import { NotificationChannel } from '../notifications/enums/notification-channel.enum';

@Injectable()
export class UserService {
    constructor(
        private readonly notificationEvents: NotificationEventsService,
    ) {}

    async createUser(userData: any) {
        // Create user
        const user = await this.saveUser(userData);
        
        // Send welcome notification
        await this.notificationEvents.publishNotification({
            userId: user.id,
            type: NotificationType.USER_WELCOME,
            channels: [NotificationChannel.IN_APP, NotificationChannel.EMAIL],
            title: 'Welcome to GameIn!',
            message: 'Thank you for joining us. Get started by creating your profile.',
            data: {
                userId: user.id,
                username: user.username,
            },
            metadata: {
                email: user.email,
            },
        });
        
        return user;
    }

    async verifyUser(userId: number) {
        const user = await this.getUser(userId);
        
        // Mark as verified
        user.verified = true;
        await this.saveUser(user);
        
        // Send verification confirmation
        await this.notificationEvents.publishNotification({
            userId,
            type: NotificationType.USER_VERIFIED,
            channels: [NotificationChannel.EMAIL],
            title: 'Account Verified',
            message: 'Your account has been successfully verified.',
            metadata: {
                email: user.email,
            },
        });
    }
}
```

---

## Channel Providers

### In-App Channel Provider

**Status**: ✅ Fully Implemented

**Features:**
- Real-time delivery via Redis pub/sub
- Database persistence for history
- WebSocket integration ready

**How it works:**
1. Notification saved to database
2. Published to Redis channel: `notifications:user:{userId}`
3. WebSocket gateway subscribes and emits to client
4. Frontend receives real-time notification

**Configuration:**
- No additional configuration needed
- Uses existing Redis connection

**Frontend Integration:**
```javascript
// Subscribe to notifications via WebSocket
socket.on('notification', (data) => {
    console.log('New notification:', data);
    // Update UI
    showNotification(data);
});

// Or subscribe via Redis (if using Redis client)
redis.subscribe(`notifications:user:${userId}`, (message) => {
    const notification = JSON.parse(message);
    showNotification(notification.data);
});
```

### Email Channel Provider

**Status**: ✅ Fully Implemented

**Features:**
- Integrated with existing email service
- Supports SMTP, SES, SendGrid
- HTML and text email support
- Delivery tracking

**How it works:**
1. Gets user email from metadata
2. Formats message (HTML + text)
3. Sends via EmailsService
4. Tracks message ID from provider

**Configuration:**
Already configured in `EmailsModule`. Uses:
- SMTP (default)
- AWS SES
- SendGrid

**Required Metadata:**
```typescript
{
    metadata: {
        email: 'user@example.com'  // Required
    }
}
```

**Example:**
```typescript
await notificationEvents.publishNotification({
    userId: 123,
    type: NotificationType.ORDER_COMPLETED,
    channels: [NotificationChannel.EMAIL],
    title: 'Order Completed',
    message: 'Your order has been completed',
    metadata: {
        email: 'user@example.com',  // Required for email
    },
});
```

### SMS Channel Provider

**Status**: 🔧 Placeholder (Ready for Integration)

**Current State:**
- Structure in place
- Logs messages (for development)
- Ready for provider integration

**Integration Steps:**

#### Option 1: Twilio

1. Install Twilio SDK:
```bash
npm install twilio
```

2. Update `sms-channel.provider.ts`:
```typescript
import * as twilio from 'twilio';

const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

const result = await client.messages.create({
    body: options.message,
    to: phoneNumber,
    from: process.env.TWILIO_PHONE_NUMBER,
});

return {
    success: true,
    externalId: result.sid,
};
```

3. Environment variables:
```env
SMS_ENABLED=true
SMS_PROVIDER=twilio
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
TWILIO_PHONE_NUMBER=+1234567890
```

#### Option 2: AWS SNS

1. Install AWS SDK:
```bash
npm install @aws-sdk/client-sns
```

2. Update `sms-channel.provider.ts`:
```typescript
import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';

const snsClient = new SNSClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const command = new PublishCommand({
    PhoneNumber: phoneNumber,
    Message: options.message,
});

const result = await snsClient.send(command);
```

3. Environment variables:
```env
SMS_ENABLED=true
SMS_PROVIDER=aws-sns
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
```

**Required Metadata:**
```typescript
{
    metadata: {
        phoneNumber: '+1234567890'  // Required
    }
}
```

### Push Channel Provider

**Status**: 🔧 Placeholder (Ready for Integration)

**Current State:**
- Structure in place
- Logs messages (for development)
- Ready for provider integration

**Integration Steps:**

#### Option 1: Firebase Cloud Messaging (FCM)

1. Install Firebase Admin SDK:
```bash
npm install firebase-admin
```

2. Update `push-channel.provider.ts`:
```typescript
import * as admin from 'firebase-admin';

// Initialize Firebase Admin (do this in constructor)
admin.initializeApp({
    credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
});

// Send notification
const message = {
    notification: {
        title: options.title,
        body: options.message,
    },
    data: options.data || {},
    tokens: deviceTokens,
};

const response = await admin.messaging().sendMulticast(message);
```

3. Environment variables:
```env
PUSH_ENABLED=true
PUSH_PROVIDER=fcm
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_CLIENT_EMAIL=your_client_email
```

#### Option 2: Apple Push Notification Service (APNs)

1. Install APNs library:
```bash
npm install apn
```

2. Update `push-channel.provider.ts`:
```typescript
import * as apn from 'apn';

const options = {
    token: {
        key: process.env.APNS_KEY_PATH,
        keyId: process.env.APNS_KEY_ID,
        teamId: process.env.APNS_TEAM_ID,
    },
    production: process.env.NODE_ENV === 'production',
};

const apnProvider = new apn.Provider(options);

const notification = new apn.Notification();
notification.alert = {
    title: options.title,
    body: options.message,
};
notification.payload = options.data;
notification.topic = process.env.APNS_BUNDLE_ID;

const result = await apnProvider.send(notification, deviceTokens);
```

**Required Metadata:**
```typescript
{
    metadata: {
        deviceTokens: ['token1', 'token2']  // Required
    }
}
```

---

## User Preferences

### Overview

Users can control which notifications they receive through granular preferences. Preferences are stored per notification type and channel combination.

### Default Behavior

- **If no preference exists**: Channel is **enabled** by default
- **If preference exists**: Uses the stored `enabled` value

### Managing Preferences

#### Get All Preferences

```typescript
const preferences = await notificationService.getUserPreferences(userId);
```

#### Update Preference

```typescript
await notificationService.updatePreference(
    userId,
    NotificationType.NEW_MESSAGE,
    NotificationChannel.EMAIL,
    false  // Disable email notifications for new messages
);
```

#### Example: Disable Email, Keep In-App

```typescript
// User wants in-app notifications but not emails for new messages
await notificationService.updatePreference(
    userId,
    NotificationType.NEW_MESSAGE,
    NotificationChannel.EMAIL,
    false
);

// In-app remains enabled (no preference = enabled by default)
```

### Preference Checking

The service automatically checks preferences before sending:

```typescript
// In NotificationService.sendNotification()
const isEnabled = await this.isChannelEnabled(userId, type, channel);
if (!isEnabled) {
    // Skip this channel
    continue;
}
```

### API Usage

**Get Preferences:**
```bash
GET /notifications/preferences
```

**Update Preference:**
```bash
PUT /notifications/preferences
{
    "type": "NEW_MESSAGE",
    "channel": "EMAIL",
    "enabled": false
}
```

---

## Real-Time Delivery

### In-App Notifications Flow

```
User Action
    ↓
NotificationEvent Published
    ↓
Kafka Topic: notifications.send
    ↓
NotificationConsumerService
    ↓
NotificationService
    ↓
InAppChannelProvider
    ├─→ Save to Database
    └─→ Publish to Redis: notifications:user:{userId}
            ↓
        WebSocket Gateway (subscribes to Redis)
            ↓
        Emit to Client via WebSocket
            ↓
        Frontend receives notification
```

### WebSocket Integration

#### Backend: Subscribe to Redis

In your WebSocket gateway (e.g., `chat.gateway.ts`):

```typescript
import { RedisIoAdapter } from '../redis/redisIOAdaptor.service';

async handleConnection(client: Socket) {
    const userId = client.data.user_id;
    
    // Subscribe to user's notification channel
    await RedisIoAdapter.subscribe(
        `notifications:user:${userId}`,
        (payload) => {
            try {
                const notification = JSON.parse(payload);
                // Emit to client
                client.emit('notification', notification.data);
            } catch (error) {
                console.error('Failed to parse notification:', error);
            }
        }
    );
}
```

#### Frontend: Listen for Notifications

```javascript
// Connect to WebSocket
const socket = io('http://localhost:3000', {
    auth: {
        token: 'Bearer YOUR_TOKEN'
    }
});

// Listen for notifications
socket.on('notification', (notification) => {
    console.log('New notification:', notification);
    
    // Show notification in UI
    showNotificationToast({
        title: notification.title,
        message: notification.message,
        data: notification.data,
    });
    
    // Update notification badge
    updateNotificationBadge();
});
```

### Notification Display

Example React component:

```jsx
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

function NotificationListener() {
    const [notifications, setNotifications] = useState([]);
    
    useEffect(() => {
        const socket = io('http://localhost:3000', {
            auth: { token: `Bearer ${localStorage.getItem('token')}` }
        });
        
        socket.on('notification', (notification) => {
            setNotifications(prev => [notification, ...prev]);
            
            // Show toast
            toast.info(notification.title, {
                description: notification.message,
            });
        });
        
        return () => socket.disconnect();
    }, []);
    
    return (
        <div>
            {notifications.map(notif => (
                <NotificationItem key={notif.id} notification={notif} />
            ))}
        </div>
    );
}
```

---

## Error Handling & Retries

### Error Types

1. **Provider Unavailable**: Channel provider not configured
2. **Invalid Data**: Missing required metadata (email, phone, etc.)
3. **Provider Failure**: External service failure (email service down, etc.)
4. **Database Error**: Database connection issues

### Error Tracking

All errors are logged and tracked in the database:

```typescript
// Notification entity stores:
{
    status: 'FAILED',
    error_message: 'Email service unavailable',
    retry_count: 3,
}
```

### Retry Logic

Currently, retries are handled manually. Future enhancement: automatic retry with exponential backoff.

**Manual Retry:**
```typescript
// Check failed notifications
const failed = await notificationRepository.find({
    where: {
        status: NotificationStatus.FAILED,
        retry_count: { $lt: 3 },  // Less than 3 retries
    },
});

// Retry sending
for (const notification of failed) {
    await notificationService.sendNotification({
        userId: notification.user_id,
        type: notification.type,
        channels: [notification.channel],
        title: notification.title,
        message: notification.message,
        data: notification.data,
    });
}
```

### Error Response Format

When a notification fails:

```json
{
    "success": false,
    "notifications": [
        {
            "channel": "EMAIL",
            "success": false,
            "error": "Email service unavailable"
        }
    ]
}
```

---

## Testing

### Unit Tests

Test individual components:

```typescript
describe('NotificationService', () => {
    it('should send notification via enabled channels', async () => {
        const result = await notificationService.sendNotification({
            userId: 1,
            type: NotificationType.CUSTOM,
            channels: [NotificationChannel.IN_APP],
            title: 'Test',
            message: 'Test message',
        });
        
        expect(result.success).toBe(true);
    });
});
```

### Integration Tests

Test Kafka flow:

```typescript
describe('NotificationConsumerService', () => {
    it('should process notification event from Kafka', async () => {
        // Publish event to Kafka
        await kafkaService.sendMessage('notifications.send', {
            key: '1',
            value: {
                userId: 1,
                type: 'CUSTOM',
                channels: ['IN_APP'],
                title: 'Test',
                message: 'Test',
            },
        });
        
        // Wait for processing
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Verify notification created
        const notification = await notificationRepository.findOne({
            where: { user_id: 1 },
        });
        
        expect(notification).toBeDefined();
    });
});
```

### E2E Tests

Test full flow:

```typescript
describe('Notification E2E', () => {
    it('should send notification end-to-end', async () => {
        // 1. Publish event
        await notificationEvents.publishNotification({...});
        
        // 2. Wait for processing
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // 3. Check database
        const notification = await notificationRepository.findOne({...});
        expect(notification.status).toBe('SENT');
        
        // 4. Check Redis (for in-app)
        const redisMessage = await redis.get(`notifications:user:1`);
        expect(redisMessage).toBeDefined();
    });
});
```

---

## Monitoring & Observability

### Key Metrics

Monitor these metrics:

1. **Kafka Consumer Lag**
   - Check consumer group lag
   - Alert if lag > 1000 messages

2. **Notification Success Rate**
   ```sql
   SELECT 
       channel,
       status,
       COUNT(*) as count
   FROM notifications
   WHERE created_at > NOW() - INTERVAL '1 hour'
   GROUP BY channel, status;
   ```

3. **Average Delivery Time**
   ```sql
   SELECT 
       channel,
       AVG(EXTRACT(EPOCH FROM (sent_at - created_at))) as avg_delivery_seconds
   FROM notifications
   WHERE sent_at IS NOT NULL
   GROUP BY channel;
   ```

4. **Error Rate**
   ```sql
   SELECT 
       channel,
       COUNT(*) FILTER (WHERE status = 'FAILED') * 100.0 / COUNT(*) as error_rate
   FROM notifications
   WHERE created_at > NOW() - INTERVAL '1 hour'
   GROUP BY channel;
   ```

### Logging

The service logs important events:

```
[NotificationService] Notification sent via IN_APP to user 123
[NotificationConsumerService] Received notification event: NEW_MESSAGE for user 123
[EmailChannelProvider] Email notification sent to user@example.com (messageId: msg-123)
[InAppChannelProvider] Failed to broadcast notification via Redis: Connection timeout
```

### Health Checks

Check service health:

```typescript
// Check Kafka connection
const kafkaHealthy = await kafkaService.isConnected();

// Check database
const dbHealthy = await notificationRepository.query('SELECT 1');

// Check Redis
const redisHealthy = await RedisIoAdapter.getCacheClient()?.ping();
```

---

## Troubleshooting

### Common Issues

#### 1. Notifications Not Being Sent

**Symptoms:** Notifications published but not delivered

**Check:**
- Kafka consumer is running
- Consumer group is subscribed to topic
- Check Kafka logs for errors

**Solution:**
```bash
# Check Kafka consumer status
kubectl logs -f deployment/notification-consumer

# Check consumer group
kafka-consumer-groups --bootstrap-server localhost:9092 \
    --group notification-consumer --describe
```

#### 2. Email Notifications Failing

**Symptoms:** Email channel shows `FAILED` status

**Check:**
- Email service configuration (SMTP/SES/SendGrid)
- User email in metadata
- Email service logs

**Solution:**
```typescript
// Verify email service
const emailService = await app.get(EmailsService);
await emailService.sendRaw({
    to: 'test@example.com',
    subject: 'Test',
    text: 'Test',
});
```

#### 3. In-App Notifications Not Appearing

**Symptoms:** Notifications saved but not showing in UI

**Check:**
- Redis connection
- WebSocket connection
- Frontend subscription

**Solution:**
```typescript
// Test Redis publish
await RedisIoAdapter.publish(
    'notifications:user:1',
    JSON.stringify({ type: 'test', data: {} })
);

// Check WebSocket connection
socket.connected // Should be true
```

#### 4. Kafka Consumer Not Processing

**Symptoms:** Events published but not consumed

**Check:**
- Consumer group is active
- Topic exists
- Consumer is subscribed

**Solution:**
```bash
# List consumer groups
kafka-consumer-groups --bootstrap-server localhost:9092 --list

# Describe consumer group
kafka-consumer-groups --bootstrap-server localhost:9092 \
    --group notification-consumer --describe
```

#### 5. High Kafka Lag

**Symptoms:** Consumer lag increasing

**Solution:**
- Scale consumer instances
- Check consumer performance
- Optimize processing logic

```bash
# Scale consumers
kubectl scale deployment notification-consumer --replicas=3
```

---

## Best Practices

### 1. Always Use Event-Driven Approach

✅ **Good:**
```typescript
await notificationEvents.publishNotification({...});
```

❌ **Bad:**
```typescript
await notificationService.sendNotification({...});  // Blocks request
```

### 2. Include Required Metadata

✅ **Good:**
```typescript
{
    metadata: {
        email: user.email,           // For email
        phoneNumber: user.phone,      // For SMS
        deviceTokens: user.tokens,    // For push
    }
}
```

❌ **Bad:**
```typescript
{
    metadata: {}  // Missing required fields
}
```

### 3. Set Appropriate Priorities

```typescript
// High priority for important notifications
priority: 'high'  // Payments, orders, security

// Normal priority for regular notifications
priority: 'normal'  // Messages, follows

// Low priority for non-urgent
priority: 'low'  // Announcements, updates
```

### 4. Use Appropriate Channels

```typescript
// Real-time: In-app + Push
channels: [NotificationChannel.IN_APP, NotificationChannel.PUSH]

// Important: Email + In-app
channels: [NotificationChannel.EMAIL, NotificationChannel.IN_APP]

// All channels for critical
channels: [
    NotificationChannel.IN_APP,
    NotificationChannel.EMAIL,
    NotificationChannel.SMS,
    NotificationChannel.PUSH,
]
```

### 5. Handle Errors Gracefully

```typescript
try {
    await notificationEvents.publishNotification({...});
} catch (error) {
    // Log but don't fail the main operation
    logger.error('Failed to send notification', error);
    // Continue with main operation
}
```

### 6. Respect User Preferences

The service automatically checks preferences, but you can also check manually:

```typescript
const isEnabled = await notificationService.isChannelEnabled(
    userId,
    NotificationType.NEW_MESSAGE,
    NotificationChannel.EMAIL
);

if (isEnabled) {
    // Send notification
}
```

### 7. Batch Notifications When Possible

For multiple users, batch in a single event:

```typescript
// Instead of loop
for (const user of users) {
    await notificationEvents.publishNotification({...});
}

// Batch (future enhancement)
await notificationEvents.publishBatch(notifications);
```

---

## Advanced Features

### Delayed Notifications

Send notifications with a delay:

```typescript
await notificationEvents.publishNotification({
    userId: 123,
    type: NotificationType.ORDER_REMINDER,
    channels: [NotificationChannel.EMAIL],
    title: 'Order Reminder',
    message: 'Don\'t forget about your order',
    delaySeconds: 3600,  // Send after 1 hour
});
```

### Notification Templates

Create reusable templates (future enhancement):

```typescript
// Template definition
const template = {
    type: NotificationType.ORDER_COMPLETED,
    title: 'Order #{{orderId}} Completed',
    message: 'Your order has been completed. Total: ${{amount}}',
};

// Use template
await notificationEvents.sendFromTemplate(
    userId,
    template,
    { orderId: 123, amount: 500 }
);
```

### Notification Batching

Batch multiple notifications (future enhancement):

```typescript
await notificationEvents.publishBatch([
    { userId: 1, type: 'NEW_MESSAGE', ... },
    { userId: 2, type: 'NEW_MESSAGE', ... },
    { userId: 3, type: 'NEW_MESSAGE', ... },
]);
```

### Analytics

Track notification performance:

```typescript
// Get notification stats
const stats = await notificationService.getStats({
    userId: 123,
    startDate: '2024-01-01',
    endDate: '2024-01-31',
});

// Returns:
{
    total: 100,
    sent: 95,
    delivered: 90,
    read: 80,
    failed: 5,
    byChannel: {
        IN_APP: 50,
        EMAIL: 30,
        SMS: 10,
        PUSH: 10,
    },
}
```

---

## FAQ

### Q: How do I add a new notification type?

A: Add it to the `NotificationType` enum:

```typescript
export enum NotificationType {
    // ... existing types
    NEW_FEATURE = 'NEW_FEATURE',
}
```

### Q: Can I send notifications to multiple users at once?

A: Currently, you need to loop and send individually. Batch support is planned:

```typescript
for (const userId of userIds) {
    await notificationEvents.publishNotification({
        userId,
        // ... notification data
    });
}
```

### Q: How do I test notifications locally?

A: Use the test endpoint:

```bash
curl -X POST http://localhost:3000/notifications/send \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{...}'
```

### Q: What happens if Kafka is down?

A: Events will fail to publish. The service will throw an error. Consider implementing a fallback queue or retry mechanism.

### Q: How do I disable notifications for a user?

A: Set all preferences to disabled, or add a global "notifications_enabled" flag to the user entity.

### Q: Can I send HTML emails?

A: Yes, the EmailChannelProvider supports HTML. The message is automatically formatted as HTML.

### Q: How do I track delivery status?

A: Check the `notifications` table:

```sql
SELECT status, sent_at, delivered_at, read_at
FROM notifications
WHERE user_id = 123;
```

### Q: How do I retry failed notifications?

A: Currently manual. Query failed notifications and resend:

```typescript
const failed = await notificationRepository.find({
    where: { status: 'FAILED' },
});

for (const notification of failed) {
    await notificationService.sendNotification({...});
}
```

---

## Support

For issues or questions:
1. Check this documentation
2. Review logs
3. Check Kafka/Redis health
4. Contact the development team

---

**Last Updated**: January 2024
**Version**: 1.0.0


