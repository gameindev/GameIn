import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocialIntegration } from './entities/social-integration.entity';
import { SocialIntegrationController } from './social-integration.controller';
import { SocialIntegrationService } from './providers/social-integration.service';
import { SocialIntegrationProvider, SocialProviderMap } from './providers/social-integration.provider';
import { TwitchModule } from './platforms/twitch/twitch.module';
import { InstagramModule } from './platforms/instagram/instagram.module';
import { DiscordModule } from './platforms/discord/discord.module';
import { XModule } from './platforms/x/x.module';
import { TiktokModule } from './platforms/tiktok/tiktok.module';
import { YoutubeModule } from './platforms/youtube/youtube.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([SocialIntegration]),
        TwitchModule,
        InstagramModule,
        DiscordModule,
        XModule,
        TiktokModule,
        YoutubeModule,
    ],
    controllers: [SocialIntegrationController],
    providers: [SocialIntegrationService, SocialIntegrationProvider, SocialProviderMap],
    exports: [SocialIntegrationService],
})
export class SocialIntegrationModule implements OnModuleInit {
    constructor(private readonly configService: ConfigService) {}

    onModuleInit() {
        if (process.env.NODE_ENV === 'production') return;
        const prefix = process.env.API_PREFIX ?? 'api';
        const base = process.env.HOST ?? 'http://localhost:3000';
        const callbackPath = `${base}/${prefix}/social-integration/callback`;
        const log: string[] = ['Social integrations config:'];
        const twitch = {
            clientId: !!this.configService.get<string>('twitchConfig.twitchClientId'),
            secret: !!this.configService.get<string>('twitchConfig.twitchClientSecret'),
            callback: !!this.configService.get<string>('twitchConfig.twitchCallbackUrl'),
        };
        log.push(`  Twitch: client_id=${twitch.clientId ? 'ok' : 'MISSING'} secret=${twitch.secret ? 'ok' : 'MISSING'} callback=${twitch.callback ? 'ok' : 'MISSING'}`);
        const discord = {
            clientId: !!this.configService.get<string>('discordConfig.discordClientId'),
            secret: !!this.configService.get<string>('discordConfig.discordClientSecret'),
            callback: !!this.configService.get<string>('discordConfig.discordCallbackUrl'),
        };
        log.push(`  Discord: client_id=${discord.clientId ? 'ok' : 'MISSING'} secret=${discord.secret ? 'ok' : 'MISSING'} callback=${discord.callback ? 'ok' : 'MISSING'}`);
        const x = {
            clientId: !!this.configService.get<string>('xConfig.xClientId'),
            secret: !!this.configService.get<string>('xConfig.xClientSecret'),
            callback: !!this.configService.get<string>('xConfig.xCallbackUrl'),
        };
        log.push(`  X: client_id=${x.clientId ? 'ok' : 'MISSING'} secret=${x.secret ? 'ok' : 'MISSING'} callback=${x.callback ? 'ok' : 'MISSING'}`);
        const youtube = {
            clientId: !!this.configService.get<string>('youtubeConfig.youtubeClientId'),
            secret: !!this.configService.get<string>('youtubeConfig.youtubeClientSecret'),
            callback: !!this.configService.get<string>('youtubeConfig.youtubeCallbackUrl'),
        };
        log.push(`  YouTube: client_id=${youtube.clientId ? 'ok' : 'MISSING'} secret=${youtube.secret ? 'ok' : 'MISSING'} callback=${youtube.callback ? 'ok' : 'MISSING'}`);
        log.push(`  Expected callback URL (register this in each provider’s dev portal): ${callbackPath}`);
        console.log(log.join('\n'));
    }
}
