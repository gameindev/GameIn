# Notification Service - Quick Start Guide

Get up and running with the notification service in 5 minutes.

## Prerequisites

- ✅ Kafka running and accessible
- ✅ PostgreSQL database
- ✅ Redis (for in-app notifications)
- ✅ Email service configured

## Step 1: Run Migration

```bash
npm run migration:run
```

This creates the `notifications` and `notification_preferences` tables.

## Step 2: Verify Setup

Check that the module is imported in `app.module.ts`:

```typescript
import { NotificationsModule } from './notifications/notifications.module';
```

## Step 3: Send Your First Notification

### From Another Service

```typescript
import { NotificationEventsService } from '../notifications/providers/notification-events.service';
import { NotificationType } from '../notifications/enums/notification-type.enum';
import { NotificationChannel } from '../notifications/enums/notification-channel.enum';

@Injectable()
export class YourService {
    constructor(
        private readonly notificationEvents: NotificationEventsService,
    ) {}

    async someAction() {
        // Send notification
        await this.notificationEvents.publishNotification({
            userId: 123,
            type: NotificationType.CUSTOM,
            channels: [NotificationChannel.IN_APP],
            title: 'Hello!',
            message: 'This is your first notification',
        });
    }
}
```

### Via API (Testing)

```bash
curl -X POST http://localhost:3000/notifications/send \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "userId": 1,
    "type": "CUSTOM",
    "channels": ["IN_APP"],
    "title": "Test",
    "message": "Test notification"
  }'
```

## Step 4: Check Notification

### Via API

```bash
curl -X GET http://localhost:3000/notifications \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### In Database

```sql
SELECT * FROM notifications WHERE user_id = 1;
```

## Step 5: Integrate Real-Time (Optional)

### Backend: Subscribe to Redis

In your WebSocket gateway:

```typescript
import { RedisIoAdapter } from '../redis/redisIOAdaptor.service';

async handleConnection(client: Socket) {
    const userId = client.data.user_id;
    
    await RedisIoAdapter.subscribe(
        `notifications:user:${userId}`,
        (payload) => {
            const notification = JSON.parse(payload);
            client.emit('notification', notification.data);
        }
    );
}
```

### Frontend: Listen for Notifications

```javascript
socket.on('notification', (notification) => {
    console.log('New notification:', notification);
    // Show in UI
});
```

## Common Use Cases

### Send Notification on New Message

```typescript
await notificationEvents.notifyNewMessage(
    userId,
    conversationId,
    'John Doe',
    'Hey, check this out!'
);
```

### Send Notification on Offer Received

```typescript
await notificationEvents.notifyOfferReceived(
    userId,
    offerId,
    500
);
```

### Send Notification on Payment

```typescript
await notificationEvents.notifyPaymentReceived(
    userId,
    1000,
    orderId
);
```

## Next Steps

- 📖 Read [DOCUMENTATION.md](./DOCUMENTATION.md) for complete guide
- 🏗️ Check [ARCHITECTURE.md](./ARCHITECTURE.md) for system design
- 💡 See [examples/integration-example.ts](./examples/integration-example.ts) for integration examples

## Troubleshooting

### Notifications not appearing?

1. Check Kafka is running: `curl http://localhost:3000/kafka/health`
2. Check consumer logs for errors
3. Verify notification in database: `SELECT * FROM notifications`

### Email not sending?

1. Check email service configuration
2. Verify `email` in metadata
3. Check email service logs

### In-app not real-time?

1. Check Redis connection
2. Verify WebSocket subscription
3. Check Redis channel: `notifications:user:{userId}`

## Support

For detailed help, see [DOCUMENTATION.md](./DOCUMENTATION.md) or contact the development team.


