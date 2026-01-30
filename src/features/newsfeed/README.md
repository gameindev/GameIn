# Newsfeed Feature

This feature provides a complete newsfeed system with posts, media, likes, comments, and shares.

## Structure

```
newsfeed/
├── api/
│   └── newsfeed.api.js          # API endpoint constants
├── services/
│   └── newsfeed.service.js       # API service layer
├── store/
│   └── feedSlice.js              # Redux slice with async thunks
├── components/
│   ├── AddPostBox.jsx            # Post creation trigger
│   ├── AddPostModal.jsx          # Post creation modal with file upload
│   └── UserPosts.jsx             # Feed display component
└── pages/
    └── NewsFeed.jsx              # Main newsfeed page
```

## Features

### ✅ Implemented

1. **Post Creation**
   - Text posts
   - Image posts (single/multiple)
   - Video posts
   - Mixed media posts
   - Visibility settings (public, followers, private)
   - Location tagging
   - Hashtag support

2. **Feed Display**
   - Personalized feed based on following
   - Pagination with "Load More"
   - Media carousel for multiple images
   - Video playback
   - Like/unlike functionality
   - Post metadata (date, location, hashtags)

3. **Redux State Management**
   - Feed caching
   - Optimistic updates
   - Error handling
   - Loading states

## API Integration

### Endpoints Used

- `GET /newsfeed/feed` - Get user's personalized feed
- `POST /newsfeed/posts` - Create a new post
- `POST /newsfeed/posts/:id/like` - Like a post
- `DELETE /newsfeed/posts/:id/like` - Unlike a post
- `POST /uploads/file` - Upload media files

### Service Methods

```javascript
const service = useNewsfeedService();

// Get feed
await service.getFeed({ limit: 20, offset: 0 });

// Create post
await service.createPost({
  type: 'image',
  visibility: 'public',
  content: 'Post content',
  media: [{ upload_id: 1, media_type: 'image', order: 0 }]
});

// Like/Unlike
await service.likePost(postId);
await service.unlikePost(postId);
```

## Redux Actions

### Async Thunks

- `fetchFeed(params)` - Fetch feed with pagination
- `createPost(postData)` - Create a new post
- `toggleLikePost({ postId, isLiked })` - Toggle like status
- `addComment({ postId, commentData })` - Add comment
- `deletePost(postId)` - Delete a post

### State Structure

```javascript
{
  posts: [],           // Array of post objects
  total: 0,            // Total posts count
  hasMore: true,       // Whether more posts available
  loading: false,      // Loading state
  error: null,         // Error message
  offset: 0,          // Current pagination offset
  limit: 20,          // Posts per page
  userPosts: {},      // User-specific posts cache
  comments: {},       // Post comments cache
}
```

## Usage

### In Components

```jsx
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { fetchFeed, createPost } from '../store/feedSlice';

function MyComponent() {
  const dispatch = useAppDispatch();
  const { posts, loading } = useAppSelector(state => state.feed);

  useEffect(() => {
    dispatch(fetchFeed({ limit: 20, offset: 0 }));
  }, [dispatch]);

  // ...
}
```

## File Upload

Files are uploaded to `/uploads/file` endpoint before creating the post. The upload returns an upload entity with `id`, `path`, `type`, etc., which is then used in the post creation payload.

## Media Types Supported

- **Images**: PNG, JPEG, WebP
- **Videos**: MP4, WebM, etc.
- **Audio**: MP3, WAV, etc.
- **Documents**: PDF, etc.

## Future Enhancements

- [ ] Comment display and management
- [ ] Share functionality
- [ ] Post editing
- [ ] Hashtag click navigation
- [ ] User mentions
- [ ] Real-time updates via WebSocket
- [ ] Infinite scroll
- [ ] Post detail view

