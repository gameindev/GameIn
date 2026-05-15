import { Module } from '@nestjs/common';
import { UserSearchController } from './user-search.controller';
import { UserSearchService } from './providers/user-search.service';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { CreatorProfile } from '../creator-profiles/creator-profile.entity';
import { BrandProfile } from '../brand-profiles/brand-profile.entity';
import { SocialAccountRollup } from '../social-integration/entities/social-account-rollup.entity';


@Module({
    controllers: [UserSearchController],
    providers: [UserSearchService],
    imports: [
        TypeOrmModule.forFeature([User, CreatorProfile, BrandProfile, SocialAccountRollup]),
        UsersModule,
    ],
})
export class UserSearchModule { }
