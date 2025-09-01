import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserFollow } from '../user-follow.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import { FollowDto } from '../dtos/follow.dto';



@Injectable()
export class UserFollowService {
    constructor(
        @InjectRepository(UserFollow)
        private readonly followRepo: Repository<UserFollow>,

        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
    ) { }

    async follow(followerId: number, dto: FollowDto) {
        const follower = await this.userRepo.findOne({ where: { id: followerId } });
        const following = await this.userRepo.findOne({ 
            where: { id: dto.following_id },
            relations: ['creatorProfile', 'brandProfile']
        });


        if (!follower || !following) throw new NotFoundException('User not found');
        const existing = await this.followRepo.findOne({
            where: {
                follower: { id: followerId },
                following: { id: dto.following_id },
            },
            relations: ['follower', 'following'],
            withDeleted: true,
        });

        if (existing) {
            if (existing.deleted_at) {
                // Reactivate soft-deleted follow
                existing.deleted_at = null;
                const result = await this.followRepo.save(existing);
                await this.increaseFollowerCount(following);

                return result;
            }
            return existing;
        }

        const follow = this.followRepo.create({ follower, following });
        const result = await this.followRepo.save(follow);
        await this.increaseFollowerCount(following);

        return result
    }

    async unfollow(followerId: number, followingId: number): Promise<boolean> {
        const follow = await this.followRepo.findOne({
            where: { follower: { id: followerId }, following: { id: followingId } },
        });

        const unFollowingUser = await this.userRepo.findOne({ 
            where: { id: followingId },
            relations: ['creatorProfile', 'brandProfile']
        });

        if (!unFollowingUser) throw new NotFoundException('User not found');

        if (!follow) throw new NotFoundException('Follow relationship not found');

        await this.followRepo.softRemove(follow);
        await this.descreaseFollowerCount(unFollowingUser);

        return true
    }

    async getFollowers(userId: number): Promise<User[]> {
        const follows = await this.followRepo.find({
            where: { following: { id: userId } },
            relations: ['follower'],
        });
        return follows.map(f => f.follower);
    }

    async getFollowing(userId: number): Promise<User[]> {
        const follows = await this.followRepo.find({
            where: { follower: { id: userId } },
            relations: ['following'],
        });
        return follows.map(f => f.following);
    }


    async increaseFollowerCount(user: User) {
        if (user.creator_profile != null && user.brand_profile == null) {
            user.creator_profile.followers++;
            return await this.userRepo.save(user);
        }

        if (user.brand_profile != null && user.creator_profile == null) {
            user.brand_profile.followers++;
            return await this.userRepo.save(user);
        }
    }


    async descreaseFollowerCount(user: User) {
        if (user.creator_profile != null && user.brand_profile == null) {
            user.creator_profile.followers--;
            return await this.userRepo.save(user);
        }

        if (user.brand_profile != null && user.creator_profile == null) {
            user.brand_profile.followers--;
            return await this.userRepo.save(user);
        }
    }
}
