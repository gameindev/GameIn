import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getNewsfeedService } from '../services/newsfeed.service';

// Async thunks
export const fetchFeed = createAsyncThunk(
    'feed/fetchFeed',
    async (params = {}, { rejectWithValue }) => {
        try {
            const service = getNewsfeedService();
            const response = await service.getFeed(params);
            // Backend returns: { success: true, data: [...], total: number, hasMore: boolean }
            // Service returns: response.data which is the above object
            // We need to return the object with data, total, hasMore properties
            console.log('fetchFeed response:', response);
            return response;
        } catch (error) {
            console.error('fetchFeed error:', error);
            return rejectWithValue(error.response?.data?.message || error.message || 'Failed to fetch feed');
        }
    }
);

export const fetchUserPosts = createAsyncThunk(
    'feed/fetchUserPosts',
    async ({ userId, ...params }, { rejectWithValue }) => {
        try {
            const service = getNewsfeedService();
            const response = await service.getUserPosts(userId, params);
            return { ...response, userId };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message || 'Failed to fetch user posts');
        }
    }
);

export const createPost = createAsyncThunk(
    'feed/createPost',
    async (postData, { rejectWithValue }) => {
        try {
            const service = getNewsfeedService();
            const response = await service.createPost(postData);
            // Backend returns { success: true, data: post }
            // Service returns response.data which is { success: true, data: post }
            // So we need to return response.data.data or response.data if it's already the post
            return response?.data || response;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message || 'Failed to create post');
        }
    }
);

export const updatePost = createAsyncThunk(
    'feed/updatePost',
    async ({ postId, postData }, { rejectWithValue }) => {
        try {
            const service = getNewsfeedService();
            const response = await service.updatePost(postId, postData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message || 'Failed to update post');
        }
    }
);

export const deletePost = createAsyncThunk(
    'feed/deletePost',
    async (postId, { rejectWithValue }) => {
        try {
            const service = getNewsfeedService();
            await service.deletePost(postId);
            return postId;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message || 'Failed to delete post');
        }
    }
);

export const toggleLikePost = createAsyncThunk(
    'feed/toggleLikePost',
    async ({ postId, isLiked }, { rejectWithValue }) => {
        try {
            const service = getNewsfeedService();
            let response;
            
            // Always call likePost - it handles toggle internally (like/unlike)
            // This matches Facebook behavior where clicking always toggles
            response = await service.likePost(postId);
            
            // The backend now returns the updated post with correct is_liked status
            const updatedPost = response?.data || response;
            
            return { 
                postId, 
                updatedPost: updatedPost
            };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message || 'Failed to toggle like');
        }
    }
);

export const addComment = createAsyncThunk(
    'feed/addComment',
    async ({ postId, commentData }, { rejectWithValue }) => {
        try {
            const service = getNewsfeedService();
            const response = await service.commentOnPost(postId, commentData);
            return { postId, comment: response.data };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message || 'Failed to add comment');
        }
    }
);

export const fetchPostComments = createAsyncThunk(
    'feed/fetchPostComments',
    async ({ postId, ...params }, { rejectWithValue }) => {
        try {
            const service = getNewsfeedService();
            const response = await service.getPostComments(postId, params);
            return { postId, ...response };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message || 'Failed to fetch comments');
        }
    }
);

export const removeComment = createAsyncThunk(
    'feed/removeComment',
    async (commentId, { rejectWithValue }) => {
        try {
            const service = getNewsfeedService();
            await service.deleteComment(commentId);
            return commentId;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message || 'Failed to delete comment');
        }
    }
);

export const sharePostAction = createAsyncThunk(
    'feed/sharePost',
    async ({ postId, shareData = {} }, { rejectWithValue }) => {
        try {
            const service = getNewsfeedService();
            const response = await service.sharePost(postId, shareData);
            return { postId, share: response.data };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message || 'Failed to share post');
        }
    }
);

const initialState = {
  posts: [],
    total: 0,
    hasMore: true,
    loading: false,
    error: null,
    offset: 0,
    limit: 20,
    userPosts: {}, // userId -> { posts: [], total: 0, hasMore: true }
    comments: {}, // postId -> { comments: [], total: 0, hasMore: true }
    likingPosts: {}, // postId -> true (tracks which posts are currently being liked/unliked)
};

const feedSlice = createSlice({
    name: 'feed',
  initialState,
  reducers: {
        clearFeed: (state) => {
            state.posts = [];
            state.total = 0;
            state.hasMore = true;
            state.offset = 0;
            state.error = null;
        },
        clearUserPosts: (state, action) => {
            const userId = action.payload;
            delete state.userPosts[userId];
        },
        clearPostComments: (state, action) => {
            const postId = action.payload;
            delete state.comments[postId];
        },
        updatePostInFeed: (state, action) => {
            // Ensure posts is an array
            if (!Array.isArray(state.posts)) {
                state.posts = [];
                return;
            }
            const updatedPost = action.payload;
            const index = state.posts.findIndex((p) => p.id === updatedPost.id);
            if (index !== -1) {
                state.posts[index] = { ...state.posts[index], ...updatedPost };
            }
        },
        updatePostLikeStatus: (state, action) => {
            // Ensure posts is an array
            if (!Array.isArray(state.posts)) {
                state.posts = [];
                return;
            }
            const { postId, isLiked, likeCount } = action.payload;
            const post = state.posts.find((p) => p.id === postId);
            if (post) {
                post.is_liked = isLiked;
                post.like_count = likeCount !== undefined ? likeCount : (isLiked ? (post.like_count || 0) + 1 : Math.max(0, (post.like_count || 0) - 1));
            }
        },
    },
    extraReducers: (builder) => {
        // Fetch feed
        builder
            .addCase(fetchFeed.pending, (state) => {
                console.log('fetchFeed.pending');
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFeed.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                
                console.log('fetchFeed.fulfilled payload:', action.payload);
                
                // Response structure: { apiVersion, status, data: { success: true, data: [...], total, hasMore } }
                // OR: { success: true, data: [...], total, hasMore }
                const response = action.payload;
                
                // Extract the actual feed data - could be response.data.data or response.data
                let feedData = response?.data || response;
                
                // If feedData still has a data property, extract it
                if (feedData?.data && typeof feedData.data === 'object') {
                    feedData = feedData.data;
                }
                
                // Now feedData should be: { success: true, data: [...], total, hasMore }
                // OR: { data: [...], total, hasMore }
                let postsArray = [];
                let total = 0;
                let hasMore = true;
                
                if (feedData) {
                    // Extract posts array
                    if (Array.isArray(feedData.data)) {
                        postsArray = feedData.data;
                        total = feedData.total ?? postsArray.length;
                        hasMore = feedData.hasMore !== undefined ? feedData.hasMore : true;
                    }
                    // If feedData itself is an array
                    else if (Array.isArray(feedData)) {
                        postsArray = feedData;
                        total = feedData.length;
                        hasMore = false;
                    }
                }
                
                console.log('Extracted posts:', postsArray.length, 'total:', total, 'hasMore:', hasMore);
                
                if (action.meta.arg?.offset === 0 || !action.meta.arg?.offset) {
                    // First page or refresh - always replace with fresh data (overwrites persisted state)
                    state.posts = postsArray;
                    state.offset = postsArray.length;
                } else {
                    // Append to existing posts
                    state.posts = [...(Array.isArray(state.posts) ? state.posts : []), ...postsArray];
                    state.offset = state.posts.length;
                }
                state.total = total;
                state.hasMore = hasMore;
                
                // Clear any temporary states that might have been persisted
                state.likingPosts = {};
            })
            .addCase(fetchFeed.rejected, (state, action) => {
                console.error('fetchFeed.rejected:', action.payload);
                state.loading = false;
                state.error = action.payload || 'Failed to load feed';
                // Ensure posts is still an array even on error
                if (!Array.isArray(state.posts)) {
                    state.posts = [];
                }
            });

        // Create post
        builder
            .addCase(createPost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                // Ensure posts is an array
                if (!Array.isArray(state.posts)) {
                    state.posts = [];
                }
                // Backend returns: { success: true, data: post }
                // Service returns: response.data which is the above object
                // Thunk returns: response.data (the object with data property)
                const response = action.payload;
                const newPost = response?.data || response;
                
                if (newPost && typeof newPost === 'object' && newPost.id) {
                    // Check if post already exists (shouldn't, but just in case)
                    const exists = state.posts.some(p => p.id === newPost.id);
                    if (!exists) {
                        state.posts.unshift(newPost);
                        state.total = (state.total || 0) + 1;
                    }
                }
            })
            .addCase(createPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Update post
        builder
            .addCase(updatePost.fulfilled, (state, action) => {
                // Ensure posts is an array
                if (!Array.isArray(state.posts)) {
                    state.posts = [];
                    return;
                }
                // Handle response structure: { success: true, data: post } or just post
                const updatedPost = action.payload?.data || action.payload;
                if (updatedPost) {
                    const index = state.posts.findIndex((p) => p.id === updatedPost.id);
                    if (index !== -1) {
                        state.posts[index] = updatedPost;
                    }
                }
            });

        // Delete post
        builder
            .addCase(deletePost.fulfilled, (state, action) => {
                // Ensure posts is an array
                if (!Array.isArray(state.posts)) {
                    state.posts = [];
                    return;
                }
                const postId = action.payload;
                state.posts = state.posts.filter((p) => p.id !== postId);
                state.total = Math.max(0, (state.total || 0) - 1);
            });

        // Toggle like
        builder
            .addCase(toggleLikePost.pending, (state, action) => {
                // Mark post as being liked/unliked to prevent multiple clicks
                const postId = action.meta.arg.postId;
                const isLiked = action.meta.arg.isLiked || false;
                state.likingPosts = state.likingPosts || {};
                state.likingPosts[postId] = true;
                
                // Optimistic update for immediate UI feedback
                if (Array.isArray(state.posts)) {
                    const postIndex = state.posts.findIndex((p) => p.id === postId);
                    if (postIndex !== -1) {
                        const post = state.posts[postIndex];
                        // Toggle optimistically
                        state.posts[postIndex] = {
                            ...post,
                            is_liked: !isLiked,
                            like_count: !isLiked 
                                ? (post.like_count || 0) + 1 
                                : Math.max(0, (post.like_count || 0) - 1),
                        };
                    }
                }
            })
            .addCase(toggleLikePost.fulfilled, (state, action) => {
                // Ensure posts is an array
                if (!Array.isArray(state.posts)) {
                    state.posts = [];
                    return;
                }
                const { postId, updatedPost } = action.payload;
                
                // Remove loading state
                if (state.likingPosts) {
                    delete state.likingPosts[postId];
                }
                
                const postIndex = state.posts.findIndex((p) => p.id === postId);
                if (postIndex !== -1 && updatedPost && updatedPost.id === postId) {
                    // Always use server data to ensure accuracy (Facebook-like behavior)
                    // Create a new post object to ensure React detects the change
                    state.posts[postIndex] = {
                        ...state.posts[postIndex],
                        is_liked: updatedPost.is_liked ?? false,
                        like_count: updatedPost.like_count ?? 0,
                    };
                }
            })
            .addCase(toggleLikePost.rejected, (state, action) => {
                // Remove loading state on error
                const postId = action.meta?.arg?.postId;
                const isLiked = action.meta?.arg?.isLiked || false;
                
                if (postId && state.likingPosts) {
                    delete state.likingPosts[postId];
                }
                
                // Revert optimistic update on error
                if (Array.isArray(state.posts)) {
                    const postIndex = state.posts.findIndex((p) => p.id === postId);
                    if (postIndex !== -1) {
                        const post = state.posts[postIndex];
                        // Revert to original state
                        state.posts[postIndex] = {
                            ...post,
                            is_liked: isLiked,
                            like_count: isLiked 
                                ? (post.like_count || 0) + 1 
                                : Math.max(0, (post.like_count || 0) - 1),
                        };
                    }
                }
            });

        // Add comment
        builder
            .addCase(addComment.fulfilled, (state, action) => {
                // Ensure posts is an array
                if (!Array.isArray(state.posts)) {
      state.posts = [];
                }
                const { postId, comment } = action.payload;
                const post = state.posts.find((p) => p.id === postId);
                if (post) {
                    post.comment_count = (post.comment_count || 0) + 1;
                }
                // Add to comments if they're loaded
                if (state.comments[postId] && Array.isArray(state.comments[postId].comments)) {
                    state.comments[postId].comments.unshift(comment);
                    state.comments[postId].total = (state.comments[postId].total || 0) + 1;
                }
            });

        // Fetch comments
        builder
            .addCase(fetchPostComments.fulfilled, (state, action) => {
                const { postId, data, total, hasMore } = action.payload;
                if (!state.comments[postId]) {
                    state.comments[postId] = { comments: [], total: 0, hasMore: true };
                }
                const offset = action.meta.arg.offset || 0;
                if (offset === 0) {
                    state.comments[postId].comments = data || [];
                } else {
                    state.comments[postId].comments = [...state.comments[postId].comments, ...(data || [])];
                }
                state.comments[postId].total = total || 0;
                state.comments[postId].hasMore = hasMore !== undefined ? hasMore : true;
            });

        // Remove comment
        builder
            .addCase(removeComment.fulfilled, (state, action) => {
                const commentId = action.payload;
                // Remove from all comment lists
                Object.keys(state.comments).forEach((postId) => {
                    state.comments[postId].comments = state.comments[postId].comments.filter(
                        (c) => c.id !== commentId
                    );
                    state.comments[postId].total = Math.max(0, state.comments[postId].total - 1);
                });
            });

        // Fetch user posts
        builder
            .addCase(fetchUserPosts.fulfilled, (state, action) => {
                const { userId, data, total, hasMore } = action.payload;
                if (!state.userPosts[userId]) {
                    state.userPosts[userId] = { posts: [], total: 0, hasMore: true };
                }
                const offset = action.meta.arg.offset || 0;
                if (offset === 0) {
                    state.userPosts[userId].posts = data || [];
                } else {
                    state.userPosts[userId].posts = [...state.userPosts[userId].posts, ...(data || [])];
                }
                state.userPosts[userId].total = total || 0;
                state.userPosts[userId].hasMore = hasMore !== undefined ? hasMore : true;
            });
  },
});

export const {
    clearFeed,
    clearUserPosts,
    clearPostComments,
    updatePostInFeed,
    updatePostLikeStatus,
} = feedSlice.actions;

export default feedSlice.reducer;
