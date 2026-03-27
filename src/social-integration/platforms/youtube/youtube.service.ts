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
import { User } from '../../../users/user.entity';
import { signOAuthState, verifyOAuthState } from '../../utils/oauth-state.util';
import { postFormForJson } from '../../utils/form-http.util';
import { maskClientId, socialDebugLog, socialErrorLog } from '../../utils/social-oauth-debug.util';

const GOOGLE_AUTH = 'https://accounts.google.com/o/oauth2/v2/auth';
const GOOGLE_TOKEN = 'https://oauth2.googleapis.com/token';

const SCOPES = [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/youtube.readonly',
].join(' ');

type GoogleTokenResponse = {
    access_token: string;
    refresh_token?: string;
    expires_in?: number;
    scope?: string;
};

@Injectable()
export class YoutubeService implements SocialIntegrationServiceInterface {
    private readonly logger = new Logger(YoutubeService.name);

    constructor(
        private readonly httpService: HttpService,
        @Inject(youtubeConfig.KEY)
        private readonly config: ConfigType<typeof youtubeConfig>,
        @InjectRepository(SocialIntegration)
        private readonly integrationRepo: Repository<SocialIntegration>,
    ) { }

    getCapabilities() {
        return {
            supportsLikes: true,
            supportsViews: true,
            viewsDefinition: 'YouTube video statistics.viewCount / likeCount',
        };
    }

    async probeProfile(accessToken: string): Promise<any> {
        const url = `https://www.googleapis.com/youtube/v3/channels?part=id,snippet&mine=true`;
        socialDebugLog(this.logger, 'YouTube', 'probeProfile channels.list mine=true');
        try {
            const { data } = await firstValueFrom(
                this.httpService.get(url, { headers: { Authorization: `Bearer ${accessToken}` } }),
            );
            socialDebugLog(this.logger, 'YouTube', 'probeProfile ok', { channelId: data?.items?.[0]?.id });
            return data;
        } catch (e) {
            socialErrorLog(this.logger, 'YouTube', 'probeProfile', e);
            throw e;
        }
    }

    profileSummary(profile: any) {
        const ch = profile?.items?.[0];
        if (!ch) return undefined;
        return { id: ch.id, name: ch.snippet?.title, username: ch.snippet?.customUrl ?? ch.snippet?.title };
    }

    getAuthUrl(user: ActiveUserData): string {
        const state = signOAuthState({ sub: user.sub, platform: SocialPlatform.YOUTUBE });
        const u = new URL(GOOGLE_AUTH);
        u.searchParams.set('client_id', this.config.youtubeClientId);
        u.searchParams.set('redirect_uri', this.config.youtubeCallbackUrl);
        u.searchParams.set('response_type', 'code');
        u.searchParams.set('scope', SCOPES);
        u.searchParams.set('state', state);
        u.searchParams.set('access_type', 'offline');
        u.searchParams.set('prompt', 'consent');
        socialDebugLog(this.logger, 'YouTube', 'getAuthUrl built', {
            redirect_uri: this.config.youtubeCallbackUrl,
            client_id: maskClientId(this.config.youtubeClientId),
        });
        return u.toString();
    }

    async handleCallback(code: string, state: string): Promise<number> {
        socialDebugLog(this.logger, 'YouTube', 'handleCallback start', { codeLen: code?.length });
        let payload;
        try {
            payload = verifyOAuthState(state, SocialPlatform.YOUTUBE);
        } catch (e) {
            socialErrorLog(this.logger, 'YouTube', 'verifyOAuthState', e);
            throw e;
        }
        let token: GoogleTokenResponse;
        try {
            token = await postFormForJson<GoogleTokenResponse>(GOOGLE_TOKEN, {
                code,
                client_id: this.config.youtubeClientId,
                client_secret: this.config.youtubeClientSecret ?? '',
                redirect_uri: this.config.youtubeCallbackUrl,
                grant_type: 'authorization_code',
            });
        } catch (e) {
            socialErrorLog(this.logger, 'YouTube', 'handleCallback token exchange', e);
            throw e;
        }
        socialDebugLog(this.logger, 'YouTube', 'handleCallback token ok', { scope: token.scope });

        let ch;
        try {
            ch = await firstValueFrom(
                this.httpService.get(`https://www.googleapis.com/youtube/v3/channels?part=id&mine=true`, {
                    headers: { Authorization: `Bearer ${token.access_token}` },
                }),
            );
        } catch (e) {
            socialErrorLog(this.logger, 'YouTube', 'handleCallback channels.list', e);
            throw e;
        }
        const channelId = ch.data?.items?.[0]?.id;
        if (!channelId) throw new Error('YouTube channel not found for authenticated user');

        const userEntity = await this.integrationRepo.manager.getRepository(User).findOneBy({ id: payload.sub });
        if (!userEntity) throw new Error('User not found');

        const expiresAt = token.expires_in ? new Date(Date.now() + token.expires_in * 1000) : undefined;

        let row = await this.integrationRepo.findOne({ where: { user: { id: payload.sub }, platform: SocialPlatform.YOUTUBE } });
        if (!row) {
            row = this.integrationRepo.create({
                user: userEntity,
                platform: SocialPlatform.YOUTUBE,
                social_id: channelId,
                access_token: token.access_token,
                refresh_token: token.refresh_token,
                token_expires_at: expiresAt,
                scope_granted: token.scope,
            });
        } else {
            row.social_id = channelId;
            row.access_token = token.access_token;
            if (token.refresh_token) row.refresh_token = token.refresh_token;
            row.token_expires_at = expiresAt;
            row.scope_granted = token.scope;
        }
        row = await this.integrationRepo.save(row);
        socialDebugLog(this.logger, 'YouTube', 'handleCallback saved', { integrationId: row.id, channelId });
        return row.id;
    }

    async refreshTokenIfNeeded(
        integrationId: number,
        refreshToken?: string,
    ): Promise<{ access_token: string; refresh_token?: string } | null | undefined> {
        if (!refreshToken) return null;
        socialDebugLog(this.logger, 'YouTube', 'refreshTokenIfNeeded', { integrationId });
        let token: GoogleTokenResponse;
        try {
            token = await postFormForJson<GoogleTokenResponse>(GOOGLE_TOKEN, {
                client_id: this.config.youtubeClientId,
                client_secret: this.config.youtubeClientSecret ?? '',
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
            });
        } catch (e) {
            socialErrorLog(this.logger, 'YouTube', 'refreshTokenIfNeeded', e);
            throw e;
        }
        const row = await this.integrationRepo.findOne({ where: { id: integrationId } });
        if (row) {
            row.access_token = token.access_token;
            if (token.refresh_token) row.refresh_token = token.refresh_token;
            if (token.expires_in) row.token_expires_at = new Date(Date.now() + token.expires_in * 1000);
            await this.integrationRepo.save(row);
        }
        return { access_token: token.access_token, refresh_token: token.refresh_token };
    }

    async revokeToken(accessToken: string): Promise<void> {
        try {
            await postFormForJson('https://oauth2.googleapis.com/revoke', { token: accessToken });
        } catch (e) {
            this.logger.warn(`YouTube revoke: ${(e as Error).message}`);
        }
    }

    async fetchAndStoreStats(integrationId: number): Promise<any> {
        socialDebugLog(this.logger, 'YouTube', 'fetchAndStoreStats start', { integrationId });
        const row = await this.integrationRepo.findOne({ where: { id: integrationId } });
        if (!row?.access_token) throw new Error('YouTube integration missing token');
        const auth = { Authorization: `Bearer ${row.access_token}` };

        let chResp;
        try {
            chResp = await firstValueFrom(
                this.httpService.get(
                    `https://www.googleapis.com/youtube/v3/channels?part=statistics,contentDetails&mine=true`,
                    { headers: auth },
                ),
            );
        } catch (e) {
            socialErrorLog(this.logger, 'YouTube', 'fetchAndStoreStats channels.list', e);
            throw e;
        }
        const ch = chResp.data?.items?.[0];
        const subscribers = Number(ch?.statistics?.subscriberCount ?? 0);
        const uploads = ch?.contentDetails?.relatedPlaylists?.uploads;
        if (!uploads) {
            socialDebugLog(this.logger, 'YouTube', 'fetchAndStoreStats no uploads playlist');
            return { followers_total: subscribers, posts: [], views_definition: 'video_statistics' };
        }

        const videoIds: string[] = [];
        let pageToken: string | undefined;
        for (let p = 0; p < 200; p++) {
            const params = new URLSearchParams({
                part: 'snippet',
                playlistId: uploads,
                maxResults: '50',
            });
            if (pageToken) params.set('pageToken', pageToken);
            let pl;
            try {
                pl = await firstValueFrom(
                    this.httpService.get(`https://www.googleapis.com/youtube/v3/playlistItems?${params}`, { headers: auth }),
                );
            } catch (e) {
                socialErrorLog(this.logger, 'YouTube', `fetchAndStoreStats playlistItems p=${p}`, e);
                throw e;
            }
            for (const it of pl.data?.items ?? []) {
                const vid = it?.snippet?.resourceId?.videoId;
                if (vid) videoIds.push(vid);
            }
            pageToken = pl.data?.nextPageToken;
            if (!pageToken) break;
        }

        const posts: Array<{ id: string; like_count: number; view_count: number }> = [];
        const batchSize = 50;
        for (let i = 0; i < videoIds.length; i += batchSize) {
            const batch = videoIds.slice(i, i + batchSize);
            let v;
            try {
                v = await firstValueFrom(
                    this.httpService.get(
                        `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${batch.map(encodeURIComponent).join(',')}`,
                        { headers: auth },
                    ),
                );
            } catch (e) {
                socialErrorLog(this.logger, 'YouTube', 'fetchAndStoreStats videos.list batch', e);
                throw e;
            }
            for (const item of v.data?.items ?? []) {
                posts.push({
                    id: item.id,
                    like_count: Number(item.statistics?.likeCount ?? 0),
                    view_count: Number(item.statistics?.viewCount ?? 0),
                });
            }
        }

        socialDebugLog(this.logger, 'YouTube', 'fetchAndStoreStats done', { videos: posts.length, subscribers });
        return {
            followers_total: subscribers,
            posts,
            views_definition: 'video_statistics',
            sampled_posts_count: posts.length,
        };
    }
}
