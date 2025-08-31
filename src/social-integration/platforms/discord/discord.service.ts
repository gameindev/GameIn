import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { SocialIntegrationServiceInterface } from 'src/social-integration/interfaces/social-integration-service.interface';
import discordConfig from './discord.config';
import { ConfigType } from '@nestjs/config';
import { SocialIntegration } from 'src/social-integration/entities/social-integration.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { firstValueFrom } from 'rxjs';
import { SocialPlatform } from 'src/social-integration/enums/social-platform.enums';

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
        const integration = await this.integrationRepo.findOne({
            where: { id: integrationId },
            relations: ['user'],
        });

        if (!integration) {
            throw new Error('Integration not found');
        }

        // 1. Refresh access token if needed
        await this.refreshTokenIfNeeded(integrationId);

        const url = `${this.baseUrl}/users/@me`;
        const response = await firstValueFrom(
            this.httpService.get(url, {
                headers: {
                    Authorization: `Bearer ${integration.access_token}`,
                    'Client-Id': this.config.discordClientId,
                },
            }),
        );

        console.log("Discord User", response.data)

        return response.data
    }

}
