import api from '../../../app/services/api';
import { NEWSFEED_ENDPOINTS } from '../api/newsfeed.api';

/**
 * Newsfeed Service
 * Handles all newsfeed-related API calls.
 * Use getNewsfeedService() in Redux thunks (hooks cannot run in thunks).
 * Use useNewsfeedService() in React components.
 */
const createNewsfeedService = () => {
    /**
     * Get user's feed
     * @param {Object} params - Query parameters
     * @param {number} params.limit - Number of posts to fetch
     * @param {number} params.offset - Pagination offset
     */
    const getFeed = async (params = {}) => {
        const { limit = 20, offset = 0 } = params;
        const response = await api.get(NEWSFEED_ENDPOINTS.GET_FEED, {
            params: { limit, offset },
        });
        return response.data;
    };

    /**
     * Get posts by a specific user
     * @param {number} userId - User ID
     * @param {Object} params - Query parameters
     * @param {number} params.limit - Number of posts to fetch
     * @param {number} params.offset - Pagination offset
     */
    const getUserPosts = async (userId, params = {}) => {
        const { limit = 20, offset = 0 } = params;
        const response = await api.get(NEWSFEED_ENDPOINTS.GET_USER_POSTS(userId), {
            params: { limit, offset },
        });
        return response.data;
    };

    /**
     * Get a single post by ID
     * @param {number} postId - Post ID
     */
    const getPost = async (postId) => {
        const response = await api.get(NEWSFEED_ENDPOINTS.GET_POST(postId));
        return response.data;
    };

    /**
     * Create a new post
     * @param {Object} postData - Post data
     * @param {string} postData.type - Post type (text, image, video, audio, mixed)
     * @param {string} postData.visibility - Post visibility (public, followers, private)
     * @param {string} postData.content - Post content
     * @param {string} postData.location - Optional location
     * @param {string[]} postData.hashtags - Optional hashtags
     * @param {number[]} postData.mentions - Optional user IDs mentioned
     * @param {Array} postData.media - Optional media attachments
     */
    const createPost = async (postData) => {
        const response = await api.post(NEWSFEED_ENDPOINTS.CREATE_POST, postData);
        return response.data;
    };

    /**
     * Create a system-generated post (admin only)
     * @param {Object} postData - System post data
     * @param {string} postData.type - Post type (text, image, video, audio, mixed)
     * @param {string} postData.visibility - Post visibility (public, followers, private)
     * @param {string} postData.content - Post content
     * @param {string} postData.system_category - System category (announcement, update, maintenance, feature)
     * @param {Array} postData.media - Optional media attachments
     */
    const createSystemPost = async (postData) => {
        const response = await api.post(NEWSFEED_ENDPOINTS.CREATE_SYSTEM_POST, postData);
        return response.data;
    };

    /**
     * Update a post
     * @param {number} postId - Post ID
     * @param {Object} postData - Updated post data
     */
    const updatePost = async (postId, postData) => {
        const response = await api.put(NEWSFEED_ENDPOINTS.UPDATE_POST(postId), postData);
        return response.data;
    };

    /**
     * Delete a post
     * @param {number} postId - Post ID
     */
    const deletePost = async (postId) => {
        const response = await api.delete(NEWSFEED_ENDPOINTS.DELETE_POST(postId));
        return response.data;
    };

    /**
     * Like a post
     * @param {number} postId - Post ID
     */
    const likePost = async (postId) => {
        const response = await api.post(NEWSFEED_ENDPOINTS.LIKE_POST(postId));
        return response.data;
    };

    /**
     * Unlike a post
     * @param {number} postId - Post ID
     */
    const unlikePost = async (postId) => {
        const response = await api.delete(NEWSFEED_ENDPOINTS.UNLIKE_POST(postId));
        return response.data;
    };

    /**
     * Comment on a post
     * @param {number} postId - Post ID
     * @param {Object} commentData - Comment data
     * @param {string} commentData.content - Comment content
     * @param {number} commentData.parent_comment_id - Optional parent comment ID for replies
     */
    const commentOnPost = async (postId, commentData) => {
        const response = await api.post(NEWSFEED_ENDPOINTS.COMMENT_POST(postId), commentData);
        return response.data;
    };

    /**
     * Get comments for a post
     * @param {number} postId - Post ID
     * @param {Object} params - Query parameters
     * @param {number} params.limit - Number of comments to fetch
     * @param {number} params.offset - Pagination offset
     * @param {number} params.parentCommentId - Optional parent comment ID for nested comments
     */
    const getPostComments = async (postId, params = {}) => {
        const { limit = 20, offset = 0, parentCommentId } = params;
        const queryParams = { limit, offset };
        if (parentCommentId) {
            queryParams.parentCommentId = parentCommentId;
        }
        const response = await api.get(NEWSFEED_ENDPOINTS.GET_POST_COMMENTS(postId), {
            params: queryParams,
        });
        return response.data;
    };

    /**
     * Delete a comment
     * @param {number} commentId - Comment ID
     */
    const deleteComment = async (commentId) => {
        const response = await api.delete(NEWSFEED_ENDPOINTS.DELETE_COMMENT(commentId));
        return response.data;
    };

    /**
     * Share a post
     * @param {number} postId - Post ID
     * @param {Object} shareData - Share data
     * @param {string} shareData.comment - Optional comment when sharing
     */
    const sharePost = async (postId, shareData = {}) => {
        const response = await api.post(NEWSFEED_ENDPOINTS.SHARE_POST(postId), shareData);
        return response.data;
    };

    /**
     * Get users who liked a post
     * @param {number} postId - Post ID
     * @param {Object} params - Query parameters
     * @param {number} params.limit - Number of likes to fetch
     * @param {number} params.offset - Pagination offset
     */
    const getPostLikes = async (postId, params = {}) => {
        const { limit = 50, offset = 0 } = params;
        const response = await api.get(NEWSFEED_ENDPOINTS.GET_POST_LIKES(postId), {
            params: { limit, offset },
        });
        return response.data;
    };

    return {
        getFeed,
        getUserPosts,
        getPost,
        createPost,
        createSystemPost,
        updatePost,
        deletePost,
        likePost,
        unlikePost,
        commentOnPost,
        getPostComments,
        deleteComment,
        sharePost,
        getPostLikes,
    };
};

/** Use in Redux thunks - do not call useNewsfeedService() inside thunks. */
export const getNewsfeedService = createNewsfeedService;

/** Use in React components only. */
export const useNewsfeedService = () => createNewsfeedService();

