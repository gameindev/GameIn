import { Inject, Injectable, Logger } from '@nestjs/common';
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
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class TwitchService implements SocialIntegrationServiceInterface {
    private readonly baseUrl = 'https://api.twitch.tv/helix';
    private readonly logger = new Logger(TwitchService.name);

    constructor(
        private readonly httpService: HttpService,
        @Inject(twitchConfig.KEY)
        private readonly config: ConfigType<typeof twitchConfig>,
        @InjectRepository(SocialIntegration)
        private readonly integrationRepo: Repository<SocialIntegration>,

        private readonly userService: UsersService// Inject the UserRep
    ) { }

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



    // async handleCallback(code: string, state: string): Promise<void> {
    //     const tokenUrl = 'https://id.twitch.tv/oauth2/token';
    //     const params = new URLSearchParams({
    //         client_id: this.config.twitchClientId,
    //         client_secret: this.config.twitchClientSecret,
    //         code,
    //         grant_type: 'authorization_code',
    //         redirect_uri: this.config.twitchCallbackUrl
    //     });

    //     const response = await firstValueFrom(
    //         this.httpService.post(tokenUrl, params.toString(), {
    //             headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    //         })
    //     );

    //     const { access_token, refresh_token } = response.data;

    //     const userProfile = await this.getUserProfile(access_token);

    //     const user = await this.userRepo.findOne({ where: { id: parseInt(state) } });

    //     const integration = await this.integrationRepo.findOne({
    //         where: { user: { id: parseInt(state) }, platform: SocialPlatform.TWITCH }
    //     });

    //     if (integration) {
    //         integration.access_token = access_token;
    //         integration.refresh_token = refresh_token;
    //         integration.social_id = userProfile.id;
    //         await this.integrationRepo.save(integration);
    //     } else {
    //         const newIntegration = this.integrationRepo.create({
    //             user,
    //             platform: SocialPlatform.TWITCH,
    //             access_token,
    //             refresh_token,
    //             social_id: userProfile.id,
    //         });
    //         await this.integrationRepo.save(newIntegration);
    //     }
    // }

    async handleCallback(code: string, state: string): Promise<void> {
        // <-- CHANGE 2: Parse userId from state
        const userId = parseInt(state); // Assuming state contains just the user ID

        if (isNaN(userId)) {
            this.logger.error(`Invalid state parameter received: "${state}". Expected a number.`);
            throw new Error('Invalid state parameter: User ID not found.');
        }

        const tokenUrl = 'https://id.twitch.tv/oauth2/token';
        const params = new URLSearchParams({
            client_id: this.config.twitchClientId,
            client_secret: this.config.twitchClientSecret,
            code,
            grant_type: 'authorization_code',
            redirect_uri: this.config.twitchCallbackUrl
        });

        try { // Added try-catch for better error handling
            const response = await firstValueFrom(
                this.httpService.post(tokenUrl, params.toString(), {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                })
            );

            const { access_token, refresh_token } = response.data;

            const userProfile = await this.getUserProfile(access_token);

            // <-- CHANGE 3: Use userId to find integration
            let integration = await this.integrationRepo.findOne({
                where: { user: { id: userId }, platform: SocialPlatform.TWITCH }
            });

            if (integration) {
                integration.access_token = access_token;
                integration.refresh_token = refresh_token;
                integration.social_id = userProfile.id;
                await this.integrationRepo.save(integration);
            } else {
                // <-- CHANGE 4: Create new integration with user ID
                const newIntegration = this.integrationRepo.create({
                    user: { id: userId }, // Associate by ID
                    platform: SocialPlatform.TWITCH,
                    access_token,
                    refresh_token,
                    social_id: userProfile.id,
                });
                await this.integrationRepo.save(newIntegration);
            }
        } catch (error) {
            this.logger.error(`Error in Twitch callback: ${error.message}`);
            // Re-throw the error to be caught by the NestJS exception filter
            throw error;
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

    async refreshTokenIfNeeded(integrationId: number): Promise<void> {
        const integration = await this.integrationRepo.findOne({
            where: { id: integrationId },
            relations: ['user']
        });

        if (!integration) {
            throw new Error('Integration not found');
        }

        if (!integration.refresh_token) {
            throw new Error('No refresh token available');
        }

        const tokenUrl = 'https://id.twitch.tv/oauth2/token';
        const params = new URLSearchParams({
            client_id: this.config.twitchClientId,
            client_secret: this.config.twitchClientSecret,
            grant_type: 'refresh_token',
            refresh_token: integration.refresh_token
        });

        const response = await firstValueFrom(
            this.httpService.post(tokenUrl, params.toString(), {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
        );

        const { access_token, refresh_token } = response.data;

        // Update stored tokens
        integration.access_token = access_token;
        integration.refresh_token = refresh_token;

        await this.integrationRepo.save(integration);
    }

    async fetchAndStoreStats(integrationId: number): Promise<any> {
        const integration = await this.integrationRepo.findOne({
            where: { id: integrationId },
            relations: ['user'],
        });

        if (!integration) {
            throw new Error('Integration not found');
        }

        // 1. Refresh access token if needed
        await this.refreshTokenIfNeeded(integrationId);

        // 2. Fetch followers count
        const followersUrl = `${this.baseUrl}/channels/followers?broadcaster_id=${integration.social_id}`;
        const followersResponse = await firstValueFrom(
            this.httpService.get(followersUrl, {
                headers: {
                    Authorization: `Bearer ${integration.access_token}`,
                    'Client-Id': this.config.twitchClientId,
                },
            }),
        );

        const followersCount = followersResponse.data.total ?? 0;

        // 3. Fetch most viewed video
        const videosUrl = `${this.baseUrl}/videos?user_id=${integration.social_id}&sort=views`;
        const videosResponse = await firstValueFrom(
            this.httpService.get(videosUrl, {
                headers: {
                    Authorization: `Bearer ${integration.access_token}`,
                    'Client-Id': this.config.twitchClientId,
                },
            }),
        );

        const videos = videosResponse.data.data ?? [];
        const mostViewedVideo = videos.length > 0 ? videos[0] : null;

        const mostViewed = mostViewedVideo
            ? {
                title: mostViewedVideo.title,
                views: mostViewedVideo.view_count,
                url: mostViewedVideo.url,
            }
            : null;

        // 4. Log or store as needed
        console.log(`[Twitch Stats] User ${integration.user.id}`, {
            followersCount,
            mostViewed,
        });

        // 5. Return the stats (you can also persist them)
        return {
            followersCount,
            mostViewed,
        };
    }
}
