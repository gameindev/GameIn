import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { firstValueFrom } from 'rxjs';
import { SocialIntegrationServiceInterface } from '../../interfaces/social-integration-service.interface';
import { SocialIntegration } from '../../entities/social-integration.entity';
import { ActiveUserData } from '../../../auth/interfaces/active-user-data.interface';
import { SocialPlatform } from '../../enums/social-platform.enums';
import youtubeConfig from './youtube.config';

const SCOPES = [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/youtube.readonly',
].join(' ');

@Injectable()
export class YoutubeService implements SocialIntegrationServiceInterface {
    private readonly logger = new Logger(YoutubeService.name);

    constructor(
        private readonly httpService: HttpService,
        @Inject(youtubeConfig.KEY)
        private readonly config: ConfigType<typeof youtubeConfig>,
        @InjectRepository(SocialIntegration)
        private readonly integrationRepo: Repository<SocialIntegration>,
    ) {}

    async probeProfile(accessToken: string): Promise<any> {
        const { data } = await firstValueFrom(
            this.httpService.get('https://www.googleapis.com/oauth2/v2/userinfo', {
                headers: { Authorization: `Bearer ${accessToken}` },
            }),
        );
        if (!data?.id) throw new Error('YouTube probe failed');
        return data;
    }

    profileSummary(profile: any): { id?: string; name?: string; username?: string } | undefined {
        if (!profile) return undefined;
        return {
            id: profile.id,
            name: profile.name,
            username: profile.email ?? profile.name,
        };
    }

    getAuthUrl(user: ActiveUserData): string {
        const baseCallback = (this.config.youtubeCallbackUrl || '').trim().replace(/\/$/, '');
        const redirectUri = baseCallback.includes('?') ? baseCallback : `${baseCallback}?platform=YOUTUBE`;
        const params = new URLSearchParams({
            client_id: (this.config.youtubeClientId || '').trim(),
            redirect_uri: redirectUri,
            response_type: 'code',
            scope: SCOPES,
            access_type: 'offline',
            prompt: 'consent',
            state: `${user.sub}`,
        });
        return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
    }

    async handleCallback(code: string, state: string): Promise<void> {
        const userId = parseInt(state, 10);
        if (Number.isNaN(userId)) {
            this.logger.error(`Invalid state: "${state}"`);
            throw new Error('Invalid state: User ID not found.');
        }

        const baseCallback = (this.config.youtubeCallbackUrl || '').trim().replace(/\/$/, '');
        const redirectUri = baseCallback.includes('?') ? baseCallback : `${baseCallback}?platform=YOUTUBE`;
        const clientId = (this.config.youtubeClientId || '').trim();
        const clientSecret = (this.config.youtubeClientSecret || '').trim();
        if (!redirectUri || !clientId || !clientSecret) {
            throw new Error('YouTube OAuth is not configured.');
        }

        const tokenUrl = 'https://oauth2.googleapis.com/token';
        const body = new URLSearchParams({
            code: (code || '').trim(),
            client_id: clientId,
            client_secret: clientSecret,
            redirect_uri: redirectUri,
            grant_type: 'authorization_code',
        });

        const response = await firstValueFrom(
            this.httpService.post(tokenUrl, body.toString(), {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            }),
        );
        const { access_token, refresh_token } = response.data;

        const profile = await this.probeProfile(access_token);

        let integration = await this.integrationRepo.findOne({
            where: { user: { id: userId }, platform: SocialPlatform.YOUTUBE },
        });
        if (integration) {
            integration.access_token = access_token;
            integration.refresh_token = refresh_token ?? integration.refresh_token;
            integration.social_id = profile.id;
            await this.integrationRepo.save(integration);
        } else {
            const newIntegration = this.integrationRepo.create({
                user: { id: userId },
                platform: SocialPlatform.YOUTUBE,
                access_token,
                refresh_token: refresh_token ?? undefined,
                social_id: profile.id,
            });
            await this.integrationRepo.save(newIntegration);
        }
    }

    async refreshTokenIfNeeded(integrationId: number): Promise<{ access_token: string; refresh_token?: string } | null | undefined> {
        const integration = await this.integrationRepo.findOne({
            where: { id: integrationId },
            relations: ['user'],
        });
        if (!integration?.refresh_token) return null;

        const tokenUrl = 'https://oauth2.googleapis.com/token';
        const body = new URLSearchParams({
            client_id: (this.config.youtubeClientId || '').trim(),
            client_secret: (this.config.youtubeClientSecret || '').trim(),
            refresh_token: integration.refresh_token,
            grant_type: 'refresh_token',
        });
        const response = await firstValueFrom(
            this.httpService.post(tokenUrl, body.toString(), {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            }),
        );
        const { access_token, refresh_token } = response.data;
        integration.access_token = access_token;
        if (refresh_token) integration.refresh_token = refresh_token;
        await this.integrationRepo.save(integration);
        return { access_token, refresh_token };
    }

    async fetchAndStoreStats(integrationId: number): Promise<any> {
        const integration = await this.integrationRepo.findOne({
            where: { id: integrationId },
            relations: ['user'],
        });
        if (!integration) throw new Error('Integration not found');

        const tokens = await this.refreshTokenIfNeeded(integrationId);
        const accessToken = tokens?.access_token ?? integration.access_token;
        if (tokens?.access_token) integration.access_token = tokens.access_token;

        const channelsUrl = 'https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&mine=true';
        const { data } = await firstValueFrom(
            this.httpService.get(channelsUrl, {
                headers: { Authorization: `Bearer ${accessToken}` },
            }),
        );
        const items = data?.items ?? [];
        const channel = items[0];
        if (!channel) {
            this.logger.warn(`No YouTube channel for integration ${integrationId}`);
            return { followers: 0, views: 0, likes: null };
        }
        const stats = channel.statistics ?? {};
        const subscriberCount = parseInt(String(stats.subscriberCount || 0), 10) || 0;
        const viewCount = parseInt(String(stats.viewCount || 0), 10) || 0;
        const videoCount = parseInt(String(stats.videoCount || 0), 10) || 0;
        return {
            followers: subscriberCount,
            views: viewCount,
            likes: null,
            videoCount,
        };
    }
}
