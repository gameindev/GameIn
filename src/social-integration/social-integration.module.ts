import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocialIntegration } from './entities/social-integration.entity';
import { SocialIntegrationController } from './social-integration.controller';
import { SocialIntegrationService } from './providers/social-integration.service';
import { SocialIntegrationProvider, SocialProviderMap } from './providers/social-integration.provider';
import { TwitchModule } from './platforms/twitch/twitch.module';
import { InstagramModule } from './platforms/instagram/instagram.module';
import { DiscordModule } from './platforms/discord/discord.module';
import { XModule } from './platforms/x/x.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([SocialIntegration]),
        TwitchModule,
        InstagramModule,
        DiscordModule,
        XModule,
    ],
    controllers: [SocialIntegrationController],
    providers: [SocialIntegrationService, SocialIntegrationProvider, SocialProviderMap],
    exports: [SocialIntegrationService],
})
export class SocialIntegrationModule { }
