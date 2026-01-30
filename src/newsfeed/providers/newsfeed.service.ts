import {
    Injectable,
    NotFoundException,
    ForbiddenException,
    BadRequestException,
    Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, Not, DataSource } from 'typeorm';
import { Post } from '../entities/post.entity';
import { PostMedia } from '../entities/post-media.entity';
import { PostLike } from '../entities/post-like.entity';
import { PostComment } from '../entities/post-comment.entity';
import { PostShare } from '../entities/post-share.entity';
import { UserFollow } from '../../user-follow/user-follow.entity';
import { CreatePostDto } from '../dtos/create-post.dto';
import { UpdatePostDto } from '../dtos/update-post.dto';
import { CreateCommentDto } from '../dtos/create-comment.dto';
import { CreateShareDto } from '../dtos/create-share.dto';
import { PostVisibility } from '../enums/post-visibility.enum';
import { PostType } from '../enums/post-type.enum';
import { PostSource } from '../enums/post-source.enum';
import { SystemPostCategory } from '../enums/system-post-category.enum';
import { NewsfeedCacheService } from './newsfeed-cache.service';
import { CreateSystemPostDto } from '../dtos/create-system-post.dto';
import { NotificationEventsService } from '../../notifications/providers/notification-events.service';
import { NotificationType } from '../../notifications/enums/notification-type.enum';
import { NotificationChannel } from '../../notifications/enums/notification-channel.enum';
import { User } from '../../users/user.entity';

@Injectable()
export class NewsfeedService {
    private readonly logger = new Logger(NewsfeedService.name);

    constructor(
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>,
        @InjectRepository(PostMedia)
        private readonly postMediaRepository: Repository<PostMedia>,
        @InjectRepository(PostLike)
        private readonly postLikeRepository: Repository<PostLike>,
        @InjectRepository(PostComment)
        private readonly postCommentRepository: Repository<PostComment>,
        @InjectRepository(PostShare)
        private readonly postShareRepository: Repository<PostShare>,
        @InjectRepository(UserFollow)
        private readonly userFollowRepository: Repository<UserFollow>,
        private readonly dataSource: DataSource,
        private readonly cacheService: NewsfeedCacheService,
        private readonly notificationEvents: NotificationEventsService,
    ) {}

    /**
     * Create a new post
     */
    async createPost(userId: number, dto: CreatePostDto): Promise<Post> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            // Create post
            const post = this.postRepository.create({
                user_id: userId,
                type: dto.type,
                visibility: dto.visibility || PostVisibility.PUBLIC,
                content: dto.content,
                location: dto.location,
                hashtags: dto.hashtags || [],
                mentions: dto.mentions || [],
                metadata: dto.metadata,
                source: PostSource.USER,
            });

            const savedPost = await queryRunner.manager.save(Post, post);

            // Create media attachments if provided
            if (dto.media && dto.media.length > 0) {
                const mediaEntities = dto.media.map((mediaDto, index) =>
                    this.postMediaRepository.create({
                        post_id: savedPost.id,
                        upload_id: mediaDto.upload_id,
                        media_type: mediaDto.media_type,
                        order: mediaDto.order ?? index,
                        caption: mediaDto.caption,
                        metadata: mediaDto.metadata,
                    }),
                );

                await queryRunner.manager.save(PostMedia, mediaEntities);
            }

            await queryRunner.commitTransaction();

            // Invalidate cache
            await this.cacheService.invalidateUserFeed(userId);
            // Invalidate followers' feeds (async, don't wait)
            this.invalidateFollowersFeeds(userId).catch((err) =>
                this.logger.error('Error invalidating followers feeds', err),
            );

            // Load full post with relations
            return this.getPostById(savedPost.id, userId);
        } catch (error) {
            await queryRunner.rollbackTransaction();
            this.logger.error(`Error creating post: ${error.message}`, error.stack);
            throw new BadRequestException('Failed to create post');
        } finally {
            await queryRunner.release();
        }
    }

    /**
     * Create a system-generated post (admin only)
     * Supports user-specific system posts (e.g., welcome posts) via user_id
     */
    async createSystemPost(dto: CreateSystemPostDto): Promise<Post> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            // Create system post
            // user_id is set for user-specific system posts (e.g., welcome posts)
            // user_id is null for broadcast/system-wide posts
            const post = this.postRepository.create({
                user_id: dto.user_id || null,
                type: dto.type,
                visibility: dto.visibility || PostVisibility.PUBLIC,
                content: dto.content,
                system_category: dto.system_category,
                metadata: dto.metadata,
                source: PostSource.SYSTEM,
            });

            const savedPost = await queryRunner.manager.save(Post, post);

            // Create media attachments if provided
            if (dto.media && dto.media.length > 0) {
                const mediaEntities = dto.media.map((mediaDto, index) =>
                    this.postMediaRepository.create({
                        post_id: savedPost.id,
                        upload_id: mediaDto.upload_id,
                        media_type: mediaDto.media_type,
                        order: mediaDto.order ?? index,
                        caption: mediaDto.caption,
                        metadata: mediaDto.metadata,
                    }),
                );

                await queryRunner.manager.save(PostMedia, mediaEntities);
            }

            await queryRunner.commitTransaction();

            // Invalidate cache based on system post category
            if (dto.system_category === SystemPostCategory.WELCOME && dto.user_id) {
                // Welcome posts: only invalidate the specific user's feed
                await this.cacheService.invalidateUserFeed(dto.user_id);
            } else if (dto.system_category === SystemPostCategory.BROADCAST || dto.system_category === SystemPostCategory.STATISTICS) {
                // Broadcast/Statistics: invalidate all user feeds
                this.invalidateAllFeeds().catch((err) =>
                    this.logger.error('Error invalidating all feeds', err),
                );
            } else if (dto.system_category === SystemPostCategory.CREATOR_BRAND_COLLISION) {
                // Collision posts: invalidate feeds of involved users (from metadata)
                const brandId = dto.metadata?.brandId;
                const creatorId = dto.metadata?.creatorId;
                if (brandId) await this.cacheService.invalidateUserFeed(brandId);
                if (creatorId) await this.cacheService.invalidateUserFeed(creatorId);
            }

            // Load full post with relations
            return this.getPostById(savedPost.id, dto.user_id);
        } catch (error) {
            await queryRunner.rollbackTransaction();
            this.logger.error(`Error creating system post: ${error.message}`, error.stack);
            throw new BadRequestException('Failed to create system post');
        } finally {
            await queryRunner.release();
        }
    }

    /**
     * Update a post
     */
    async updatePost(postId: number, userId: number, dto: UpdatePostDto): Promise<Post> {
        const post = await this.postRepository.findOne({
            where: { id: postId, user_id: userId },
        });

        if (!post) {
            throw new NotFoundException('Post not found or you do not have permission to edit it');
        }

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            // Update post fields
            if (dto.visibility !== undefined) post.visibility = dto.visibility;
            if (dto.content !== undefined) post.content = dto.content;
            if (dto.location !== undefined) post.location = dto.location;
            if (dto.hashtags !== undefined) post.hashtags = dto.hashtags;
            if (dto.mentions !== undefined) post.mentions = dto.mentions;
            if (dto.metadata !== undefined) post.metadata = dto.metadata;
            post.is_edited = true;

            await queryRunner.manager.save(Post, post);

            // Update media if provided
            if (dto.media !== undefined) {
                // Delete existing media
                await queryRunner.manager.delete(PostMedia, { post_id: postId });

                // Create new media
                if (dto.media.length > 0) {
                    const mediaEntities = dto.media.map((mediaDto, index) =>
                        this.postMediaRepository.create({
                            post_id: postId,
                            upload_id: mediaDto.upload_id,
                            media_type: mediaDto.media_type,
                            order: mediaDto.order ?? index,
                            caption: mediaDto.caption,
                            metadata: mediaDto.metadata,
                        }),
                    );

                    await queryRunner.manager.save(PostMedia, mediaEntities);
                }
            }

            await queryRunner.commitTransaction();

            // Invalidate cache
            await this.cacheService.invalidatePost(postId);
            await this.cacheService.invalidateUserFeed(userId);

            return this.getPostById(postId, userId);
        } catch (error) {
            await queryRunner.rollbackTransaction();
            this.logger.error(`Error updating post: ${error.message}`, error.stack);
            throw new BadRequestException('Failed to update post');
        } finally {
            await queryRunner.release();
        }
    }

    /**
     * Delete a post (soft delete)
     */
    async deletePost(postId: number, userId: number): Promise<void> {
        const post = await this.postRepository.findOne({
            where: { id: postId, user_id: userId },
        });

        if (!post) {
            throw new NotFoundException('Post not found or you do not have permission to delete it');
        }

        await this.postRepository.softDelete(postId);

        // Invalidate cache
        await this.cacheService.invalidatePost(postId);
        await this.cacheService.invalidateUserFeed(userId);
    }

    /**
     * Get a single post by ID
     */
    async getPostById(postId: number, userId?: number): Promise<Post> {
        // System posts don't require user context for viewing
        // Check cache first
        if (userId) {
            const cached = await this.cacheService.getPost(postId);
            if (cached) {
                // Still need to check visibility and add interactions
                if (await this.canViewPost(cached, userId)) {
                    const interactions = await this.getUserInteractionsBatch(userId, [postId]);
                    cached['is_liked'] = interactions[postId]?.liked || false;
                    cached['is_shared'] = interactions[postId]?.shared || false;
                    return cached;
                }
            }
        }

        const post = await this.postRepository.findOne({
            where: { id: postId },
            relations: ['user', 'media', 'media.upload', 'likes', 'comments', 'comments.user'],
            order: {
                media: { order: 'ASC' },
                comments: { created_at: 'ASC' },
            },
        });

        if (!post) {
            throw new NotFoundException('Post not found');
        }

        // Check visibility (system posts don't need user context)
        if (userId && post.source !== PostSource.SYSTEM && !(await this.canViewPost(post, userId))) {
            throw new ForbiddenException('You do not have permission to view this post');
        }

        // Add user interaction status
        if (userId) {
            const interactions = await this.getUserInteractionsBatch(userId, [postId]);
            post['is_liked'] = interactions[postId]?.liked || false;
            post['is_shared'] = interactions[postId]?.shared || false;
        }

        // Cache the post
        await this.cacheService.setPost(postId, post);

        return post;
    }

    /**
     * Get user's feed (posts from users they follow + their own posts)
     * Optimized with caching and batch queries
     */
    async getUserFeed(
        userId: number,
        limit: number = 20,
        offset: number = 0,
    ): Promise<{ posts: Post[]; total: number; hasMore: boolean }> {
        // Check cache first
        const cacheKey = { userId, limit, offset };
        const cached = await this.cacheService.getFeed(userId, limit, offset);
        if (cached) {
            return cached;
        }

        // Get following IDs (cached)
        let followingIds = await this.cacheService.getFollowingIds(userId);
        if (!followingIds) {
            // Optimize: Only select IDs, not full objects
            const following = await this.userFollowRepository
                .createQueryBuilder('uf')
                .select('uf.following_id', 'following_id')
                .where('uf.follower_id = :userId', { userId })
                .getRawMany();

            followingIds = following.map((f) => f.following_id);
            followingIds.push(userId); // Include own posts

            // Cache following list
            await this.cacheService.setFollowingIds(userId, followingIds);
        } else {
            // Ensure own posts are included
            if (!followingIds.includes(userId)) {
                followingIds.push(userId);
            }
        }

        // Handle large following lists efficiently
        // For very large lists (>1000), consider using temporary table or array operations
        if (followingIds.length === 0) {
            // User follows no one, only show their own posts
            followingIds = [userId];
        }

        // Build query for feed - includes user posts and system posts
        // System posts filtering:
        // - WELCOME: only show if user_id matches current user
        // - BROADCAST/STATISTICS: show to all users
        // - CREATOR_BRAND_COLLISION: show to all users (or filter by metadata if needed)
        const queryBuilder = this.postRepository
            .createQueryBuilder('post')
            .leftJoinAndSelect('post.user', 'user')
            .leftJoinAndSelect('post.media', 'media')
            .leftJoinAndSelect('media.upload', 'upload')
            .where('post.deleted_at IS NULL')
            .andWhere(
                `(
                    (post.source = :system AND (
                        (post.system_category = :welcome AND post.user_id = :userId) OR
                        (post.system_category = :broadcast) OR
                        (post.system_category = :statistics) OR
                        (post.system_category = :collision)
                    )) OR
                    (post.user_id IN (:...userIds) AND (post.visibility = :public OR post.visibility = :followers OR post.user_id = :userId))
                )`,
                {
                    system: PostSource.SYSTEM,
                    welcome: SystemPostCategory.WELCOME,
                    broadcast: SystemPostCategory.BROADCAST,
                    statistics: SystemPostCategory.STATISTICS,
                    collision: SystemPostCategory.CREATOR_BRAND_COLLISION,
                    userIds: followingIds,
                    public: PostVisibility.PUBLIC,
                    followers: PostVisibility.FOLLOWERS,
                    userId,
                },
            )
            .orderBy('post.is_pinned', 'DESC')
            .addOrderBy('post.created_at', 'DESC')
            .skip(offset)
            .take(limit);

        const [posts, total] = await queryBuilder.getManyAndCount();

        // Batch query user interactions (fixes N+1 problem)
        const postIds = posts.map((p) => p.id);
        const interactions = await this.getUserInteractionsBatch(userId, postIds);

        // Add user interaction status
        for (const post of posts) {
            const interaction = interactions[post.id] || { liked: false, shared: false };
            post['is_liked'] = interaction.liked;
            post['is_shared'] = interaction.shared;
        }

        const result = {
            posts,
            total,
            hasMore: offset + posts.length < total,
        };

        // Cache the result
        await this.cacheService.setFeed(userId, limit, offset, result);

        return result;
    }

    /**
     * Get posts by a specific user
     */
    async getUserPosts(
        targetUserId: number,
        currentUserId: number,
        limit: number = 20,
        offset: number = 0,
    ): Promise<{ posts: Post[]; total: number; hasMore: boolean }> {
        const isOwnProfile = targetUserId === currentUserId;

        const queryBuilder = this.postRepository
            .createQueryBuilder('post')
            .leftJoinAndSelect('post.user', 'user')
            .leftJoinAndSelect('post.media', 'media')
            .leftJoinAndSelect('media.upload', 'upload')
            .where('post.deleted_at IS NULL')
            .andWhere(
                '(post.user_id = :targetUserId OR (post.source = :system AND post.system_category = :welcome AND post.user_id = :targetUserId))',
                {
                    targetUserId,
                    system: PostSource.SYSTEM,
                    welcome: SystemPostCategory.WELCOME,
                },
            )
            .orderBy('post.is_pinned', 'DESC')
            .addOrderBy('post.created_at', 'DESC')
            .skip(offset)
            .take(limit);

        // Apply visibility filter if not own profile
        if (!isOwnProfile) {
            // Check if current user follows target user
            const isFollowing = await this.userFollowRepository.findOne({
                where: {
                    follower: { id: currentUserId },
                    following: { id: targetUserId },
                },
            });

            if (isFollowing) {
                queryBuilder.andWhere(
                    '(post.visibility = :public OR post.visibility = :followers)',
                    {
                        public: PostVisibility.PUBLIC,
                        followers: PostVisibility.FOLLOWERS,
                    },
                );
            } else {
                queryBuilder.andWhere('post.visibility = :public', {
                    public: PostVisibility.PUBLIC,
                });
            }
        }

        const [posts, total] = await queryBuilder.getManyAndCount();

        // Batch query user interactions (fixes N+1 problem)
        const postIds = posts.map((p) => p.id);
        const interactions = await this.getUserInteractionsBatch(currentUserId, postIds);

        // Add user interaction status
        for (const post of posts) {
            const interaction = interactions[post.id] || { liked: false, shared: false };
            post['is_liked'] = interaction.liked;
            post['is_shared'] = interaction.shared;
        }

        return {
            posts,
            total,
            hasMore: offset + posts.length < total,
        };
    }

    /**
     * Like a post
     */
    async likePost(postId: number, userId: number): Promise<PostLike | null> {
        // Check if already liked - if so, toggle by unliking instead
        const existingLike = await this.postLikeRepository.findOne({
            where: { post_id: postId, user_id: userId },
        });

        if (existingLike) {
            // Already liked, so unlike it (toggle behavior) - do it directly to avoid recursion
            const post = await this.postRepository.findOne({
                where: { id: postId },
                select: ['id', 'user_id'],
            });

            if (!post) {
                throw new NotFoundException('Post not found');
            }

            const postOwnerId = post.user_id;

            const queryRunner = this.dataSource.createQueryRunner();
            await queryRunner.connect();
            await queryRunner.startTransaction();

            try {
                await queryRunner.manager.remove(PostLike, existingLike);

                // Update post like count
                const postToUpdate = await queryRunner.manager.findOne(Post, {
                    where: { id: postId },
                    select: ['id', 'like_count'],
                });
                
                if (postToUpdate) {
                    postToUpdate.like_count = Math.max(0, (postToUpdate.like_count || 0) - 1);
                    await queryRunner.manager.save(Post, postToUpdate);
                }

                await queryRunner.commitTransaction();

                // Invalidate cache
                await this.cacheService.invalidatePost(postId);
                await this.cacheService.invalidateUserFeed(userId);
                await this.cacheService.invalidateUserInteractions(userId); // Invalidate interaction cache
                if (postOwnerId && postOwnerId !== userId) {
                    await this.cacheService.invalidateUserFeed(postOwnerId);
                    await this.cacheService.invalidateUserInteractions(postOwnerId); // Invalidate owner's interaction cache too
                }
            } catch (error) {
                await queryRunner.rollbackTransaction();
                this.logger.error(`Error unliking post: ${error.message}`, error.stack);
                throw new BadRequestException('Failed to unlike post');
            } finally {
                await queryRunner.release();
            }

            return null; // Return null to indicate it was unliked
        }

        // Get post to find the owner for cache invalidation and notification
        const post = await this.postRepository.findOne({
            where: { id: postId },
            relations: ['user'],
            select: ['id', 'user_id', 'content'],
        });

        if (!post) {
            throw new NotFoundException('Post not found');
        }

        const postOwnerId = post.user_id;

        // Get liker's user info for notification
        const liker = await this.dataSource.getRepository(User).findOne({
            where: { id: userId },
            select: ['id', 'username'],
        });

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            // Create like
            const like = this.postLikeRepository.create({
                post_id: postId,
                user_id: userId,
            });

            const savedLike = await queryRunner.manager.save(PostLike, like);

            // Update post like count
            await queryRunner.manager.increment(Post, { id: postId }, 'like_count', 1);

            await queryRunner.commitTransaction();

            // Invalidate cache for both the liker and the post owner
            await this.cacheService.invalidatePost(postId);
            await this.cacheService.invalidateUserFeed(userId);
            await this.cacheService.invalidateUserInteractions(userId); // Invalidate interaction cache
            if (postOwnerId && postOwnerId !== userId) {
                // Invalidate post owner's feed so they see the updated like count
                await this.cacheService.invalidateUserFeed(postOwnerId);
                await this.cacheService.invalidateUserInteractions(postOwnerId); // Invalidate owner's interaction cache too
                
                // Send notification to post owner (only if not their own post)
                if (liker && postOwnerId) {
                    try {
                        const postPreview = post.content 
                            ? (post.content.length > 50 ? post.content.substring(0, 50) + '...' : post.content)
                            : 'your post';
                        
                        await this.notificationEvents.notifyUser(
                            postOwnerId,
                            NotificationType.POST_LIKED,
                            'New Like',
                            `${liker.username} liked your post${post.content ? `: "${postPreview}"` : ''}`,
                            {
                                channels: [NotificationChannel.IN_APP],
                                data: {
                                    postId: postId,
                                    likerId: userId,
                                    likerUsername: liker.username,
                                    postPreview: postPreview,
                                },
                                priority: 'normal',
                            },
                        );
                    } catch (error) {
                        // Log error but don't fail the like operation
                        this.logger.error(`Failed to send like notification: ${error.message}`, error.stack);
                    }
                }
            }

            return savedLike;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            this.logger.error(`Error liking post: ${error.message}`, error.stack);
            if (error instanceof BadRequestException || error instanceof NotFoundException) {
                throw error;
            }
            throw new BadRequestException('Failed to like post');
        } finally {
            await queryRunner.release();
        }
    }

    /**
     * Unlike a post
     */
    async unlikePost(postId: number, userId: number): Promise<void> {
        const like = await this.postLikeRepository.findOne({
            where: { post_id: postId, user_id: userId },
        });

        if (!like) {
            // Not liked, so like it (toggle behavior) - call the internal like logic directly
            // to avoid recursion
            const post = await this.postRepository.findOne({
                where: { id: postId },
                select: ['id', 'user_id'],
            });

            if (!post) {
                throw new NotFoundException('Post not found');
            }

            const postOwnerId = post.user_id;

            const queryRunner = this.dataSource.createQueryRunner();
            await queryRunner.connect();
            await queryRunner.startTransaction();

            try {
                // Create like
                const newLike = this.postLikeRepository.create({
                    post_id: postId,
                    user_id: userId,
                });

                await queryRunner.manager.save(PostLike, newLike);

                // Update post like count
                await queryRunner.manager.increment(Post, { id: postId }, 'like_count', 1);

                await queryRunner.commitTransaction();

                // Invalidate cache
                await this.cacheService.invalidatePost(postId);
                await this.cacheService.invalidateUserFeed(userId);
                await this.cacheService.invalidateUserInteractions(userId); // Invalidate interaction cache
                if (postOwnerId && postOwnerId !== userId) {
                    await this.cacheService.invalidateUserFeed(postOwnerId);
                    await this.cacheService.invalidateUserInteractions(postOwnerId); // Invalidate owner's interaction cache too
                }
            } catch (error) {
                await queryRunner.rollbackTransaction();
                this.logger.error(`Error liking post: ${error.message}`, error.stack);
                throw new BadRequestException('Failed to like post');
            } finally {
                await queryRunner.release();
            }
            return;
        }

        // Get post to find the owner for cache invalidation
        const post = await this.postRepository.findOne({
            where: { id: postId },
            select: ['id', 'user_id'],
        });

        if (!post) {
            throw new NotFoundException('Post not found');
        }

        const postOwnerId = post.user_id;

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            await queryRunner.manager.remove(PostLike, like);

            // Update post like count - use explicit update to ensure it works
            // First get the current post to check the count
            const postToUpdate = await queryRunner.manager.findOne(Post, {
                where: { id: postId },
                select: ['id', 'like_count'],
            });
            
            if (postToUpdate) {
                // Decrement and ensure it doesn't go below 0
                postToUpdate.like_count = Math.max(0, (postToUpdate.like_count || 0) - 1);
                await queryRunner.manager.save(Post, postToUpdate);
            }

            await queryRunner.commitTransaction();

            // Invalidate cache for both the unliker and the post owner
            await this.cacheService.invalidatePost(postId);
            await this.cacheService.invalidateUserFeed(userId);
            await this.cacheService.invalidateUserInteractions(userId); // Invalidate interaction cache
            if (postOwnerId && postOwnerId !== userId) {
                // Invalidate post owner's feed so they see the updated like count
                await this.cacheService.invalidateUserFeed(postOwnerId);
                await this.cacheService.invalidateUserInteractions(postOwnerId); // Invalidate owner's interaction cache too
            }
        } catch (error) {
            await queryRunner.rollbackTransaction();
            this.logger.error(`Error unliking post: ${error.message}`, error.stack);
            if (error instanceof BadRequestException || error instanceof NotFoundException) {
                throw error;
            }
            throw new BadRequestException('Failed to unlike post');
        } finally {
            await queryRunner.release();
        }
    }

    /**
     * Comment on a post
     */
    async commentOnPost(postId: number, userId: number, dto: CreateCommentDto): Promise<PostComment> {
        // Verify post exists and user can view it
        const post = await this.getPostById(postId, userId);

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            // Create comment
            const comment = this.postCommentRepository.create({
                post_id: postId,
                user_id: userId,
                content: dto.content,
                parent_comment_id: dto.parent_comment_id,
            });

            const savedComment = await queryRunner.manager.save(PostComment, comment);

            // Update post comment count
            await queryRunner.manager.increment(Post, { id: postId }, 'comment_count', 1);

            // Update parent comment reply count if it's a reply
            if (dto.parent_comment_id) {
                await queryRunner.manager.increment(
                    PostComment,
                    { id: dto.parent_comment_id },
                    'reply_count',
                    1,
                );
            }

            await queryRunner.commitTransaction();

            // Invalidate cache
            await this.cacheService.invalidatePost(postId);

            // Load comment with relations
            return this.postCommentRepository.findOne({
                where: { id: savedComment.id },
                relations: ['user', 'parent_comment'],
            });
        } catch (error) {
            await queryRunner.rollbackTransaction();
            this.logger.error(`Error commenting on post: ${error.message}`, error.stack);
            throw new BadRequestException('Failed to comment on post');
        } finally {
            await queryRunner.release();
        }
    }

    /**
     * Delete a comment
     */
    async deleteComment(commentId: number, userId: number): Promise<void> {
        const comment = await this.postCommentRepository.findOne({
            where: { id: commentId, user_id: userId },
        });

        if (!comment) {
            throw new NotFoundException('Comment not found or you do not have permission to delete it');
        }

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            await queryRunner.manager.softDelete(PostComment, commentId);

            // Update post comment count
            await queryRunner.manager.decrement(Post, { id: comment.post_id }, 'comment_count', 1);

            // Update parent comment reply count if it's a reply
            if (comment.parent_comment_id) {
                await queryRunner.manager.decrement(
                    PostComment,
                    { id: comment.parent_comment_id },
                    'reply_count',
                    1,
                );
            }

            await queryRunner.commitTransaction();
        } catch (error) {
            await queryRunner.rollbackTransaction();
            this.logger.error(`Error deleting comment: ${error.message}`, error.stack);
            throw new BadRequestException('Failed to delete comment');
        } finally {
            await queryRunner.release();
        }
    }

    /**
     * Share a post
     */
    async sharePost(postId: number, userId: number, dto: CreateShareDto): Promise<PostShare> {
        // Verify post exists and user can view it
        await this.getPostById(postId, userId);

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            // Create share
            const share = this.postShareRepository.create({
                post_id: postId,
                user_id: userId,
                comment: dto.comment,
            });

            const savedShare = await queryRunner.manager.save(PostShare, share);

            // Update post share count
            await queryRunner.manager.increment(Post, { id: postId }, 'share_count', 1);

            await queryRunner.commitTransaction();

            // Invalidate cache
            await this.cacheService.invalidatePost(postId);
            await this.cacheService.invalidateUserFeed(userId);

            return savedShare;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            this.logger.error(`Error sharing post: ${error.message}`, error.stack);
            throw new BadRequestException('Failed to share post');
        } finally {
            await queryRunner.release();
        }
    }

    /**
     * Get comments for a post
     */
    async getPostComments(
        postId: number,
        limit: number = 20,
        offset: number = 0,
        parentCommentId?: number,
    ): Promise<{ comments: PostComment[]; total: number; hasMore: boolean }> {
        const queryBuilder = this.postCommentRepository
            .createQueryBuilder('comment')
            .leftJoinAndSelect('comment.user', 'user')
            .leftJoinAndSelect('comment.replies', 'replies')
            .leftJoinAndSelect('replies.user', 'replyUser')
            .where('comment.post_id = :postId', { postId })
            .andWhere('comment.deleted_at IS NULL')
            .orderBy('comment.created_at', 'DESC')
            .skip(offset)
            .take(limit);

        if (parentCommentId !== undefined) {
            queryBuilder.andWhere('comment.parent_comment_id = :parentCommentId', {
                parentCommentId,
            });
        } else {
            queryBuilder.andWhere('comment.parent_comment_id IS NULL');
        }

        const [comments, total] = await queryBuilder.getManyAndCount();

        return {
            comments,
            total,
            hasMore: offset + comments.length < total,
        };
    }

    /**
     * Get users who liked a post
     */
    async getPostLikes(postId: number, limit: number = 50, offset: number = 0) {
        const [likes, total] = await this.postLikeRepository.findAndCount({
            where: { post_id: postId },
            relations: ['user'],
            order: { created_at: 'DESC' },
            skip: offset,
            take: limit,
        });

        return {
            likes,
            total,
            hasMore: offset + likes.length < total,
        };
    }

    /**
     * Helper: Check if user can view a post
     */
    private async canViewPost(post: Post, userId: number): Promise<boolean> {
        // System posts visibility rules
        if (post.source === PostSource.SYSTEM) {
            // Welcome posts: only visible to the user they're for
            if (post.system_category === SystemPostCategory.WELCOME) {
                return post.user_id === userId;
            }
            // Broadcast, Statistics, Collision: visible to all
            return true;
        }

        if (post.user_id === userId) {
            return true; // User can always view their own posts
        }

        if (post.visibility === PostVisibility.PUBLIC) {
            return true;
        }

        if (post.visibility === PostVisibility.FOLLOWERS) {
            // Check if user follows the post author
            if (!post.user_id) return false;
            const follow = await this.userFollowRepository.findOne({
                where: {
                    follower: { id: userId },
                    following: { id: post.user_id },
                },
            });
            return !!follow;
        }

        return false;
    }

    /**
     * Helper methods for creating different types of system posts
     */

    /**
     * Create a welcome post for a new user
     * Visible only to that user in their feed, but visible when viewing their profile
     */
    async createWelcomePost(userId: number, content: string, metadata?: Record<string, any>): Promise<Post> {
        return this.createSystemPost({
            type: PostType.TEXT,
            visibility: PostVisibility.PUBLIC,
            content,
            system_category: SystemPostCategory.WELCOME,
            user_id: userId,
            metadata,
        });
    }

    /**
     * Create a creator-brand collision post
     * Visible to all users when a brand successfully purchases/sponsors an opportunity
     */
    async createCollisionPost(
        brandId: number,
        creatorId: number,
        content: string,
        metadata?: Record<string, any>,
    ): Promise<Post> {
        return this.createSystemPost({
            type: PostType.TEXT,
            visibility: PostVisibility.PUBLIC,
            content,
            system_category: SystemPostCategory.CREATOR_BRAND_COLLISION,
            metadata: {
                brandId,
                creatorId,
                ...metadata,
            },
        });
    }

    /**
     * Create a broadcast post visible to all users
     */
    async createBroadcastPost(
        content: string,
        type: PostType = PostType.TEXT,
        media?: any[],
        metadata?: Record<string, any>,
    ): Promise<Post> {
        return this.createSystemPost({
            type,
            visibility: PostVisibility.PUBLIC,
            content,
            system_category: SystemPostCategory.BROADCAST,
            media,
            metadata,
        });
    }

    /**
     * Create a statistics update post visible to all users
     */
    async createStatisticsPost(
        content: string,
        statistics: Record<string, any>,
        metadata?: Record<string, any>,
    ): Promise<Post> {
        return this.createSystemPost({
            type: PostType.TEXT,
            visibility: PostVisibility.PUBLIC,
            content,
            system_category: SystemPostCategory.STATISTICS,
            metadata: {
                statistics,
                ...metadata,
            },
        });
    }

    /**
     * Batch query user interactions for multiple posts (fixes N+1 problem)
     */
    private async getUserInteractionsBatch(
        userId: number,
        postIds: number[],
    ): Promise<Record<number, { liked: boolean; shared: boolean }>> {
        if (postIds.length === 0) {
            return {};
        }

        // Check cache first
        const cached = await this.cacheService.getUserInteractions(userId, postIds);
        if (cached) {
            return cached;
        }

        // Batch query likes and shares in parallel
        const [likes, shares] = await Promise.all([
            this.postLikeRepository.find({
                where: { post_id: In(postIds), user_id: userId },
                select: ['post_id'],
            }),
            this.postShareRepository.find({
                where: { post_id: In(postIds), user_id: userId },
                select: ['post_id'],
            }),
        ]);

        const likedPostIds = new Set(likes.map((l) => l.post_id));
        const sharedPostIds = new Set(shares.map((s) => s.post_id));

        const interactions: Record<number, { liked: boolean; shared: boolean }> = {};
        for (const postId of postIds) {
            interactions[postId] = {
                liked: likedPostIds.has(postId),
                shared: sharedPostIds.has(postId),
            };
        }

        // Cache the result
        await this.cacheService.setUserInteractions(userId, postIds, interactions);

        return interactions;
    }

    /**
     * Helper: Check if post is liked by user
     */
    private async isPostLikedByUser(postId: number, userId: number): Promise<boolean> {
        const like = await this.postLikeRepository.findOne({
            where: { post_id: postId, user_id: userId },
        });
        return !!like;
    }

    /**
     * Helper: Check if post is shared by user
     */
    private async isPostSharedByUser(postId: number, userId: number): Promise<boolean> {
        const share = await this.postShareRepository.findOne({
            where: { post_id: postId, user_id: userId },
        });
        return !!share;
    }

    /**
     * Invalidate followers' feeds when user creates a post
     */
    private async invalidateFollowersFeeds(userId: number): Promise<void> {
        // Get list of followers (users who follow this user)
        const followers = await this.userFollowRepository
            .createQueryBuilder('uf')
            .select('uf.follower_id', 'follower_id')
            .where('uf.following_id = :userId', { userId })
            .getRawMany();

        const followerIds = followers.map((f) => f.follower_id);

        // Invalidate each follower's feed cache
        const invalidations = followerIds.map((followerId) =>
            this.cacheService.invalidateUserFeed(followerId),
        );

        await Promise.all(invalidations);
    }

    /**
     * Invalidate all user feeds (for system posts)
     * Note: This is expensive, so it's done asynchronously
     */
    private async invalidateAllFeeds(): Promise<void> {
        // In a real system, you might want to use a pattern-based cache invalidation
        // or a message queue to handle this more efficiently
        // For now, we'll just log that feeds should be invalidated
        this.logger.log('System post created - all feeds should be invalidated');
        // In production, you might want to:
        // 1. Use Redis pub/sub to notify all instances
        // 2. Use a pattern-based cache clear
        // 3. Set a global cache version that invalidates all feeds
    }
}

