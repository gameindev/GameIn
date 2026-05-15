import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SocialIntegration } from '../../entities/social-integration.entity';
import { SocialPlatform } from '../../enums/social-platform.enums';
import { SocialIntegrationServiceInterface } from '../../interfaces/social-integration-service.interface';
import twitchConfig from './twitch.config';
import { ActiveUserData } from '../../../auth/interfaces/active-user-data.interface';
import { User } from '../../../users/user.entity';
import { signOAuthState, verifyOAuthState } from '../../utils/oauth-state.util';
import { postFormForJson } from '../../utils/form-http.util';
import { maskClientId, socialDebugLog, socialErrorLog } from '../../utils/social-oauth-debug.util';

const TWITCH_AUTH = 'https://id.twitch.tv/oauth2/authorize';
const TWITCH_TOKEN = 'https://id.twitch.tv/oauth2/token';
const TWITCH_REVOKE = 'https://id.twitch.tv/oauth2/revoke';
const HELIX = 'https://api.twitch.tv/helix';

const TWITCH_SCOPES = 'user:read:email';

type TwitchTokenResponse = {
    access_token: string;
    refresh_token?: string;
    expires_in?: number;
    scope?: string;
};

@Injectable()
export class TwitchService implements SocialIntegrationServiceInterface {
    private readonly logger = new Logger(TwitchService.name);

    constructor(
        private readonly httpService: HttpService,
        @Inject(twitchConfig.KEY)
        private readonly config: ConfigType<typeof twitchConfig>,
        @InjectRepository(SocialIntegration)
        private readonly integrationRepo: Repository<SocialIntegration>,
    ) { }

    getCapabilities() {
        return {
            supportsLikes: false,
            supportsViews: true,
            supportsComments: false,
            supportsShares: false,
            supportsSocialAudienceDemographics: false,
            viewsDefinition: 'VOD view_count (Helix Get Videos)',
        };
    }

    async probeProfile(accessToken: string): Promise<any> {
        socialDebugLog(this.logger, 'Twitch', 'probeProfile GET /helix/users');
        try {
            const { data } = await firstValueFrom(
                this.httpService.get(`${HELIX}/users`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Client-Id': this.config.twitchClientId,
                    },
                }),
            );
            socialDebugLog(this.logger, 'Twitch', 'probeProfile ok', { login: data?.data?.[0]?.login });
            return data;
        } catch (e) {
            socialErrorLog(this.logger, 'Twitch', 'probeProfile', e);
            throw e;
        }
    }

    profileSummary(profile: any) {
        const u = profile?.data?.[0];
        if (!u) return undefined;
        return { id: u.id, name: u.display_name, username: u.login };
    }

    getAuthUrl(user: ActiveUserData): string {
        const state = signOAuthState({ sub: user.sub, platform: SocialPlatform.TWITCH });
        const u = new URL(TWITCH_AUTH);
        u.searchParams.set('client_id', this.config.twitchClientId);
        u.searchParams.set('redirect_uri', this.config.twitchCallbackUrl);
        u.searchParams.set('response_type', 'code');
        u.searchParams.set('scope', TWITCH_SCOPES);
        u.searchParams.set('state', state);
        socialDebugLog(this.logger, 'Twitch', 'getAuthUrl built', {
            redirect_uri: this.config.twitchCallbackUrl,
            client_id: maskClientId(this.config.twitchClientId),
        });
        return u.toString();
    }

    async handleCallback(code: string, state: string): Promise<number> {
        socialDebugLog(this.logger, 'Twitch', 'handleCallback start', { codeLen: code?.length });
        let payload;
        try {
            payload = verifyOAuthState(state, SocialPlatform.TWITCH);
        } catch (e) {
            socialErrorLog(this.logger, 'Twitch', 'verifyOAuthState', e);
            throw e;
        }
        let token: TwitchTokenResponse;
        try {
            token = await postFormForJson<TwitchTokenResponse>(TWITCH_TOKEN, {
                client_id: this.config.twitchClientId,
                client_secret: this.config.twitchClientSecret,
                code,
                grant_type: 'authorization_code',
                redirect_uri: this.config.twitchCallbackUrl,
            });
        } catch (e) {
            socialErrorLog(this.logger, 'Twitch', 'handleCallback token exchange', e);
            throw e;
        }
        socialDebugLog(this.logger, 'Twitch', 'handleCallback token ok', { scope: token.scope });

        let prof;
        try {
            prof = await firstValueFrom(
                this.httpService.get(`${HELIX}/users`, {
                    headers: {
                        Authorization: `Bearer ${token.access_token}`,
                        'Client-Id': this.config.twitchClientId,
                    },
                }),
            );
        } catch (e) {
            socialErrorLog(this.logger, 'Twitch', 'handleCallback GET /users', e);
            throw e;
        }
        const broadcasterId = prof.data?.data?.[0]?.id;
        if (!broadcasterId) throw new Error('Twitch users missing id');

        const userEntity = await this.integrationRepo.manager.getRepository(User).findOneBy({ id: payload.sub });
        if (!userEntity) throw new Error('User not found');

        const expiresAt = token.expires_in ? new Date(Date.now() + token.expires_in * 1000) : undefined;

        let row = await this.integrationRepo.findOne({ where: { user: { id: payload.sub }, platform: SocialPlatform.TWITCH } });
        if (!row) {
            row = this.integrationRepo.create({
                user: userEntity,
                platform: SocialPlatform.TWITCH,
                social_id: broadcasterId,
                access_token: token.access_token,
                refresh_token: token.refresh_token,
                token_expires_at: expiresAt,
                scope_granted: token.scope,
            });
        } else {
            row.social_id = broadcasterId;
            row.access_token = token.access_token;
            if (token.refresh_token) row.refresh_token = token.refresh_token;
            row.token_expires_at = expiresAt;
            row.scope_granted = token.scope;
        }
        row = await this.integrationRepo.save(row);
        socialDebugLog(this.logger, 'Twitch', 'handleCallback saved', { integrationId: row.id, broadcasterId });
        return row.id;
    }

    async refreshTokenIfNeeded(
        integrationId: number,
        refreshToken?: string,
    ): Promise<{ access_token: string; refresh_token?: string } | null | undefined> {
        if (!refreshToken) return null;
        socialDebugLog(this.logger, 'Twitch', 'refreshTokenIfNeeded', { integrationId });
        let token: TwitchTokenResponse;
        try {
            token = await postFormForJson<TwitchTokenResponse>(TWITCH_TOKEN, {
                client_id: this.config.twitchClientId,
                client_secret: this.config.twitchClientSecret,
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
            });
        } catch (e) {
            socialErrorLog(this.logger, 'Twitch', 'refreshTokenIfNeeded', e);
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
            await postFormForJson(TWITCH_REVOKE, {
                client_id: this.config.twitchClientId,
                client_secret: this.config.twitchClientSecret,
                token: accessToken,
            });
        } catch (e) {
            this.logger.warn(`Twitch revoke: ${(e as Error).message}`);
        }
    }

    async fetchAndStoreStats(integrationId: number): Promise<any> {
        socialDebugLog(this.logger, 'Twitch', 'fetchAndStoreStats start', { integrationId });
        const row = await this.integrationRepo.findOne({ where: { id: integrationId } });
        if (!row?.access_token || !row.social_id) throw new Error('Twitch integration incomplete');
        const headers = {
            Authorization: `Bearer ${row.access_token}`,
            'Client-Id': this.config.twitchClientId,
        };

        let fol;
        try {
            fol = await firstValueFrom(
                this.httpService.get(`${HELIX}/channels/followers?broadcaster_id=${encodeURIComponent(row.social_id)}&first=1`, {
                    headers,
                }),
            );
        } catch (e) {
            socialErrorLog(this.logger, 'Twitch', 'fetchAndStoreStats followers', e);
            throw e;
        }
        const followersTotal = Number(fol.data?.total ?? 0);

        const posts: Array<{ id: string; like_count: number; view_count: number }> = [];
        let cursor: string | undefined;
        for (let page = 0; page < 30; page++) {
            const u = new URL(`${HELIX}/videos`);
            u.searchParams.set('user_id', row.social_id);
            u.searchParams.set('first', '100');
            if (cursor) u.searchParams.set('after', cursor);
            let resp;
            try {
                resp = await firstValueFrom(this.httpService.get(u.toString(), { headers }));
            } catch (e) {
                socialErrorLog(this.logger, 'Twitch', `fetchAndStoreStats videos page=${page}`, e);
                throw e;
            }
            const data = resp.data?.data ?? [];
            for (const v of data) {
                posts.push({
                    id: v.id,
                    like_count: 0,
                    view_count: Number(v.view_count ?? 0),
                });
            }
            cursor = resp.data?.pagination?.cursor;
            if (!cursor) break;
        }

        socialDebugLog(this.logger, 'Twitch', 'fetchAndStoreStats done', { videos: posts.length, followers: followersTotal });
        return {
            followers_total: followersTotal,
            posts,
            views_definition: 'vod_views',
            sampled_posts_count: posts.length,
        };
    }
}
