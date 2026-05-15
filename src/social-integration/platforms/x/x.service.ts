import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import xConfig from './x.config';
import { firstValueFrom } from 'rxjs';
import { SocialIntegrationServiceInterface } from '../../interfaces/social-integration-service.interface';
import { SocialIntegration } from '../../entities/social-integration.entity';
import { ActiveUserData } from '../../../auth/interfaces/active-user-data.interface';
import { SocialPlatform } from '../../enums/social-platform.enums';
import { User } from '../../../users/user.entity';
import { signOAuthState, verifyOAuthState, newPkceVerifier, pkceChallengeS256 } from '../../utils/oauth-state.util';
import { postFormForJson } from '../../utils/form-http.util';
import { maskClientId, socialDebugLog, socialErrorLog } from '../../utils/social-oauth-debug.util';

const X_AUTH = 'https://x.com/i/oauth2/authorize';
const X_API = 'https://api.x.com/2';

type XTokenResponse = {
    access_token: string;
    refresh_token?: string;
    expires_in?: number;
    scope?: string;
};

@Injectable()
export class XService implements SocialIntegrationServiceInterface {
    private readonly logger = new Logger(XService.name);

    constructor(
        private readonly httpService: HttpService,
        @Inject(xConfig.KEY)
        private readonly config: ConfigType<typeof xConfig>,
        @InjectRepository(SocialIntegration)
        private readonly integrationRepo: Repository<SocialIntegration>,
    ) { }

    getCapabilities() {
        return {
            supportsLikes: true,
            supportsViews: true,
            supportsComments: true,
            supportsShares: true,
            supportsSocialAudienceDemographics: false,
            viewsDefinition: 'tweet public_metrics (likes); views/impressions depend on API product (may be 0 without non_public_metrics)',
        };
    }

    async probeProfile(accessToken: string): Promise<any> {
        const url = `${X_API}/users/me?user.fields=public_metrics`;
        socialDebugLog(this.logger, 'X', 'probeProfile GET /users/me');
        try {
            const { data } = await firstValueFrom(
                this.httpService.get(url, { headers: { Authorization: `Bearer ${accessToken}` } }),
            );
            socialDebugLog(this.logger, 'X', 'probeProfile ok', { userId: data?.data?.id });
            return data;
        } catch (err) {
            socialErrorLog(this.logger, 'X', 'probeProfile', err);
            throw err;
        }
    }

    profileSummary(profile: any) {
        const d = profile?.data;
        if (!d) return undefined;
        return { id: d.id, name: d.name, username: d.username };
    }

    getAuthUrl(user: ActiveUserData): string {
        const verifier = newPkceVerifier();
        const state = signOAuthState({
            sub: user.sub,
            platform: SocialPlatform.X,
            pkce_verifier: verifier,
        });
        const u = new URL(X_AUTH);
        u.searchParams.set('response_type', 'code');
        u.searchParams.set('client_id', this.config.xClientId);
        u.searchParams.set('redirect_uri', this.config.xCallbackUrl);
        u.searchParams.set('scope', this.config.xScopes.replace(/,/g, ' '));
        u.searchParams.set('state', state);
        u.searchParams.set('code_challenge', pkceChallengeS256(verifier));
        u.searchParams.set('code_challenge_method', 'S256');
        const out = u.toString();
        socialDebugLog(this.logger, 'X', 'getAuthUrl built', {
            redirect_uri: this.config.xCallbackUrl,
            client_id: maskClientId(this.config.xClientId),
            scope: this.config.xScopes.replace(/,/g, ' ').slice(0, 120),
        });
        return out;
    }

    async handleCallback(code: string, state: string): Promise<number> {
        socialDebugLog(this.logger, 'X', 'handleCallback start', { codeLen: code?.length, stateLen: state?.length });
        let payload;
        try {
            payload = verifyOAuthState(state, SocialPlatform.X);
        } catch (e) {
            socialErrorLog(this.logger, 'X', 'handleCallback verifyOAuthState', e);
            throw e;
        }
        const verifier = payload.pkce_verifier;
        if (!verifier) throw new Error('Missing PKCE verifier in OAuth state');
        socialDebugLog(this.logger, 'X', 'handleCallback state ok', { userId: payload.sub });

        const form: Record<string, string> = {
            grant_type: 'authorization_code',
            code,
            redirect_uri: this.config.xCallbackUrl,
            code_verifier: verifier,
        };

        const headers: Record<string, string> = {};
        if (this.config.xClientSecret) {
            const basic = Buffer.from(`${this.config.xClientId}:${this.config.xClientSecret}`).toString('base64');
            headers['Authorization'] = `Basic ${basic}`;
        } else {
            form.client_id = this.config.xClientId;
        }

        socialDebugLog(this.logger, 'X', 'handleCallback POST oauth2/token', {
            redirect_uri: this.config.xCallbackUrl,
            client_id: maskClientId(this.config.xClientId),
            authMode: this.config.xClientSecret ? 'Basic+secret' : 'public+client_id',
        });
        let token: XTokenResponse;
        try {
            token = await postFormForJson<XTokenResponse>(`${X_API}/oauth2/token`, form, headers);
        } catch (e) {
            socialErrorLog(this.logger, 'X', 'handleCallback token exchange', e);
            throw e;
        }
        socialDebugLog(this.logger, 'X', 'handleCallback token ok', {
            expires_in: token.expires_in,
            scope: token.scope,
            has_refresh: !!token.refresh_token,
        });

        let me;
        try {
            me = await firstValueFrom(
                this.httpService.get(`${X_API}/users/me?user.fields=public_metrics,username,name`, {
                    headers: { Authorization: `Bearer ${token.access_token}` },
                }),
            );
        } catch (e) {
            socialErrorLog(this.logger, 'X', 'handleCallback GET /users/me (after token)', e);
            throw e;
        }
        const userId = me.data?.data?.id;
        if (!userId) throw new Error('X /users/me missing id');
        socialDebugLog(this.logger, 'X', 'handleCallback profile', { xUserId: userId, username: me.data?.data?.username });

        const userEntity = await this.integrationRepo.manager.getRepository(User).findOneBy({ id: payload.sub });
        if (!userEntity) throw new Error('User not found');

        const expiresAt = token.expires_in
            ? new Date(Date.now() + token.expires_in * 1000)
            : undefined;

        let row = await this.integrationRepo.findOne({ where: { user: { id: payload.sub }, platform: SocialPlatform.X } });
        if (!row) {
            row = this.integrationRepo.create({
                user: userEntity,
                platform: SocialPlatform.X,
                social_id: userId,
                access_token: token.access_token,
                refresh_token: token.refresh_token,
                token_expires_at: expiresAt,
                scope_granted: token.scope,
            });
        } else {
            row.social_id = userId;
            row.access_token = token.access_token;
            if (token.refresh_token) row.refresh_token = token.refresh_token;
            row.token_expires_at = expiresAt;
            row.scope_granted = token.scope;
        }
        row = await this.integrationRepo.save(row);
        socialDebugLog(this.logger, 'X', 'handleCallback saved integration', { integrationId: row.id });
        return row.id;
    }

    async refreshTokenIfNeeded(
        integrationId: number,
        refreshToken?: string,
    ): Promise<{ access_token: string; refresh_token?: string } | null | undefined> {
        if (!refreshToken) return null;
        socialDebugLog(this.logger, 'X', 'refreshTokenIfNeeded', { integrationId });
        const form: Record<string, string> = {
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
        };
        const headers: Record<string, string> = {};
        if (this.config.xClientSecret) {
            const basic = Buffer.from(`${this.config.xClientId}:${this.config.xClientSecret}`).toString('base64');
            headers['Authorization'] = `Basic ${basic}`;
        } else {
            form.client_id = this.config.xClientId;
        }
        let token: XTokenResponse;
        try {
            token = await postFormForJson<XTokenResponse>(`${X_API}/oauth2/token`, form, headers);
        } catch (e) {
            socialErrorLog(this.logger, 'X', 'refreshTokenIfNeeded', e);
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
        const form: Record<string, string> = { token: accessToken };
        const headers: Record<string, string> = {};
        if (this.config.xClientSecret) {
            const basic = Buffer.from(`${this.config.xClientId}:${this.config.xClientSecret}`).toString('base64');
            headers['Authorization'] = `Basic ${basic}`;
        } else {
            form.client_id = this.config.xClientId;
        }
        try {
            await postFormForJson(`${X_API}/oauth2/revoke`, form, headers);
        } catch (e) {
            this.logger.warn(`X token revoke: ${(e as Error).message}`);
        }
    }

    async fetchAndStoreStats(integrationId: number): Promise<any> {
        socialDebugLog(this.logger, 'X', 'fetchAndStoreStats start', { integrationId });
        const row = await this.integrationRepo.findOne({ where: { id: integrationId } });
        if (!row?.access_token) throw new Error('X integration not found or missing token');
        const token = row.access_token;

        let me;
        try {
            me = await firstValueFrom(
                this.httpService.get(`${X_API}/users/me?user.fields=public_metrics`, {
                    headers: { Authorization: `Bearer ${token}` },
                }),
            );
        } catch (e) {
            socialErrorLog(this.logger, 'X', 'fetchAndStoreStats GET /users/me', e);
            throw e;
        }
        const uid = me.data?.data?.id;
        const followers = me.data?.data?.public_metrics?.followers_count ?? 0;

        const posts: any[] = [];
        let pagination_token: string | undefined;
        const maxPages = 40;

        for (let page = 0; page < maxPages; page++) {
            const params = new URLSearchParams({
                max_results: '100',
                'tweet.fields': 'public_metrics,non_public_metrics,created_at',
            });
            if (pagination_token) params.set('pagination_token', pagination_token);
            const url = `${X_API}/users/${uid}/tweets?${params.toString()}`;
            let resp: any;
            try {
                resp = await firstValueFrom(
                    this.httpService.get(url, { headers: { Authorization: `Bearer ${token}` } }),
                );
            } catch (err: any) {
                if (err?.response?.status === 403 || err?.response?.status === 400) {
                    const params2 = new URLSearchParams({
                        max_results: '100',
                        'tweet.fields': 'public_metrics,created_at',
                    });
                    if (pagination_token) params2.set('pagination_token', pagination_token);
                    resp = await firstValueFrom(
                        this.httpService.get(`${X_API}/users/${uid}/tweets?${params2.toString()}`, {
                            headers: { Authorization: `Bearer ${token}` },
                        }),
                    );
                } else {
                    throw err;
                }
            }

            const data = resp.data?.data ?? [];
            for (const t of data) {
                const pm = t.public_metrics ?? {};
                const npm = t.non_public_metrics ?? {};
                const impressions = npm.impression_count ?? pm.impression_count ?? 0;
                posts.push({
                    id: t.id,
                    like_count: Number(pm.like_count ?? 0),
                    comment_count: Number(pm.reply_count ?? 0),
                    retweet_count: Number(pm.retweet_count ?? 0),
                    quote_count: Number(pm.quote_count ?? 0),
                    impressions: Number(impressions),
                    view_count: Number(impressions),
                    posted_at: t.created_at,
                    raw: t,
                });
            }
            pagination_token = resp.data?.meta?.next_token;
            if (!pagination_token) break;
        }

        socialDebugLog(this.logger, 'X', 'fetchAndStoreStats done', { posts: posts.length, followers });
        return {
            followers_total: followers,
            posts,
            views_definition: 'impressions (non_public_metrics when permitted; else public_metrics only)',
            sampled_posts_count: posts.length,
        };
    }
}
