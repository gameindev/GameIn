# Notification System Implementation Guide

## Overview

This document provides a comprehensive guide to the notification system implementation, including where notifications are triggered, how they work, and how to add new notifications.

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Implemented Notifications](#implemented-notifications)
3. [Notification Locations](#notification-locations)
4. [How to Add New Notifications](#how-to-add-new-notifications)
5. [Frontend Integration](#frontend-integration)
6. [Testing Notifications](#testing-notifications)

---

## Architecture Overview

The notification system uses an **event-driven architecture** with Kafka for loose coupling:

```
Service → NotificationEventsService → Kafka → NotificationConsumer → NotificationService → Channel Providers → Users
```

### Key Components

1. **NotificationEventsService**: Publishes events to Kafka (used by other services)
2. **NotificationConsumerService**: Consumes events from Kafka
3. **NotificationService**: Routes notifications to appropriate channels
4. **Channel Providers**: Handle delivery (In-App, Email, SMS, Push)
5. **ChatGateway**: WebSocket gateway that delivers in-app notifications in real-time

---

## Implemented Notifications

### 1. User Follow Notifications

**Type**: `NEW_FOLLOWER`  
**Channels**: `IN_APP`  
**Location**: `backend/src/user-follow/providers/user-follow.service.ts`

**Trigger**: When a user follows another user

**Implementation**:
```typescript
// In UserFollowService.follow()
await this.sendFollowNotification(follower, following);
```

**Notification Details**:
- **Recipient**: The user being followed
- **Title**: "New Follower"
- **Message**: "{followerName} started following you"
- **Data**: Includes follower ID, username, and profile picture

**File**: `backend/src/user-follow/providers/user-follow.service.ts` (lines 133-159)

---

### 2. Order Creation Notifications

**Type**: `ORDER_CREATED`  
**Channels**: `IN_APP`, `EMAIL`  
**Location**: `backend/src/offerings-order/providers/post-offering-order.provider.ts`

**Trigger**: When a brand creates an order for a creator's offering

**Implementation**:
```typescript
// In PostOfferingOrderProvider.createOfferingOrder()
await this.sendOrderCreatedNotification(savedOrder, creator, currentUser, offering);
```

**Notification Details**:
- **Recipient**: Creator (the user receiving the order)
- **Title**: "New Order Received"
- **Message**: "{brandName} has placed an order for "{orderTitle}""
- **Data**: Includes order ID, brand info, offering details, total amount

**File**: `backend/src/offerings-order/providers/post-offering-order.provider.ts` (lines 65-95)

---

### 3. Order Status Update Notifications

**Type**: `ORDER_COMPLETED`, `ORDER_CANCELLED`  
**Channels**: `IN_APP`, `EMAIL`  
**Location**: `backend/src/offerings-order/providers/offerings-order.service.ts`

**Trigger**: When order status changes (PAID, CANCELLED, DELIVERED, IN_PROGRESS)

**Implementation**:
```typescript
// In OfferingsOrderService.update()
if (updateData.status && updateData.status !== previousStatus) {
    await this.sendOrderStatusUpdateNotification(savedOrder, previousStatus, updateData.status);
}
```

**Notification Details**:

| Status | Notification Type | Recipient | Title | Message |
|--------|------------------|-----------|-------|---------|
| PAID | ORDER_COMPLETED | Creator | "Order Payment Received" | "Payment received for order..." |
| CANCELLED | ORDER_CANCELLED | Creator | "Order Cancelled" | "Order has been cancelled" |
| DELIVERED | ORDER_COMPLETED | Brand | "Order Delivered" | "Order has been delivered" |
| IN_PROGRESS | ORDER_COMPLETED | Brand | "Order In Progress" | "Order is now in progress" |

**File**: `backend/src/offerings-order/providers/offerings-order.service.ts` (lines 88-150)

---

### 4. New Message Notifications

**Type**: `NEW_MESSAGE`  
**Channels**: `IN_APP`  
**Location**: `backend/src/chat/providers/message-persistence.consumer.ts`

**Trigger**: When a message is persisted to the database (after being sent via WebSocket)

**Implementation**:
```typescript
// In MessagePersistenceConsumer.flushBuffer()
for (const savedMessage of savedMessages) {
    await this.sendMessageNotifications(savedMessage);
}
```

**Notification Details**:
- **Recipient**: All conversation participants except the sender
- **Title**: "New Message"
- **Message**: "{senderName}: {messagePreview}"
- **Data**: Includes conversation ID, message ID, sender info, message preview

**File**: `backend/src/chat/providers/message-persistence.consumer.ts` (lines 240-280)

---

### 5. Payment Notifications

#### Payment Received

**Type**: `PAYMENT_RECEIVED`  
**Channels**: `IN_APP`, `EMAIL`  
**Location**: `backend/src/payments/providers/payment-flow.service.ts`

**Trigger**: When payment verification succeeds

**Implementation**:
```typescript
// In PaymentFlowService.verifyAndCompletePayment()
if (verification.success && verification.status === 'succeeded') {
    await this.sendPaymentNotification(paymentIntent, payment, true);
}
```

**Notification Details**:
- **Recipient**: Creator (the user receiving payment)
- **Title**: "Payment Received"
- **Message**: "You received a payment of {currency} {amount} for order "{title}""
- **Data**: Includes order ID, payment ID, amount, currency

**File**: `backend/src/payments/providers/payment-flow.service.ts` (lines 236-270)

#### Payment Failed

**Type**: `PAYMENT_FAILED`  
**Channels**: `IN_APP`, `EMAIL`  
**Location**: `backend/src/payments/providers/payment-flow.service.ts`

**Trigger**: When payment verification fails

**Implementation**:
```typescript
// In PaymentFlowService.verifyAndCompletePayment()
else {
    await this.sendPaymentNotification(paymentIntent, payment, false);
}
```

**Notification Details**:
- **Recipient**: Brand (the user who attempted payment)
- **Title**: "Payment Failed"
- **Message**: "Payment failed for order "{title}". Please try again."
- **Data**: Includes order ID, payment ID, amount, currency

**File**: `backend/src/payments/providers/payment-flow.service.ts` (lines 236-270)

---

## Notification Locations

### Backend Implementation Files

| Notification Type | Service File | Method | Line Range |
|------------------|--------------|--------|------------|
| NEW_FOLLOWER | `user-follow/providers/user-follow.service.ts` | `sendFollowNotification()` | 133-159 |
| ORDER_CREATED | `offerings-order/providers/post-offering-order.provider.ts` | `sendOrderCreatedNotification()` | 65-95 |
| ORDER_COMPLETED | `offerings-order/providers/offerings-order.service.ts` | `sendOrderStatusUpdateNotification()` | 88-150 |
| ORDER_CANCELLED | `offerings-order/providers/offerings-order.service.ts` | `sendOrderStatusUpdateNotification()` | 88-150 |
| NEW_MESSAGE | `chat/providers/message-persistence.consumer.ts` | `sendMessageNotifications()` | 240-280 |
| PAYMENT_RECEIVED | `payments/providers/payment-flow.service.ts` | `sendPaymentNotification()` | 236-270 |
| PAYMENT_FAILED | `payments/providers/payment-flow.service.ts` | `sendPaymentNotification()` | 236-270 |

### Module Dependencies

All modules that send notifications import `NotificationsModule`:

- ✅ `UserFollowModule` - imports `NotificationsModule`
- ✅ `OfferingsOrderModule` - imports `NotificationsModule`
- ✅ `ChatModule` - imports `NotificationsModule`
- ✅ `PaymentsModule` - imports `NotificationsModule`

### Frontend Integration

**WebSocket Connection**: `gamein-frontend/src/app/services/ws/ws.service.js`  
**Notification Hook**: `gamein-frontend/src/features/notifications/hooks/useNotificationSocket.js`  
**Redux Store**: `gamein-frontend/src/features/notifications/store/notificationsSlice.js`  
**UI Component**: `gamein-frontend/src/features/notifications/components/NotificationDropdown.jsx`  
**Header Integration**: `gamein-frontend/src/app/layout/components/Header.jsx`

---

## How to Add New Notifications

### Step 1: Import Required Dependencies

In your service file, import:

```typescript
import { NotificationEventsService } from '../../notifications/providers/notification-events.service';
import { NotificationType } from '../../notifications/enums/notification-type.enum';
import { NotificationChannel } from '../../notifications/enums/notification-channel.enum';
```

### Step 2: Inject NotificationEventsService

In your service constructor:

```typescript
constructor(
    // ... other dependencies
    private readonly notificationEvents: NotificationEventsService,
) {}
```

### Step 3: Import NotificationsModule

In your module file:

```typescript
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
    imports: [
        // ... other imports
        NotificationsModule,
    ],
})
export class YourModule {}
```

### Step 4: Publish Notification Event

In your service method:

```typescript
async yourAction() {
    // Your business logic here
    
    // Publish notification (non-blocking)
    await this.notificationEvents.publishNotification({
        userId: recipientUserId,
        type: NotificationType.YOUR_NOTIFICATION_TYPE,
        channels: [NotificationChannel.IN_APP, NotificationChannel.EMAIL],
        title: 'Notification Title',
        message: 'Notification message',
        data: {
            // Any relevant data
            customField: 'value',
        },
        metadata: {
            email: user.email, // Required for email channel
            emailTemplate: 'your-template', // Optional
            emailSubject: 'Email Subject', // Optional
        },
        priority: 'normal', // 'low' | 'normal' | 'high'
    }).catch((error) => {
        // Log error but don't fail the main operation
        console.error('Failed to send notification:', error);
    });
}
```

### Step 5: Add Notification Type (if new)

If you need a new notification type, add it to:

`backend/src/notifications/enums/notification-type.enum.ts`

```typescript
export enum NotificationType {
    // ... existing types
    YOUR_NEW_TYPE = 'YOUR_NEW_TYPE',
}
```

---

## Frontend Integration

### Real-Time Delivery Flow

1. **Backend**: Notification saved to DB → Published to Redis channel `notifications:user:{userId}`
2. **ChatGateway**: Subscribes to Redis channel → Emits via WebSocket to user's room
3. **Frontend**: WebSocket receives event → Updates Redux store → UI updates

### WebSocket Event

**Event Name**: `notification`  
**Payload**:
```javascript
{
    id: number,
    type: string,
    title: string,
    message: string,
    data: object,
    created_at: string,
    read_at: string | null,
}
```

### Frontend Files

| File | Purpose |
|------|---------|
| `features/notifications/hooks/useNotificationSocket.js` | WebSocket connection and event handling |
| `features/notifications/hooks/useNotifications.js` | Main hook for components |
| `features/notifications/store/notificationsSlice.js` | Redux state management |
| `features/notifications/components/NotificationDropdown.jsx` | UI component with icon and list |
| `features/notifications/components/NotificationItem.jsx` | Individual notification item |
| `features/notifications/components/NotificationIcon.jsx` | Bell icon with unread count |
| `app/layout/components/Header.jsx` | Header integration |

---

## Testing Notifications

### Test User Follow Notification

1. **Setup**: Two users (User A and User B)
2. **Action**: User A follows User B
3. **Expected**: User B receives in-app notification "User A started following you"
4. **Verify**: Check notification dropdown in User B's header

### Test Order Notification

1. **Setup**: Brand user and Creator user
2. **Action**: Brand creates an order for Creator's offering
3. **Expected**: Creator receives in-app and email notification "New Order Received"
4. **Verify**: 
   - Check Creator's notification dropdown
   - Check Creator's email inbox

### Test Message Notification

1. **Setup**: Two users in a conversation
2. **Action**: User A sends a message to User B
3. **Expected**: User B receives in-app notification "New Message: {preview}"
4. **Verify**: Check User B's notification dropdown

### Test Payment Notification

1. **Setup**: Order with pending payment
2. **Action**: Complete payment successfully
3. **Expected**: Creator receives "Payment Received" notification
4. **Verify**: Check Creator's notification dropdown and email

---

## Important Notes

### In-App Notifications

- **Always Enabled**: In-app notifications bypass user preference checks
- **Real-Time**: Delivered via WebSocket immediately
- **Persistent**: Stored in database for history

### Email Notifications

- **Respects Preferences**: Only sent if user has email enabled for that notification type
- **Requires Metadata**: Must include `email` in metadata
- **Template Support**: Can specify `emailTemplate` and `emailSubject`

### Error Handling

All notification calls use `.catch()` to prevent failures from affecting main business logic:

```typescript
await this.notificationEvents.publishNotification({...}).catch((error) => {
    console.error('Failed to send notification:', error);
});
```

### Performance

- **Non-Blocking**: Notifications are published asynchronously
- **Kafka Queue**: Handles high volume with queuing
- **Batch Processing**: Consumer processes notifications in batches

---

## Summary

The notification system is fully integrated across:

✅ **User Follow** - In-app notifications  
✅ **Orders** - In-app and email (creation, status updates)  
✅ **Messages** - In-app notifications  
✅ **Payments** - In-app and email (success, failure)  

All notifications are:
- Loosely coupled via Kafka
- Real-time via WebSocket (in-app)
- Persistent in database
- Respectful of user preferences (except in-app)
- Error-resilient (won't break main operations)

---

## Quick Reference

**To send a notification**:
```typescript
await this.notificationEvents.publishNotification({
    userId: recipientId,
    type: NotificationType.YOUR_TYPE,
    channels: [NotificationChannel.IN_APP],
    title: 'Title',
    message: 'Message',
    data: {},
});
```

**To check if notification is implemented**:
- Search for `NotificationEventsService` in the service file
- Check if `NotificationsModule` is imported in the module
- Look for `publishNotification` calls

---

*Last Updated: [Current Date]*  
*Version: 1.0*

