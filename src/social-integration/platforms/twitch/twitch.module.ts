import { Module } from '@nestjs/common';
import { TwitchService } from './twitch.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocialIntegration } from '../../entities/social-integration.entity';
import twitchConfig from './twitch.config';
import { UsersModule } from '@/users/users.module';
import { User } from '@/users/user.entity';

@Module({
    imports: [
        HttpModule,
        ConfigModule.forFeature(twitchConfig),
        TypeOrmModule.forFeature([SocialIntegration, User]),
        UsersModule
    ],
    providers: [TwitchService],
    exports: [TwitchService],
})
export class TwitchModule { }
