import { Module } from '@nestjs/common';
import { TwitchController } from './twitch.controller';
import { TwitchService } from './providers/twitch.service';
import { HttpModule } from '@nestjs/axios';
import { TwitchStrategy } from './strategies/twitch.strategy';
import { ConfigModule } from '@nestjs/config';
import twitchConfig from './config/twitch.config';

@Module({
    imports: [
        HttpModule,
        ConfigModule.forFeature(twitchConfig)
    ],
    controllers: [TwitchController],
    providers: [TwitchService, TwitchStrategy]
})
export class TwitchModule { }
