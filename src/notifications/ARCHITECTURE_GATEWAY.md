# Notification Gateway Architecture

## Why Separate Gateway?

**Problem**: Initially, notification subscription was added to `ChatGateway`, which created unnecessary coupling between chat and notifications.

**Solution**: Created a dedicated `NotificationGateway` that handles only notification-related WebSocket events.

## Architecture

### Multiple Gateways, Same Server

In NestJS, multiple `@WebSocketGateway` decorators with the same `path` share the same Socket.IO server instance. This means:

- **ChatGateway**: Handles chat-related events (messages, conversations, online users)
- **NotificationGateway**: Handles notification-related events (real-time notifications)

Both use:
- Same WebSocket path: `/socket.io`
- Same server instance
- Same authentication mechanism
- Different event handlers

### Connection Flow

```
Client connects to /socket.io
  ↓
Both gateways receive connection event
  ↓
ChatGateway.handleConnection()
  ├─→ Authenticates user
  ├─→ Sets up chat-related data
  ├─→ Joins 'online_users' room
  └─→ Handles chat events
  ↓
NotificationGateway.handleConnection()
  ├─→ Authenticates user (same token)
  ├─→ Subscribes to notifications:user:{userId}
  └─→ Handles notification events
```

### Benefits

1. **Separation of Concerns**: Each gateway handles its own domain
2. **Maintainability**: Changes to notifications don't affect chat
3. **Scalability**: Can scale or modify each gateway independently
4. **Clean Architecture**: Follows single responsibility principle

## Notification Flow

```
User Follows Another User
  ↓
UserFollowService.sendFollowNotification()
  ↓
NotificationEventsService.publishNotification()
  ↓
Kafka Topic: notifications.send
  ↓
NotificationConsumerService
  ↓
NotificationService.sendNotification()
  ↓
InAppChannelProvider.send()
  ├─→ Save to database
  └─→ Redis publish: notifications:user:{userId}
      ↓
NotificationGateway.subscribeToUserNotifications()
  ↓
client.emit('notification', data)
  ↓
Frontend receives via WebSocket
```

## Files

- **NotificationGateway**: `backend/src/notifications/providers/notification.gateway.ts`
- **ChatGateway**: `backend/src/chat/providers/chat.gateway.ts` (notification code removed)

## Key Points

1. **No Preference Check for IN_APP**: In-app notifications always delivered
2. **Shared Server**: Both gateways use same Socket.IO server instance
3. **Independent Handlers**: Each gateway handles its own events
4. **Same Authentication**: Both use `WsAccessTokenGuard`

## Testing

When testing, both gateways will be active:
- ChatGateway handles: `messages`, `join_conversation`, `send_message`, etc.
- NotificationGateway handles: `notification` events

The frontend connects once to `/socket.io` and receives events from both gateways.

