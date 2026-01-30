/**
 * Newsfeed API endpoints
 */
export const NEWSFEED_ENDPOINTS = {
    GET_FEED: '/newsfeed/feed',
    GET_POST: (id) => `/newsfeed/posts/${id}`,
    GET_USER_POSTS: (userId) => `/newsfeed/posts/user/${userId}`,
    CREATE_POST: '/newsfeed/posts',
    CREATE_SYSTEM_POST: '/newsfeed/posts/system',
    UPDATE_POST: (id) => `/newsfeed/posts/${id}`,
    DELETE_POST: (id) => `/newsfeed/posts/${id}`,
    LIKE_POST: (id) => `/newsfeed/posts/${id}/like`,
    UNLIKE_POST: (id) => `/newsfeed/posts/${id}/like`,
    COMMENT_POST: (id) => `/newsfeed/posts/${id}/comments`,
    GET_POST_COMMENTS: (id) => `/newsfeed/posts/${id}/comments`,
    DELETE_COMMENT: (id) => `/newsfeed/comments/${id}`,
    SHARE_POST: (id) => `/newsfeed/posts/${id}/share`,
    GET_POST_LIKES: (id) => `/newsfeed/posts/${id}/likes`,
};

