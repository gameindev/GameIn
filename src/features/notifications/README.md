# Frontend Notification System

A complete in-app notification system with real-time WebSocket support, integrated into the Header component.

## Features

- ✅ **Real-time Notifications**: WebSocket integration for instant notifications
- ✅ **Notification Icon**: Bell icon with unread count badge in Header
- ✅ **Dropdown Menu**: Full notification list with actions
- ✅ **Redux State Management**: Centralized notification state
- ✅ **Mark as Read**: Individual and bulk mark as read
- ✅ **Delete Notifications**: Remove unwanted notifications
- ✅ **Infinite Scroll**: Load more notifications on scroll
- ✅ **Unread Count**: Real-time unread count display

## Structure

```
notifications/
├── api/
│   └── notifications.api.js          # API endpoints
├── components/
│   ├── NotificationDropdown.jsx     # Main dropdown component
│   ├── NotificationIcon.jsx          # Bell icon with badge
│   └── NotificationItem.jsx         # Individual notification item
├── hooks/
│   ├── useNotifications.js          # Main notification hook
│   └── useNotificationSocket.js     # WebSocket hook
├── services/
│   └── notifications.service.js     # API service
├── store/
│   └── notificationsSlice.js        # Redux slice
└── index.js                         # Exports
```

## Usage

### In Header Component

The notification system is already integrated into the Header. It automatically:
- Connects to WebSocket when user is logged in
- Fetches notifications on mount
- Displays unread count
- Shows dropdown on click

### Using the Hook

```jsx
import { useNotifications } from '../features/notifications';

function MyComponent() {
    const {
        notifications,
        unreadCount,
        loading,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        refresh,
    } = useNotifications();

    return (
        <div>
            <p>Unread: {unreadCount}</p>
            {notifications.map(notif => (
                <div key={notif.id}>
                    {notif.title}
                </div>
            ))}
        </div>
    );
}
```

### WebSocket Integration

The system automatically listens for `notification` events from the WebSocket server. When a notification is received:

1. It's added to Redux store
2. Unread count is updated
3. UI is automatically updated

### API Endpoints

The service uses these endpoints:
- `GET /notifications` - Get notifications
- `GET /notifications/preferences` - Get preferences
- `PUT /notifications/preferences` - Update preference
- `PUT /notifications/:id/read` - Mark as read
- `PUT /notifications/read-all` - Mark all as read
- `DELETE /notifications/:id` - Delete notification

## Components

### NotificationDropdown

Main dropdown component that shows all notifications.

**Props:** None (uses Redux state)

**Features:**
- Scrollable list
- Infinite scroll
- Mark all as read button
- Individual notification actions

### NotificationIcon

Bell icon with unread count badge.

**Props:**
- `onClick` - Click handler
- `className` - Additional CSS classes

### NotificationItem

Individual notification item in the list.

**Props:**
- `notification` - Notification object

**Features:**
- Mark as read on click
- Delete button
- Unread indicator
- Time ago display

## Redux State

```javascript
{
    notifications: {
        notifications: [],      // Array of notifications
        unreadCount: 0,         // Number of unread notifications
        total: 0,               // Total notifications
        loading: false,         // Loading state
        error: null,            // Error message
        hasMore: true,          // Whether more notifications available
        lastFetched: null,       // Last fetch timestamp
    }
}
```

## WebSocket Events

The system listens for:
- `notification` - New notification received

## Styling

Uses Mantine UI components with dark theme. Customizable via Mantine theme.

## Future Enhancements

- [ ] Notification preferences UI
- [ ] Notification sound
- [ ] Desktop notifications
- [ ] Notification categories/filters
- [ ] Notification search

