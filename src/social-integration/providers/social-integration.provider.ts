import { Injectable, Provider } from '@nestjs/common';
import { SocialPlatform } from '../enums/social-platform.enums';
import { TwitchService } from '../platforms/twitch/twitch.service';
import { SocialIntegrationServiceInterface } from '../interfaces/social-integration-service.interface';
import { XService } from '../platforms/x/x.service';
import { YoutubeService } from '../platforms/youtube/youtube.service';
import { TiktokService } from '../platforms/tiktok/tiktok.service';
import { InstagramService } from '../platforms/instagram/instagram.service';

@Injectable()
export class SocialIntegrationProvider {
    constructor(
        private readonly twitchService: TwitchService,
        private readonly xService: XService,
        private readonly youtubeService: YoutubeService,
        private readonly tiktokService: TiktokService,
        private readonly instagramService: InstagramService,
    ) {}

    getProvider(platform: SocialPlatform): SocialIntegrationServiceInterface {
        switch (platform) {
            case SocialPlatform.TWITCH:
                return this.twitchService;
            case SocialPlatform.X:
                return this.xService;
            case SocialPlatform.YOUTUBE:
                return this.youtubeService;
            case SocialPlatform.TIKTOK:
                return this.tiktokService;
            case SocialPlatform.INSTAGRAM:
                return this.instagramService;
            default:
                throw new Error(`Platform ${platform} not implemented`);
        }
    }
}

export const SocialProviderMap: Provider = {
    provide: 'SOCIAL_PROVIDER_MAP',
    useFactory: (x: XService, twitch: TwitchService, youtube: YoutubeService, tiktok: TiktokService, instagram: InstagramService) => ({
        [SocialPlatform.X]: x,
        [SocialPlatform.TWITCH]: twitch,
        [SocialPlatform.YOUTUBE]: youtube,
        [SocialPlatform.TIKTOK]: tiktok,
        [SocialPlatform.INSTAGRAM]: instagram,
    }),
    inject: [XService, TwitchService, YoutubeService, TiktokService, InstagramService],
};