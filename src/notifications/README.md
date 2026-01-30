# Notification Microservice

A scalable, loosely coupled notification system that handles in-app, email, SMS, and push notifications through an event-driven architecture.

> 📚 **For complete documentation, see [DOCUMENTATION.md](./DOCUMENTATION.md)**
> 
> 🏗️ **For architecture details, see [ARCHITECTURE.md](./ARCHITECTURE.md)**

## Architecture

### Event-Driven Design
- **Kafka Integration**: Uses Kafka for asynchronous notification processing
- **Loose Coupling**: Other services publish events without direct dependencies
- **Scalable**: Can handle high volumes of notifications through Kafka consumers

### Notification Channels

1. **In-App Notifications** ✅
   - Real-time delivery via Redis pub/sub
   - Stored in database for history
   - WebSocket integration for instant delivery

2. **Email Notifications** ✅
   - Integrated with existing email service (SMTP/SES/SendGrid)
   - HTML and text support
   - Delivery tracking

3. **SMS Notifications** 🔧 (Placeholder)
   - Ready for integration with Twilio, AWS SNS, or other providers
   - Currently logs messages (needs provider setup)

4. **Push Notifications** 🔧 (Placeholder)
   - Ready for integration with FCM, APNs, or OneSignal
   - Currently logs messages (needs provider setup)

## Usage

### From Other Services

#### 1. Inject NotificationEventsService

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
        // Send notification via Kafka (loosely coupled)
        await this.notificationEvents.publishNotification({
            userId: 123,
            type: NotificationType.OFFER_RECEIVED,
            channels: [NotificationChannel.IN_APP, NotificationChannel.EMAIL],
            title: 'New Offer Received',
            message: 'You have received a new offer of $500',
            data: { offerId: 456, amount: 500 },
            metadata: { email: 'user@example.com' },
            priority: 'high',
        });
    }
}
```

#### 2. Use Convenience Methods

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

#### 3. Direct Service Call (Synchronous)

```typescript
import { NotificationService } from '../notifications/providers/notification.service';

@Injectable()
export class YourService {
    constructor(
        private readonly notificationService: NotificationService,
    ) {}

    async someAction() {
        // Send notification directly (synchronous)
        await this.notificationService.sendNotification({
            userId: 123,
            type: NotificationType.ORDER_COMPLETED,
            channels: [NotificationChannel.IN_APP],
            title: 'Order Completed',
            message: 'Your order has been completed',
            data: { orderId: 789 },
        });
    }
}
```

## API Endpoints

### Get Notifications
```http
GET /notifications?limit=50&offset=0&unreadOnly=false
Authorization: Bearer <token>
```

### Get Preferences
```http
GET /notifications/preferences
Authorization: Bearer <token>
```

### Update Preference
```http
PUT /notifications/preferences
Content-Type: application/json
Authorization: Bearer <token>

{
  "type": "NEW_MESSAGE",
  "channel": "EMAIL",
  "enabled": false
}
```

### Mark as Read
```http
PUT /notifications/:id/read
Authorization: Bearer <token>
```

### Mark All as Read
```http
PUT /notifications/read-all
Authorization: Bearer <token>
```

### Delete Notification
```http
DELETE /notifications/:id
Authorization: Bearer <token>
```

## Notification Types

Available notification types in `NotificationType` enum:
- `USER_WELCOME`, `USER_VERIFIED`, `PASSWORD_RESET`
- `NEW_MESSAGE`, `MESSAGE_READ`, `CONVERSATION_INVITE`
- `OFFER_RECEIVED`, `OFFER_ACCEPTED`, `OFFER_REJECTED`
- `ORDER_CREATED`, `ORDER_COMPLETED`, `ORDER_CANCELLED`
- `PAYMENT_RECEIVED`, `PAYMENT_FAILED`, `INVOICE_GENERATED`
- `NEW_FOLLOWER`, `PROFILE_VIEW`
- `TEAM_INVITE`, `TEAM_MEMBER_ADDED`
- `SYSTEM_ANNOUNCEMENT`, `MAINTENANCE_NOTICE`
- `CUSTOM`

## User Preferences

Users can control which notifications they receive through preferences. By default, all notifications are enabled. Users can disable specific notification types per channel.

Example: Disable email notifications for new messages but keep in-app notifications enabled.

## Real-Time Delivery (In-App)

In-app notifications are delivered in real-time via:
1. Redis pub/sub (`notifications:user:{userId}`)
2. WebSocket connection (integrate with your WebSocket gateway)
3. Database storage for history

### Frontend Integration

```javascript
// Subscribe to user notifications via WebSocket
socket.on('notification', (data) => {
    console.log('New notification:', data);
    // Update UI with notification
});

// Or subscribe via Redis channel
// (if using Redis client in frontend)
```

## Database Schema

### notifications
- Stores all notifications sent to users
- Tracks status (PENDING, SENT, DELIVERED, READ, FAILED)
- Stores external IDs from providers (email message ID, SMS ID, etc.)
- Includes retry count for failed notifications

### notification_preferences
- User preferences per notification type and channel
- Unique constraint on (user_id, type, channel)
- Default: enabled = true

## Environment Variables

```env
# SMS Configuration (optional)
SMS_ENABLED=false
SMS_PROVIDER=none  # twilio, aws-sns, messagebird, etc.

# Push Notification Configuration (optional)
PUSH_ENABLED=false
PUSH_PROVIDER=none  # fcm, apns, onesignal, etc.
```

## Setup SMS Provider (Example: Twilio)

1. Install Twilio SDK:
```bash
npm install twilio
```

2. Update `sms-channel.provider.ts`:
```typescript
import * as twilio from 'twilio';

const client = twilio(accountSid, authToken);
const result = await client.messages.create({
    body: options.message,
    to: phoneNumber,
    from: twilioPhoneNumber,
});
```

3. Set environment variables:
```env
SMS_ENABLED=true
SMS_PROVIDER=twilio
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
TWILIO_PHONE_NUMBER=your_number
```

## Setup Push Provider (Example: FCM)

1. Install Firebase Admin SDK:
```bash
npm install firebase-admin
```

2. Update `push-channel.provider.ts`:
```typescript
import * as admin from 'firebase-admin';

const message = {
    notification: {
        title: options.title,
        body: options.message,
    },
    data: options.data,
    tokens: deviceTokens,
};
const response = await admin.messaging().sendMulticast(message);
```

3. Set environment variables:
```env
PUSH_ENABLED=true
PUSH_PROVIDER=fcm
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_CLIENT_EMAIL=your_client_email
```

## Migration

Run the migration to create tables:

```bash
npm run migration:run
```

## Testing

### Send Test Notification

```http
POST /notifications/send
Content-Type: application/json
Authorization: Bearer <token>

{
  "userId": 1,
  "type": "CUSTOM",
  "channels": ["IN_APP", "EMAIL"],
  "title": "Test Notification",
  "message": "This is a test notification",
  "data": { "test": true }
}
```

## Best Practices

1. **Use Kafka for High Volume**: Always use `NotificationEventsService.publishNotification()` for production to avoid blocking requests
2. **Include Metadata**: Always include `email` in metadata for email notifications, `phoneNumber` for SMS, `deviceTokens` for push
3. **Set Priorities**: Use `priority: 'high'` for important notifications
4. **Respect Preferences**: The service automatically checks user preferences before sending
5. **Handle Failures**: Failed notifications are logged and can be retried

## Future Enhancements

- [ ] Notification templates
- [ ] Scheduled notifications
- [ ] Notification batching
- [ ] Analytics and reporting
- [ ] A/B testing for notification content
- [ ] Rate limiting per user/channel

