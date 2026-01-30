import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsfeedController } from './newsfeed.controller';
import { NewsfeedService } from './providers/newsfeed.service';
import { NewsfeedCacheService } from './providers/newsfeed-cache.service';
import { Post } from './entities/post.entity';
import { PostMedia } from './entities/post-media.entity';
import { PostLike } from './entities/post-like.entity';
import { PostComment } from './entities/post-comment.entity';
import { PostShare } from './entities/post-share.entity';
import { UserFollowModule } from '../user-follow/user-follow.module';
import { UserFollow } from '../user-follow/user-follow.entity';
import { RedisCacheService } from '../redis/redis-cache.service';
import { AuthModule } from '../auth/auth.module';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Post, PostMedia, PostLike, PostComment, PostShare, UserFollow]),
        forwardRef(() => UserFollowModule),
        forwardRef(() => AuthModule), // Import AuthModule to get JwtModule
        NotificationsModule, // Import NotificationsModule to send notifications
    ],
    controllers: [NewsfeedController],
    providers: [NewsfeedService, NewsfeedCacheService, RedisCacheService],
    exports: [NewsfeedService],
})
export class NewsfeedModule {}

