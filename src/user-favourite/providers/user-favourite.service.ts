import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { UserFavourite } from '../user-favourite.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserFavouriteCacheService } from './user-favourite-cache.service';

@Injectable()
export class UserFavouriteService {
    constructor(
        @InjectRepository(UserFavourite)
        private readonly userFavouriteRepository: Repository<UserFavourite>,
        private readonly cacheService: UserFavouriteCacheService,
    ) { }

    /**
     * Add favourite - Write-Through Pattern
     * 1. Write to database
     * 2. Update cache immediately
     * 3. Invalidate related caches
     */
    async addFavourite(user_id: number, favourite_user_id: number): Promise<UserFavourite> {
        // Check if already exists
        const existing = await this.userFavouriteRepository.findOne({
            where: { 
                user: { id: user_id }, 
                favourite_user: { id: favourite_user_id } 
            }
        });

        if (existing) {
            throw new ConflictException('User is already in favourites');
        }

        // 1. Write to database first (source of truth)
        const favourite = await this.userFavouriteRepository.save({
            user: { id: user_id },
            favourite_user: { id: favourite_user_id }
        });

        // 2. Load with relations for cache (including profiles)
        const favouriteWithRelations = await this.userFavouriteRepository.findOne({
            where: { id: favourite.id },
            relations: [
                'favourite_user',
                'favourite_user.creator_profile',
                'favourite_user.brand_profile'
            ]
        });

        // 3. Update cache (write-through)
        if (favouriteWithRelations) {
            await this.cacheService.setFavouriteItem(user_id, favourite_user_id, favouriteWithRelations);
            
            // 4. Invalidate list cache (it's now stale)
            await this.cacheService.invalidateUserFavourites(user_id);
        }

        return favouriteWithRelations || favourite;
    }

    /**
     * Remove favourite - Write-Through Pattern
     */
    async removeFavourite(user_id: number, favourite_user_id: number): Promise<void> {
        // 1. Delete from database
        const result = await this.userFavouriteRepository.delete({
            user: { id: user_id },
            favourite_user: { id: favourite_user_id }
        });

        if (result.affected === 0) {
            throw new NotFoundException('Favourite not found');
        }

        // 2. Invalidate cache (write-through)
        await this.cacheService.invalidateFavourite(user_id, favourite_user_id);
    }

    /**
     * List favourites - Cache-Aside Pattern (Read-Through)
     * 1. Check cache first
     * 2. If miss, read from DB
     * 3. Update cache
     */
    async listFavourites(user_id: number): Promise<UserFavourite[]> {
        // 1. Try cache first
        const cached = await this.cacheService.getFavourites(user_id);
        if (cached) {
            return cached;
        }

        // 2. Cache miss - read from database (including profiles)
        const favourites = await this.userFavouriteRepository.find({
            where: { user: { id: user_id } },
            relations: [
                'favourite_user',
                'favourite_user.creator_profile',
                'favourite_user.brand_profile'
            ]
        });

        // 3. Update cache for next time
        await this.cacheService.setFavourites(user_id, favourites);

        return favourites;
    }

    /**
     * Check if user is favourited - Cache-Aside Pattern
     */
    async isFavourited(user_id: number, favourite_user_id: number): Promise<boolean> {
        // Try cache first
        const cached = await this.cacheService.getFavouriteItem(user_id, favourite_user_id);
        if (cached !== null) {
            return true;
        }

        // Check in database
        const exists = await this.userFavouriteRepository.exists({
            where: {
                user: { id: user_id },
                favourite_user: { id: favourite_user_id }
            }
        });

        return exists;
    }
}
