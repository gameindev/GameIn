# System-Generated Posts Feature

## Overview

The newsfeed system now supports two types of posts:
1. **User-generated posts** - Created by users
2. **System-generated posts** - Created by administrators/system for announcements, updates, etc.

## Backend Changes

### New Enum
- `PostSource` enum with values: `USER`, `SYSTEM`

### Entity Updates
- Added `source` field to `Post` entity (default: `USER`)
- Added `system_category` field for categorizing system posts (e.g., 'announcement', 'update', 'maintenance', 'feature')
- Made `user_id` nullable (null for system posts)

### New DTO
- `CreateSystemPostDto` - For creating system posts (no user_id required)

### Service Methods
- `createSystemPost(dto)` - Creates a system post
- Updated `getUserFeed()` - Now includes system posts in all feeds
- Updated `canViewPost()` - System posts are always viewable

### API Endpoints
- `POST /newsfeed/posts/system` - Create system post (admin only - TODO: add admin guard)

### Migration
- `1765000000003-AddPostSourceToPosts.ts` - Adds source enum, system_category, and indexes

## Frontend Changes

### Service Updates
- Added `createSystemPost()` method to newsfeed service

### Component Updates
- `UserPosts.jsx` - Displays system posts with a badge indicator
- System posts show "System Update" badge
- System posts may have likes disabled (configurable)

## Usage

### Creating a System Post (Backend)

```typescript
const systemPost = await newsfeedService.createSystemPost({
    type: PostType.TEXT,
    visibility: PostVisibility.PUBLIC,
    content: 'New feature announcement!',
    system_category: 'announcement',
    media: [] // Optional
});
```

### Creating a System Post (Frontend)

```javascript
const service = useNewsfeedService();
await service.createSystemPost({
    type: 'text',
    visibility: 'public',
    content: 'New feature announcement!',
    system_category: 'announcement',
});
```

## Feed Behavior

- **User Feed**: Includes both user posts (from followed users + own posts) AND all system posts
- **System Posts**: Always visible to all users (public by default)
- **Ordering**: System posts appear in feed chronologically with user posts, pinned posts first

## System Post Categories

Suggested categories:
- `announcement` - General announcements
- `update` - Platform updates
- `maintenance` - Maintenance notices
- `feature` - New feature announcements
- `security` - Security-related updates
- `event` - Event announcements

## Security Considerations

1. **Admin Guard**: Add `@UseGuards(AdminGuard)` to system post creation endpoint
2. **Validation**: Ensure only admins can create system posts
3. **Rate Limiting**: Consider rate limiting system post creation

## Future Enhancements

- [ ] Add admin guard to system post endpoint
- [ ] System post templates
- [ ] Scheduled system posts
- [ ] System post analytics
- [ ] User preferences for system post categories
- [ ] System post expiration dates

