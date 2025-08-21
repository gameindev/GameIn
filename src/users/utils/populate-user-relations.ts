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
            user.userType === UserType.CREATOR
        ) {
            user.creatorProfile = await creatorProfileRepo.findOne({
                where: { user: { id: user.id } },
            });
        }

        if (
            requestedRelations.includes('brandProfile') &&
            user.userType === UserType.BRAND
        ) {
            user.brandProfile = await brandProfileRepo.findOne({
                where: { user: { id: user.id } },
            });
        }

        return user;
    });

    return Promise.all(tasks);
}
