import { Module } from '@nestjs/common';
import { UserFavouriteController } from './user-favourite.controller';
import { UserFavouriteService } from './providers/user-favourite.service';
import { UserFavouriteCacheService } from './providers/user-favourite-cache.service';
import { UserFavourite } from './user-favourite.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { User } from '../users/user.entity';
import { RedisCacheService } from '../redis/redis-cache.service';

@Module({
  controllers: [UserFavouriteController],
  providers: [
    UserFavouriteService,
    UserFavouriteCacheService,
    RedisCacheService,
  ],
  imports: [
    TypeOrmModule.forFeature([UserFavourite, User]),
    UsersModule,
  ],
  exports: [UserFavouriteService],
})
export class UserFavouriteModule {}
