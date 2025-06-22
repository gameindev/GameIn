import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SocialIntegration } from '../../entities/social-integration.entity';
import { User } from 'src/users/user.entity';
import { SocialPlatform } from '../../enums/social-platform.enums';
import { SocialIntegrationServiceInterface } from '../../interfaces/social-integration-service.interface';
import twitchConfig from './twitch.config';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';

@Injectable()
export class TwitchService implements SocialIntegrationServiceInterface {
    private readonly baseUrl = 'https://api.twitch.tv/helix';

    constructor(
        private readonly httpService: HttpService,
        @Inject(twitchConfig.KEY)
        private readonly config: ConfigType<typeof twitchConfig>,
        @InjectRepository(SocialIntegration)
        private readonly integrationRepo: Repository<SocialIntegration>,
    ) {}

    getAuthUrl(user: ActiveUserData): string {
        const params = new URLSearchParams({
            client_id: this.config.twitchClientId,
            redirect_uri: this.config.twitchCallbackUrl,
            response_type: 'code',
            scope: 'user:read:email user:read:follows',
            state: `${user.sub}`  // 👈 here user.sub is your userId from JWT payload
        });
        return `https://id.twitch.tv/oauth2/authorize?${params.toString()}`;
    }

    async handleCallback(code: string, user: ActiveUserData): Promise<void> {
        const tokenUrl = 'https://id.twitch.tv/oauth2/token';
        const params = new URLSearchParams({
            client_id: this.config.twitchClientId,
            client_secret: this.config.twitchClientSecret,
            code,
            grant_type: 'authorization_code',
            redirect_uri: this.config.twitchCallbackUrl
        });

        const response = await firstValueFrom(
            this.httpService.post(tokenUrl, params.toString(), {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
        );

        const { access_token, refresh_token } = response.data;

        const userProfile = await this.getUserProfile(access_token);

        const integration = await this.integrationRepo.findOne({
            where: { user: { id: user.sub }, platform: SocialPlatform.TWITCH }
        });

        if (integration) {
            integration.access_token = access_token;
            integration.refresh_token = refresh_token;
            integration.social_id = userProfile.id;
            await this.integrationRepo.save(integration);
        } else {
            const newIntegration = this.integrationRepo.create({
                user,
                platform: SocialPlatform.TWITCH,
                access_token,
                refresh_token,
                social_id: userProfile.id,
            });
            await this.integrationRepo.save(newIntegration);
        }
    }

    async getUserProfile(accessToken: string): Promise<any> {
        const url = `${this.baseUrl}/users`;
        const response = await firstValueFrom(
            this.httpService.get(url, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Client-Id': this.config.twitchClientId,
                },
            }),
        );
        return response.data.data[0];
    }

    async refreshTokenIfNeeded(): Promise<void> {
        // Implement refresh logic if Twitch supports long term refresh
        return;
    }

    async fetchAndStoreStats(integrationId: number): Promise<void> {
        const integration = await this.integrationRepo.findOne({
            where: { id: integrationId },
            relations: ['user']
        });

        const followersUrl = `${this.baseUrl}/channels/followers?broadcaster_id=${integration.social_id}`;
        const response = await firstValueFrom(
            this.httpService.get(followersUrl, {
                headers: {
                    Authorization: `Bearer ${integration.access_token}`,
                    'Client-Id': this.config.twitchClientId,
                },
            }),
        );

        const followersCount = response.data.total;

        console.log('Fetched followers:', followersCount);
        // Store followers count wherever you want
    }
}
