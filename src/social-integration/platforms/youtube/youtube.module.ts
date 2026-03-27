import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import youtubeConfig from './youtube.config';
import { YoutubeService } from './youtube.service';
import { SocialIntegration } from '../../entities/social-integration.entity';

@Module({
    imports: [
        HttpModule,
        ConfigModule.forFeature(youtubeConfig),
        TypeOrmModule.forFeature([SocialIntegration]),
    ],
    providers: [YoutubeService],
    exports: [YoutubeService],
})
export class YoutubeModule {}
