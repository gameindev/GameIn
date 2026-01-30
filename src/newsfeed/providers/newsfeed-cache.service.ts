import { Injectable } from '@nestjs/common';
import { RedisCacheService } from '../../redis/redis-cache.service';

@Injectable()
export class NewsfeedCacheService {
    private readonly CACHE_PREFIX = 'newsfeed';
    private readonly FEED_TTL = 300; // 5 minutes
    private readonly POST_TTL = 600; // 10 minutes
    private readonly FOLLOWING_TTL = 1800; // 30 minutes
    private readonly INTERACTION_TTL = 300; // 5 minutes

    constructor(private readonly redisCache: RedisCacheService) {}

    // Feed caching
    async getFeed(userId: number, limit: number, offset: number): Promise<any | null> {
        const key = this.getFeedKey(userId, limit, offset);
        return this.redisCache.get(key);
    }

    async setFeed(userId: number, limit: number, offset: number, data: any): Promise<void> {
        const key = this.getFeedKey(userId, limit, offset);
        await this.redisCache.set(key, data, this.FEED_TTL);
    }

    async invalidateUserFeed(userId: number): Promise<void> {
        // Invalidate all feed pages for this user
        const pattern = `${this.CACHE_PREFIX}:feed:${userId}:*`;
        await this.redisCache.deletePattern(pattern);
    }

    // Post caching
    async getPost(postId: number): Promise<any | null> {
        const key = this.getPostKey(postId);
        return this.redisCache.get(key);
    }

    async setPost(postId: number, data: any): Promise<void> {
        const key = this.getPostKey(postId);
        await this.redisCache.set(key, data, this.POST_TTL);
    }

    async invalidatePost(postId: number): Promise<void> {
        const key = this.getPostKey(postId);
        await this.redisCache.delete(key);
    }

    // Following list caching
    async getFollowingIds(userId: number): Promise<number[] | null> {
        const key = this.getFollowingKey(userId);
        return this.redisCache.get(key);
    }

    async setFollowingIds(userId: number, followingIds: number[]): Promise<void> {
        const key = this.getFollowingKey(userId);
        await this.redisCache.set(key, followingIds, this.FOLLOWING_TTL);
    }

    async invalidateFollowing(userId: number): Promise<void> {
        const key = this.getFollowingKey(userId);
        await this.redisCache.delete(key);
    }

    // User interactions caching (likes/shares)
    async getUserInteractions(userId: number, postIds: number[]): Promise<Record<number, { liked: boolean; shared: boolean }> | null> {
        const key = this.getInteractionsKey(userId, postIds);
        return this.redisCache.get(key);
    }

    async setUserInteractions(userId: number, postIds: number[], interactions: Record<number, { liked: boolean; shared: boolean }>): Promise<void> {
        const key = this.getInteractionsKey(userId, postIds);
        await this.redisCache.set(key, interactions, this.INTERACTION_TTL);
    }

    async invalidateUserInteractions(userId: number): Promise<void> {
        // Invalidate all interaction caches for this user
        const pattern = `${this.CACHE_PREFIX}:interactions:${userId}:*`;
        await this.redisCache.deletePattern(pattern);
    }

    // Cache key generators
    private getFeedKey(userId: number, limit: number, offset: number): string {
        return `${this.CACHE_PREFIX}:feed:${userId}:${limit}:${offset}`;
    }

    private getPostKey(postId: number): string {
        return `${this.CACHE_PREFIX}:post:${postId}`;
    }

    private getFollowingKey(userId: number): string {
        return `${this.CACHE_PREFIX}:following:${userId}`;
    }

    private getInteractionsKey(userId: number, postIds: number[]): string {
        const sortedIds = [...postIds].sort((a, b) => a - b).join(',');
        return `${this.CACHE_PREFIX}:interactions:${userId}:${sortedIds}`;
    }
}

