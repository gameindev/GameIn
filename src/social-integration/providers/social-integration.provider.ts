import { Injectable } from '@nestjs/common';
import { SocialPlatform } from '../enums/social-platform.enums';
import { TwitchService } from '../platforms/twitch/twitch.service';
import { SocialIntegrationServiceInterface } from '../interfaces/social-integration-service.interface';

@Injectable()
export class SocialIntegrationProvider {
    constructor(private readonly twitchService: TwitchService) {}

    getProvider(platform: SocialPlatform): SocialIntegrationServiceInterface {
        switch (platform) {
            case SocialPlatform.TWITCH:
                return this.twitchService;
            default:
                throw new Error(`Platform ${platform} not implemented`);
        }
    }
}
