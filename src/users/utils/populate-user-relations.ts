import { User } from '../user.entity';
import { UserType } from '../enums/user-type.enums';
import { CreatorProfile } from 'src/creator-profiles/creator-profile.entity';
import { BrandProfile } from 'src/brand-profiles/brand-profile.entity';
import { Repository } from 'typeorm';

interface PopulateOptions {
    users: User[];
    requestedRelations: string[];
    creatorProfileRepo: Repository<CreatorProfile>;
    brandProfileRepo: Repository<BrandProfile>;
}

export async function populateUserRelations({
    users,
    requestedRelations,
    creatorProfileRepo,
    brandProfileRepo,
}: PopulateOptions): Promise<User[]> {
    const tasks = users.map(async (user) => {
        if (
            requestedRelations.includes('creatorProfile') &&
            user.user_type === UserType.CREATOR
        ) {
            user.creator_profile = await creatorProfileRepo.findOne({
                where: { user: { id: user.id } },
            });
        }

        if (
            requestedRelations.includes('brandProfile') &&
            user.user_type === UserType.BRAND
        ) {
            user.brand_profile = await brandProfileRepo.findOne({
                where: { user: { id: user.id } },
            });
        }

        return user;
    });

    return Promise.all(tasks);
}
