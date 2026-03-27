import { Module } from '@nestjs/common';
import { TiktokService } from './tiktok.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import tiktokConfig from './tiktok.config';
import { SocialIntegration } from '../../entities/social-integration.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    providers: [TiktokService],
    exports: [TiktokService],
    imports: [
        HttpModule,
        ConfigModule.forFeature(tiktokConfig),
        TypeOrmModule.forFeature([SocialIntegration]),
    ]
})
export class TiktokModule { }
