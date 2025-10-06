import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BrandProfile } from '@/brand-profiles/brand-profile.entity';
import { Repository, MoreThan } from 'typeorm';
import { ProfileView } from '../views.entity';
import { CreatorProfile } from '@/creator-profiles/creator-profile.entity';

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
        profile_type: 'creator' | 'brand';
        viewer_id?: number;
        ip_address?: string;
    }) {
        const since = new Date(Date.now() - 24 * 60 * 60 * 1000); // last 24 hours
        const existing = await this.viewRepo.findOne({
            where: [
                viewer_id
                    ? { profile_id, profile_type, viewer_id, viewed_at: MoreThan(since) }
                    : { profile_id, profile_type, ip_address, viewed_at: MoreThan(since) },
            ],
        });

        if (!existing) {
            await this.viewRepo.save({
                profile_id,
                profile_type,
                viewer_id,
                ip_address,
            });

            if (profile_type === 'creator') {
                await this.creatorRepo.increment({ id: profile_id }, 'views', 1);   
            } else {
                await this.brandRepo.increment({ id: profile_id }, 'views', 1);
            }
        }
    }
}
