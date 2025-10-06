import { Module } from '@nestjs/common';
import { UserFollowController } from './user-follow.controller';
import { UserFollowService } from './providers/user-follow.service';
import { UserFollow } from './user-follow.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { User } from '../users/user.entity';


@Module({
    controllers: [UserFollowController],
    providers: [UserFollowService],
    imports: [
        TypeOrmModule.forFeature([UserFollow, User]),
        UsersModule,
    ],
    exports: [UserFollowService],
})
export class UserFollowModule { }
