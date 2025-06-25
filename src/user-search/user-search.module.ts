import { Module } from '@nestjs/common';
import { UserSearchController } from './user-search.controller';
import { UserSearchService } from './providers/user-search.service';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { CreatorProfile } from 'src/creator-profiles/creator-profile.entity';
import { BrandProfile } from 'src/brand-profiles/brand-profile.entity';

@Module({
    controllers: [UserSearchController],
    providers: [UserSearchService],
    imports: [
        TypeOrmModule.forFeature([User, CreatorProfile, BrandProfile]),
        UsersModule,
    ],
})
export class UserSearchModule { }
