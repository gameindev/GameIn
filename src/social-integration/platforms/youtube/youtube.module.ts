import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import youtubeConfig from './youtube.config';
import { YoutubeService } from './youtube.service';
import { SocialIntegration } from '../../entities/social-integration.entity';
import { User } from '../../../users/user.entity';
import { UsersModule } from '../../../users/users.module';

@Module({
    imports: [
        HttpModule,
        ConfigModule.forFeature(youtubeConfig),
        TypeOrmModule.forFeature([SocialIntegration, User]),
        UsersModule,
    ],
    providers: [YoutubeService],
    exports: [YoutubeService],
})
export class YoutubeModule {}
