import { Injectable, Provider } from '@nestjs/common';
import { SocialPlatform } from '../enums/social-platform.enums';
import { TwitchService } from '../platforms/twitch/twitch.service';
import { SocialIntegrationServiceInterface } from '../interfaces/social-integration-service.interface';
import { DiscordService } from '../platforms/discord/discord.service';
import { XService } from '../platforms/x/x.service';

@Injectable()
export class SocialIntegrationProvider {
    constructor(
        private readonly twitchService: TwitchService,
        private readonly discordService: DiscordService,
        private readonly xService: XService,
    ) { }

    getProvider(platform: SocialPlatform): SocialIntegrationServiceInterface {
        switch (platform) {
            case SocialPlatform.TWITCH:
                return this.twitchService;
            case SocialPlatform.DISCORD:
                return this.discordService;
            case SocialPlatform.X:
                return this.xService;
            default:
                throw new Error(`Platform ${platform} not implemented`);
        }
    }
}


export const SocialProviderMap: Provider = {
    provide: 'SOCIAL_PROVIDER_MAP',
    useFactory: (x: XService, discord: DiscordService, twitch: TwitchService) => ({
        [SocialPlatform.X]: x,
        [SocialPlatform.DISCORD]: discord,
        [SocialPlatform.TWITCH]: twitch,
        // add others…
    }),
    inject: [XService, DiscordService, TwitchService],
};