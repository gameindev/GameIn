import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BrandProfile } from '../../brand-profiles/brand-profile.entity';
import { Repository, MoreThan } from 'typeorm';
import { ProfileView } from '../views.entity';
import { CreatorProfile } from '../../creator-profiles/creator-profile.entity';
import { UserType } from '../../users/enums/user-type.enums';

@Injectable()
export class ViewsService {
    constructor(
        @InjectRepository(CreatorProfile)
        private creatorRepo: Repository<CreatorProfile>,
        @InjectRepository(BrandProfile)
        private brandRepo: Repository<BrandProfile>,
        @InjectRepository(ProfileView)
        private viewRepo: Repository<ProfileView>,
    ) { }

    async addUniqueView({
        profile_id,
        profile_type,
        viewer_id,
        ip_address,
    }: {
        profile_id: number;
        profile_type: UserType.CREATOR | UserType.BRAND;
        viewer_id?: number;
        ip_address?: string;
    }) {
        const since = new Date(Date.now() - 24 * 60 * 60 * 1000); // last 24 hours
        const existing = await this.viewRepo.findOne({
            where: [
                viewer_id
                    ? {
                        profile_id,
                        profile_type: profile_type === UserType.CREATOR ? 'creator' : 'brand',
                        viewer_id,
                        viewed_at: MoreThan(since),
                    }
                    : {
                        profile_id,
                        profile_type: profile_type === UserType.CREATOR ? 'creator' : 'brand',
                        ip_address,
                        viewed_at: MoreThan(since),
                    },
            ],
        });

        if (!existing) {
            await this.viewRepo.save({
                profile_id,
                profile_type: profile_type === UserType.CREATOR ? 'creator' : 'brand',
                viewer_id,
                ip_address,
            });

            // Increment views using raw query to handle null values
            // Note: profile_id is actually the user_id, so we need to update by user_id
            if (profile_type === UserType.CREATOR) {
                await this.creatorRepo
                    .createQueryBuilder()
                    .update(CreatorProfile)
                    .set({ views: () => 'COALESCE(views, 0) + 1' })
                    .where('user_id = :profile_id', { profile_id })
                    .execute();
            } else {
                await this.brandRepo
                    .createQueryBuilder() 
                    .update(BrandProfile)
                    .set({ views: () => 'COALESCE(views, 0) + 1' })
                    .where('user_id = :profile_id', { profile_id })
                    .execute();
            }
        }
    }
}
