import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, Logger } from '@nestjs/common';
import discordConfig from './discord.config';
import { ConfigType } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { firstValueFrom } from 'rxjs';
import { SocialIntegrationServiceInterface } from '../../interfaces/social-integration-service.interface';
import { SocialIntegration } from '../../entities/social-integration.entity';
import { ActiveUserData } from '../../../auth/interfaces/active-user-data.interface';
import { SocialPlatform } from '../../enums/social-platform.enums';

@Injectable()
export class DiscordService implements SocialIntegrationServiceInterface {
    private readonly baseUrl = 'https://discord.com/api';
    private readonly logger = new Logger(DiscordService.name);

    constructor(
        private readonly httpService: HttpService,
        @Inject(discordConfig.KEY)
        private readonly config: ConfigType<typeof discordConfig>,
        @InjectRepository(SocialIntegration)
        private readonly integrationRepo: Repository<SocialIntegration>,
    ) { }

    async probeProfile(accessToken: string) {
        const { data } = await firstValueFrom(
            this.httpService.get('https://discord.com/api/users/@me', {
                headers: { Authorization: `Bearer ${accessToken}` },
            }),
        );
        if (!data?.id) throw new Error('Discord probe failed');
        return data; // { id, username, global_name, ... }
    }

    // profileSummary(p: any) {
    //     return p ? { id: p.id, username: p.username, name: p.global_name ?? p.username } : undefined;
    // }

    getAuthUrl(user: ActiveUserData): string {
        const params = new URLSearchParams({
            client_id: this.config.discordClientId,
            redirect_uri: this.config.discordCallbackUrl,
            response_type: "code",
            scope: 'identify email',
            state: `${user.sub}`
        })

        return `https://discord.com/oauth2/authorize?${params.toString()}`
    }

    async handleCallback(code: string, state: string): Promise<void> {
        const userId = parseInt(state);

        if (isNaN(userId)) {
            this.logger.error(`Invalid state parameter received: "${state}". Expected a number.`);
            throw new Error('Invalid state parameter: User ID not found.');
        }

        const tokenUrl = 'https://discord.com/api/oauth2/token';
        const params = new URLSearchParams({
            client_id: this.config.discordClientId,
            client_secret: this.config.discordClientSecret,
            code,
            grant_type: 'authorization_code',
            redirect_uri: this.config.discordCallbackUrl
        });

        try { // Added try-catch for better error handling
            const response = await firstValueFrom(
                this.httpService.post(tokenUrl, params.toString(), {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                })
            );
            console.log("callback res", response.data)
            const { access_token, refresh_token } = response.data;

            const userProfile = await this.getUserProfile(access_token);

            // <-- CHANGE 3: Use userId to find integration
            let integration = await this.integrationRepo.findOne({
                where: { user: { id: userId }, platform: SocialPlatform.DISCORD }
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
                    platform: SocialPlatform.DISCORD,
                    access_token,
                    refresh_token,
                    social_id: userProfile.id,
                });
                await this.integrationRepo.save(newIntegration);
            }
        } catch (error) {
            this.logger.error(`Error in Discord callback: ${error.message}`);
            // Re-throw the error to be caught by the NestJS exception filter
            throw error;
        }
    }


    async getUserProfile(accessToken: string): Promise<any> {
        const url = `${this.baseUrl}/users/@me`;
        const response = await firstValueFrom(
            this.httpService.get(url, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Client-Id': this.config.discordClientId,
                },
            }),
        );
        console.log(response.data)
        return response.data;
    }

    async refreshTokenIfNeeded(integrationId: number): Promise<{ access_token: string; refresh_token?: string }> {
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

        const tokenUrl = 'https://discord.com/api/oauth2/token';
        const params = new URLSearchParams({
            client_id: this.config.discordClientId,
            client_secret: this.config.discordClientSecret,
            grant_type: 'refresh_token',
            refresh_token: integration.refresh_token
        });

        const response = await firstValueFrom(
            this.httpService.post(tokenUrl, params.toString(), {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
        );

        const { access_token, refresh_token } = response.data;

        integration.access_token = access_token;
        integration.refresh_token = refresh_token;

        await this.integrationRepo.save(integration);

        return { access_token, refresh_token }

    }



    async fetchAndStoreStats(integrationId: number): Promise<any> {
        this.logger.log(`Fetching Discord stats for integration ${integrationId}`);

        const integration = await this.integrationRepo.findOne({
            where: { id: integrationId },
            relations: ['user'],
        });

        if (!integration) {
            throw new Error('Integration not found');
        }

        // 1️⃣ Refresh token if needed
        const { access_token } = await this.refreshTokenIfNeeded(integrationId);

        // 2️⃣ Fetch Discord profile
        const profileUrl = `${this.baseUrl}/users/@me`;
        const { data: userData } = await firstValueFrom(
            this.httpService.get(profileUrl, {
                headers: { Authorization: `Bearer ${access_token}` },
            }),
        );

        // 3️⃣ Fetch user’s connections
        const connectionsUrl = `${this.baseUrl}/users/@me/connections`;
        const { data: connections } = await firstValueFrom(
            this.httpService.get(connectionsUrl, {
                headers: { Authorization: `Bearer ${access_token}` },
            }),
        );

        // 4️⃣ Discord doesn’t expose follower/like/view metrics for personal accounts.
        // You can approximate “follower-type” count by checking mutual connections or servers if you’re using a bot.
        // For now, we’ll safely log profile + connections.

        const summary = {
            id: userData.id,
            username: userData.global_name ?? userData.username,
            avatar: userData.avatar
                ? `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`
                : null,
            connectionsCount: connections?.length ?? 0,
        };

        this.logger.log('Discord Stats:', summary);

        return summary;
    }

}
