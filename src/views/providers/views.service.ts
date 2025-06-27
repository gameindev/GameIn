import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BrandProfile } from 'src/brand-profiles/brand-profile.entity';
import { Repository, MoreThan } from 'typeorm';
import { ProfileView } from '../views.entity';
import { CreatorProfile } from 'src/creator-profiles/creator-profile.entity';

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
        profileId,
        profileType,
        viewerId,
        ipAddress,
    }: {
        profileId: number;
        profileType: 'creator' | 'brand';
        viewerId?: number;
        ipAddress?: string;
    }) {
        const since = new Date(Date.now() - 24 * 60 * 60 * 1000); // last 24 hours
        const existing = await this.viewRepo.findOne({
            where: [
                viewerId
                    ? { profileId, profileType, viewerId, viewedAt: MoreThan(since) }
                    : { profileId, profileType, ipAddress, viewedAt: MoreThan(since) },
            ],
        });

        if (!existing) {
            await this.viewRepo.save({
                profileId,
                profileType,
                viewerId,
                ipAddress,
            });

            if (profileType === 'creator') {
                await this.creatorRepo.increment({ id: profileId }, 'views', 1);
            } else {
                await this.brandRepo.increment({ id: profileId }, 'views', 1);
            }
        }
    }
}
