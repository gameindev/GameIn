# Notification Microservice Architecture

## Overview

The notification microservice is designed as a **loosely coupled, event-driven system** that handles multiple notification channels (in-app, email, SMS, push) through Kafka-based message queuing.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    Other Services (Chat, Orders, etc.)           │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       │ publishNotification()
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│              NotificationEventsService (Publisher)               │
│  - Publishes events to Kafka topic: 'notifications.send'        │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       │ Kafka Message
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Kafka Topic: notifications.send               │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       │ Consume
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│          NotificationConsumerService (Kafka Consumer)             │
│  - Listens to 'notifications.send' topic                        │
│  - Processes notification requests asynchronously                │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       │ sendNotification()
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                    NotificationService                            │
│  - Checks user preferences                                       │
│  - Routes to appropriate channel providers                       │
│  - Handles retries and error tracking                           │
└──────────────────────┬──────────────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
        ▼              ▼              ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ In-App       │ │ Email        │ │ SMS          │ │ Push
│ Provider     │ │ Provider     │ │ Provider     │ │ Provider
└──────┬───────┘ └──────┬───────┘ └──────┬───────┘ └──────┬───────┘
       │                │                 │                 │
       ▼                ▼                 ▼                 ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ Redis        │ │ Email        │ │ SMS          │ │ Push         │
│ Pub/Sub      │ │ Service      │ │ Provider     │ │ Provider     │
│              │ │ (SMTP/SES)   │ │ (Twilio)     │ │ (FCM/APNs)   │
└──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘
       │                │                 │                 │
       ▼                ▼                 ▼                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Database (PostgreSQL)                          │
│  - notifications table (history & status)                        │
│  - notification_preferences table (user settings)                │
└─────────────────────────────────────────────────────────────────┘
```

## Key Components

### 1. NotificationEventsService
**Purpose**: Event publisher for other services
- **Location**: `providers/notification-events.service.ts`
- **Method**: `publishNotification(dto)` - Publishes to Kafka
- **Usage**: Other services inject this and publish events
- **Benefits**: Loose coupling, async processing, scalable

### 2. NotificationConsumerService
**Purpose**: Kafka consumer that processes notification events
- **Location**: `providers/notification-consumer.service.ts`
- **Topic**: `notifications.send`
- **Behavior**: Listens for events, validates, calls NotificationService
- **Benefits**: Handles high volume, retries on failure

### 3. NotificationService
**Purpose**: Core notification routing and business logic
- **Location**: `providers/notification.service.ts`
- **Responsibilities**:
  - Check user preferences
  - Route to channel providers
  - Track notification status
  - Handle user preferences CRUD
  - Mark notifications as read

### 4. Channel Providers
**Purpose**: Handle delivery for specific channels
- **InAppChannelProvider**: Real-time via Redis/WebSocket
- **EmailChannelProvider**: Via existing email service
- **SmsChannelProvider**: Placeholder for SMS integration
- **PushChannelProvider**: Placeholder for push integration

### 5. NotificationChannelFactory
**Purpose**: Factory pattern to get appropriate provider
- **Location**: `providers/notification-channel.factory.ts`
- **Method**: `getProvider(channel)` - Returns provider instance

## Data Flow

### Sending a Notification

1. **Service publishes event**:
   ```typescript
   await notificationEvents.publishNotification({
       userId: 123,
       type: NotificationType.NEW_MESSAGE,
       channels: [NotificationChannel.IN_APP, NotificationChannel.EMAIL],
       title: 'New Message',
       message: 'You have a new message',
       data: { conversationId: 456 }
   });
   ```

2. **Kafka receives event**:
   - Event stored in `notifications.send` topic
   - Partitioned by user ID for ordering

3. **Consumer processes event**:
   - NotificationConsumerService receives event
   - Validates data
   - Calls NotificationService.sendNotification()

4. **Service routes to channels**:
   - Checks user preferences for each channel
   - Gets provider from factory
   - Calls provider.send() for each enabled channel

5. **Providers deliver**:
   - **In-App**: Saves to DB, publishes to Redis
   - **Email**: Calls EmailsService, tracks message ID
   - **SMS**: (Placeholder) Would call SMS provider
   - **Push**: (Placeholder) Would call push provider

6. **Status tracking**:
   - Notification records updated with status
   - External IDs stored (email message ID, etc.)
   - Errors logged for retry

## User Preferences

Users can control notifications through preferences:

```typescript
// Disable email notifications for new messages
await notificationService.updatePreference(
    userId,
    NotificationType.NEW_MESSAGE,
    NotificationChannel.EMAIL,
    false
);
```

**Default behavior**: If no preference exists, channel is enabled.

## Real-Time Delivery (In-App)

In-app notifications use Redis pub/sub for real-time delivery:

1. **Provider publishes**:
   ```typescript
   RedisIoAdapter.publish(
       `notifications:user:${userId}`,
       JSON.stringify({ type: 'notification', data: {...} })
   );
   ```

2. **WebSocket gateway subscribes**:
   - Subscribe to `notifications:user:${userId}` channel
   - When message received, emit to connected client

3. **Frontend receives**:
   ```javascript
   socket.on('notification', (data) => {
       // Update UI
   });
   ```

## Scalability Features

1. **Kafka Queuing**: Handles high volume without blocking
2. **Async Processing**: Non-blocking notification delivery
3. **Channel Isolation**: Each channel provider independent
4. **Retry Logic**: Failed notifications can be retried
5. **Batch Processing**: Can be extended for batch operations

## Error Handling

1. **Provider Failures**: Logged, notification status = FAILED
2. **Kafka Failures**: Automatic retry by Kafka
3. **Database Failures**: Transaction rollback, notification not created
4. **User Preferences**: Missing preferences default to enabled

## Database Schema

### notifications
- Stores all notifications
- Tracks status (PENDING → SENT → DELIVERED → READ)
- Stores external IDs from providers
- Includes retry count

### notification_preferences
- User preferences per type/channel
- Unique constraint: (user_id, type, channel)
- Default: enabled = true

## Integration Points

### From Other Services

```typescript
// Inject NotificationEventsService
constructor(
    private readonly notificationEvents: NotificationEventsService
) {}

// Publish notification event
await this.notificationEvents.publishNotification({...});
```

### Direct Service Call (Synchronous)

```typescript
// Inject NotificationService
constructor(
    private readonly notificationService: NotificationService
) {}

// Send directly (synchronous)
await this.notificationService.sendNotification({...});
```

## Future Enhancements

- [ ] Notification templates
- [ ] Scheduled/delayed notifications
- [ ] Notification batching
- [ ] Analytics dashboard
- [ ] A/B testing
- [ ] Rate limiting
- [ ] Notification digests (daily/weekly summaries)

## Monitoring

Key metrics to monitor:
- Kafka consumer lag
- Notification success/failure rates per channel
- Average delivery time
- User preference distribution
- Retry counts

## Testing

### Unit Tests
- Test each channel provider independently
- Mock external services (email, SMS, push)

### Integration Tests
- Test Kafka consumer → service → provider flow
- Test user preferences filtering

### E2E Tests
- Test full flow from event publish to delivery
- Test real-time in-app delivery

