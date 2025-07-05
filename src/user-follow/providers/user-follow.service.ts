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
        const following = await this.userRepo.findOne({ where: { id: dto.followingId } });


        if (!follower || !following) throw new NotFoundException('User not found');


        const existing = await this.followRepo.findOne({
            where: {
                follower: { id: followerId },
                following: { id: dto.followingId },
            },
            relations: ['follower', 'following'],
            withDeleted: true,
        });

        if (existing) {
            if (existing.deletedAt) {
                // Reactivate soft-deleted follow
                existing.deletedAt = null;
                return this.followRepo.save(existing);
            }
            return existing;
        }

        const follow = this.followRepo.create({ follower, following });
        return this.followRepo.save(follow);
    }

    async unfollow(followerId: number, followingId: number): Promise<void> {
        const follow = await this.followRepo.findOne({
            where: { follower: { id: followerId }, following: { id: followingId } },
        });

        if (!follow) throw new NotFoundException('Follow relationship not found');

        await this.followRepo.softRemove(follow);
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
}
