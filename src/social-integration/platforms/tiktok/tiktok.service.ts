import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { firstValueFrom } from 'rxjs';
import tiktokConfig from './tiktok.config';
import { SocialIntegration } from '../../entities/social-integration.entity';
import { SocialPlatform } from '../../enums/social-platform.enums';
import { ActiveUserData } from '../../../auth/interfaces/active-user-data.interface';
import { SocialIntegrationServiceInterface } from '../../interfaces/social-integration-service.interface';
import { User } from '../../../users/user.entity';
import { signOAuthState, verifyOAuthState } from '../../utils/oauth-state.util';
import { postFormForJson } from '../../utils/form-http.util';
import { maskClientId, socialDebugLog, socialErrorLog } from '../../utils/social-oauth-debug.util';

const TT_AUTH = 'https://www.tiktok.com/v2/auth/authorize/';
const TT_TOKEN = 'https://open.tiktokapis.com/v2/oauth/token/';
const TT_REVOKE = 'https://open.tiktokapis.com/v2/oauth/revoke/';

type TikTokTokenResponse = {
    access_token: string;
    refresh_token?: string;
    expires_in?: number;
    refresh_expires_in?: number;
    scope?: string;
};

@Injectable()
export class TiktokService implements SocialIntegrationServiceInterface {
    private readonly logger = new Logger(TiktokService.name);

    constructor(
        private readonly httpService: HttpService,
        @Inject(tiktokConfig.KEY)
        private readonly config: ConfigType<typeof tiktokConfig>,
        @InjectRepository(SocialIntegration)
        private readonly integrationRepo: Repository<SocialIntegration>,
    ) { }

    getCapabilities() {
        return {
            supportsLikes: true,
            supportsViews: true,
            supportsLifetimeLikes: true,
            viewsDefinition: 'TikTok video view_count; account likes_count available as lifetime_likes',
        };
    }

    async probeProfile(accessToken: string): Promise<any> {
        const url =
            'https://open.tiktokapis.com/v2/user/info/?fields=open_id,union_id,display_name,username,follower_count,likes_count,video_count';
        socialDebugLog(this.logger, 'TikTok', 'probeProfile user/info');
        try {
            const { data } = await firstValueFrom(
                this.httpService.get(url, { headers: { Authorization: `Bearer ${accessToken}` } }),
            );
            socialDebugLog(this.logger, 'TikTok', 'probeProfile ok', { open_id: data?.data?.user?.open_id });
            return data;
        } catch (e) {
            socialErrorLog(this.logger, 'TikTok', 'probeProfile', e);
            throw e;
        }
    }

    profileSummary(profile: any) {
        const u = profile?.data?.user;
        if (!u) return undefined;
        return { id: u.open_id ?? u.union_id, name: u.display_name, username: u.username };
    }

    getAuthUrl(user: ActiveUserData): string {
        const state = signOAuthState({ sub: user.sub, platform: SocialPlatform.TIKTOK });
        const u = new URL(TT_AUTH);
        u.searchParams.set('client_key', this.config.tiktokClientKey);
        u.searchParams.set('redirect_uri', this.config.tiktokCallbackUrl);
        u.searchParams.set('response_type', 'code');
        u.searchParams.set('scope', this.config.tiktokScopes.replace(/,/g, ' '));
        u.searchParams.set('state', state);
        socialDebugLog(this.logger, 'TikTok', 'getAuthUrl built', {
            redirect_uri: this.config.tiktokCallbackUrl,
            client_key: maskClientId(this.config.tiktokClientKey),
        });
        return u.toString();
    }

    async handleCallback(code: string, state: string): Promise<number> {
        socialDebugLog(this.logger, 'TikTok', 'handleCallback start', { codeLen: code?.length });
        let payload;
        try {
            payload = verifyOAuthState(state, SocialPlatform.TIKTOK);
        } catch (e) {
            socialErrorLog(this.logger, 'TikTok', 'verifyOAuthState', e);
            throw e;
        }
        let token: TikTokTokenResponse;
        try {
            token = await postFormForJson<TikTokTokenResponse>(TT_TOKEN, {
                client_key: this.config.tiktokClientKey,
                client_secret: this.config.tiktokClientSecret,
                code,
                grant_type: 'authorization_code',
                redirect_uri: this.config.tiktokCallbackUrl,
            });
        } catch (e) {
            socialErrorLog(this.logger, 'TikTok', 'handleCallback token exchange', e);
            throw e;
        }
        socialDebugLog(this.logger, 'TikTok', 'handleCallback token ok', { scope: token.scope });

        let info;
        try {
            info = await firstValueFrom(
                this.httpService.get('https://open.tiktokapis.com/v2/user/info/?fields=open_id', {
                    headers: { Authorization: `Bearer ${token.access_token}` },
                }),
            );
        } catch (e) {
            socialErrorLog(this.logger, 'TikTok', 'handleCallback user/info', e);
            throw e;
        }
        const openId = info.data?.data?.user?.open_id;
        if (!openId) throw new Error('TikTok open_id missing');

        const userEntity = await this.integrationRepo.manager.getRepository(User).findOneBy({ id: payload.sub });
        if (!userEntity) throw new Error('User not found');

        const expiresAt = token.expires_in ? new Date(Date.now() + token.expires_in * 1000) : undefined;

        let row = await this.integrationRepo.findOne({ where: { user: { id: payload.sub }, platform: SocialPlatform.TIKTOK } });
        if (!row) {
            row = this.integrationRepo.create({
                user: userEntity,
                platform: SocialPlatform.TIKTOK,
                social_id: openId,
                access_token: token.access_token,
                refresh_token: token.refresh_token,
                token_expires_at: expiresAt,
                scope_granted: token.scope,
            });
        } else {
            row.social_id = openId;
            row.access_token = token.access_token;
            if (token.refresh_token) row.refresh_token = token.refresh_token;
            row.token_expires_at = expiresAt;
            row.scope_granted = token.scope;
        }
        row = await this.integrationRepo.save(row);
        socialDebugLog(this.logger, 'TikTok', 'handleCallback saved', { integrationId: row.id, openId });
        return row.id;
    }

    async refreshTokenIfNeeded(
        integrationId: number,
        refreshToken?: string,
    ): Promise<{ access_token: string; refresh_token?: string } | null | undefined> {
        if (!refreshToken) return null;
        socialDebugLog(this.logger, 'TikTok', 'refreshTokenIfNeeded', { integrationId });
        let token: TikTokTokenResponse;
        try {
            token = await postFormForJson<TikTokTokenResponse>(TT_TOKEN, {
                client_key: this.config.tiktokClientKey,
                client_secret: this.config.tiktokClientSecret,
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
            });
        } catch (e) {
            socialErrorLog(this.logger, 'TikTok', 'refreshTokenIfNeeded', e);
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
            await postFormForJson(TT_REVOKE, {
                client_key: this.config.tiktokClientKey,
                client_secret: this.config.tiktokClientSecret,
                token: accessToken,
            });
        } catch (e) {
            this.logger.warn(`TikTok revoke: ${(e as Error).message}`);
        }
    }

    async fetchAndStoreStats(integrationId: number): Promise<any> {
        socialDebugLog(this.logger, 'TikTok', 'fetchAndStoreStats start', { integrationId });
        const row = await this.integrationRepo.findOne({ where: { id: integrationId } });
        if (!row?.access_token) throw new Error('TikTok integration missing token');
        const auth = { Authorization: `Bearer ${row.access_token}` };

        let uinfo;
        try {
            uinfo = await firstValueFrom(
                this.httpService.get(
                    'https://open.tiktokapis.com/v2/user/info/?fields=open_id,display_name,username,follower_count,likes_count,video_count',
                    { headers: auth },
                ),
            );
        } catch (e) {
            socialErrorLog(this.logger, 'TikTok', 'fetchAndStoreStats user/info', e);
            throw e;
        }
        const u = uinfo.data?.data?.user;
        const followers = Number(u?.follower_count ?? 0);
        const lifetimeLikes = u?.likes_count != null ? Number(u.likes_count) : undefined;

        const posts: Array<{ id: string; like_count: number; view_count: number; posted_at?: string }> = [];
        let cursor = 0;
        for (let page = 0; page < 200; page++) {
            const url =
                'https://open.tiktokapis.com/v2/video/list/?fields=id,create_time,like_count,view_count';
            let res;
            try {
                res = await firstValueFrom(
                    this.httpService.post(
                        url,
                        { cursor, max_count: 20 },
                        { headers: { ...auth, 'Content-Type': 'application/json' } },
                    ),
                );
            } catch (e) {
                socialErrorLog(this.logger, 'TikTok', `fetchAndStoreStats video/list page=${page}`, e);
                throw e;
            }
            const data = res.data?.data;
            const vids = data?.videos ?? data?.video_list ?? [];
            for (const v of vids) {
                const id = v.id ?? v.video_id;
                if (!id) continue;
                const ct = v.create_time;
                posts.push({
                    id: String(id),
                    like_count: Number(v.like_count ?? 0),
                    view_count: Number(v.view_count ?? 0),
                    posted_at: ct != null ? new Date(Number(ct) * 1000).toISOString() : undefined,
                });
            }
            if (!data?.has_more) break;
            cursor = data?.cursor ?? 0;
        }

        socialDebugLog(this.logger, 'TikTok', 'fetchAndStoreStats done', { posts: posts.length, followers });
        return {
            followers_total: followers,
            lifetime_likes: lifetimeLikes,
            posts,
            views_definition: 'tiktok_video_views',
            sampled_posts_count: posts.length,
        };
    }
}
