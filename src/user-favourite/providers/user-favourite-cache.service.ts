import { Injectable } from '@nestjs/common';
import { RedisCacheService } from '../../redis/redis-cache.service';
import { UserFavourite } from '../user-favourite.entity';

@Injectable()
export class UserFavouriteCacheService {
    private readonly CACHE_PREFIX = 'user_favourite';
    private readonly TTL = 1800; // 30 minutes

    constructor(private readonly redisCache: RedisCacheService) {}

    // Cache key generators
    private getUserFavouritesKey(userId: number): string {
        return `${this.CACHE_PREFIX}:list:${userId}`;
    }

    private getUserFavouriteKey(userId: number, favouriteUserId: number): string {
        return `${this.CACHE_PREFIX}:item:${userId}:${favouriteUserId}`;
    }

    private getUserFavouritesPattern(userId: number): string {
        return `${this.CACHE_PREFIX}:*:${userId}*`;
    }

    // Cache operations
    async getFavourites(userId: number): Promise<UserFavourite[] | null> {
        return this.redisCache.get<UserFavourite[]>(this.getUserFavouritesKey(userId));
    }

    async setFavourites(userId: number, favourites: UserFavourite[]): Promise<void> {
        await this.redisCache.set(
            this.getUserFavouritesKey(userId),
            favourites,
            this.TTL
        );
    }

    async invalidateUserFavourites(userId: number): Promise<void> {
        // Invalidate the list cache
        await this.redisCache.delete(this.getUserFavouritesKey(userId));
        
        // Invalidate all related item caches for this user
        await this.redisCache.deletePattern(this.getUserFavouritesPattern(userId));
    }

    async invalidateFavourite(userId: number, favouriteUserId: number): Promise<void> {
        // Invalidate specific favourite item
        await this.redisCache.delete(this.getUserFavouriteKey(userId, favouriteUserId));
        
        // Invalidate the list (since it changed)
        await this.redisCache.delete(this.getUserFavouritesKey(userId));
    }

    async setFavouriteItem(userId: number, favouriteUserId: number, favourite: UserFavourite): Promise<void> {
        await this.redisCache.set(
            this.getUserFavouriteKey(userId, favouriteUserId),
            favourite,
            this.TTL
        );
    }

    async getFavouriteItem(userId: number, favouriteUserId: number): Promise<UserFavourite | null> {
        return this.redisCache.get<UserFavourite>(
            this.getUserFavouriteKey(userId, favouriteUserId)
        );
    }
}

