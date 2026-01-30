# Testing Follow Notifications

## Changes Made

### 1. Skip Preference Check for IN_APP Notifications
- **File**: `backend/src/notifications/providers/notification.service.ts`
- **Change**: IN_APP notifications now bypass user preference checks
- **Reason**: In-app notifications should always be delivered regardless of preferences

### 2. Added Notification on User Follow
- **File**: `backend/src/user-follow/providers/user-follow.service.ts`
- **Change**: Sends notification when a user follows another user
- **Notification Type**: `NEW_FOLLOWER`
- **Channel**: `IN_APP` only

### 3. WebSocket Gateway Notification Subscription
- **File**: `backend/src/chat/providers/chat.gateway.ts`
- **Change**: Subscribes to user's notification channel on connection
- **Channel**: `notifications:user:{userId}`

## Testing Steps

### 1. Start Backend
```bash
cd backend
npm run start:dev
```

### 2. Start Frontend
```bash
cd gamein-frontend
npm run dev
```

### 3. Test Follow Notification

1. **Login as User A** (the user who will be followed)
   - Open browser and login
   - Open browser DevTools → Network → WS tab
   - Verify WebSocket connection is established

2. **Login as User B** (the user who will follow)
   - Open another browser/incognito window
   - Login with different account

3. **User B follows User A**
   - Navigate to User A's profile
   - Click "Follow" button
   - API call: `POST /users/follow` with `{ following_id: UserA.id }`

4. **Verify Notification**
   - **Backend**: Check logs for:
     ```
     Published notification event: NEW_FOLLOWER for user {UserA.id}
     In-app notification sent to user {UserA.id}
     ```
   - **Frontend (User A)**: 
     - Notification icon should show badge with count "1"
     - Click notification icon
     - Should see: "New Follower" notification
     - Message: "{UserB.username} started following you"

### 4. Verify Real-Time Delivery

1. **User A** should receive notification immediately (within 1-2 seconds)
2. **Check WebSocket**: In DevTools, should see `notification` event received
3. **Check Redux**: Notification should appear in Redux store
4. **Check UI**: Notification icon badge should update

## Expected Behavior

### Backend Flow
```
User B follows User A
  ↓
UserFollowService.follow()
  ↓
sendFollowNotification()
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
  └─→ Redis publish: notifications:user:{UserA.id}
      ↓
ChatGateway.subscribeToUserNotifications()
  ↓
client.emit('notification', data)
  ↓
Frontend receives via WebSocket
```

### Frontend Flow
```
WebSocket receives 'notification' event
  ↓
useNotificationSocket hook
  ↓
dispatch(addNotification())
  ↓
Redux store updated
  ↓
NotificationIcon shows badge
  ↓
User clicks icon → NotificationDropdown shows notification
```

## Verification Checklist

- [ ] Backend logs show notification published
- [ ] Backend logs show notification sent via IN_APP
- [ ] Database has notification record
- [ ] WebSocket connection established
- [ ] Frontend receives notification event
- [ ] Redux store has notification
- [ ] Notification icon shows unread count
- [ ] Dropdown shows notification
- [ ] Notification can be marked as read
- [ ] Notification can be deleted

## Troubleshooting

### Notification Not Appearing

1. **Check Kafka**: Verify Kafka is running and consumer is processing
2. **Check Redis**: Verify Redis connection and pub/sub working
3. **Check WebSocket**: Verify connection in browser DevTools
4. **Check Backend Logs**: Look for errors in notification service
5. **Check Frontend Console**: Look for WebSocket errors

### Preference Check Issue

- IN_APP notifications should bypass preferences
- Check `notification.service.ts` line 36: `if (channel !== NotificationChannel.IN_APP)`

### WebSocket Not Receiving

- Verify `subscribeToUserNotifications` is called in `handleConnection`
- Check Redis subscription is working
- Verify client is connected to correct WebSocket server

## Test Data

Example notification payload:
```json
{
  "type": "notification",
  "data": {
    "id": 1,
    "type": "NEW_FOLLOWER",
    "title": "New Follower",
    "message": "john_doe started following you",
    "data": {
      "followerId": 2,
      "followerName": "john_doe",
      "followerUsername": "john_doe",
      "followerProfilePic": null
    },
    "created_at": "2024-01-15T10:30:00Z"
  }
}
```

