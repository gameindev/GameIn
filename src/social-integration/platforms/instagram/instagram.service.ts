import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SocialIntegrationServiceInterface } from '../../interfaces/social-integration-service.interface';
import { SocialIntegration } from '../../entities/social-integration.entity';
import { SocialPlatform } from '../../enums/social-platform.enums';
import { ActiveUserData } from '../../../auth/interfaces/active-user-data.interface';
import instagramConfig from './instagram.config';
import { User } from '../../../users/user.entity';
import { signOAuthState, verifyOAuthState } from '../../utils/oauth-state.util';
import { getJson } from '../../utils/form-http.util';
import { maskClientId, socialDebugLog, socialErrorLog } from '../../utils/social-oauth-debug.util';

@Injectable()
export class InstagramService implements SocialIntegrationServiceInterface {
    private readonly logger = new Logger(InstagramService.name);

    constructor(
        @Inject(instagramConfig.KEY)
        private readonly config: ConfigType<typeof instagramConfig>,
        @InjectRepository(SocialIntegration)
        private readonly integrationRepo: Repository<SocialIntegration>,
    ) { }

    getCapabilities() {
        return {
            supportsLikes: true,
            supportsViews: true,
            viewsDefinition: 'IG media like_count; video/reels views via insights metric plays (when available)',
        };
    }

    async probeProfile(accessToken: string): Promise<any> {
        socialDebugLog(this.logger, 'Instagram', 'probeProfile me/accounts');
        const v = this.config.instagramGraphVersion;
        const accUrl = `https://graph.facebook.com/${v}/me/accounts?fields=name,access_token,instagram_business_account&access_token=${encodeURIComponent(accessToken)}`;
        let acc;
        try {
            acc = await getJson<any>(accUrl);
        } catch (e) {
            socialErrorLog(this.logger, 'Instagram', 'probeProfile me/accounts', e);
            throw e;
        }
        const page = (acc.data ?? []).find((x: any) => x.instagram_business_account);
        if (!page) return {};
        const igId = page.instagram_business_account.id;
        const pt = page.access_token;
        try {
            const ig = await getJson<any>(
                `https://graph.facebook.com/${v}/${igId}?fields=id,username,name,profile_picture_url,followers_count&access_token=${encodeURIComponent(pt)}`,
            );
            socialDebugLog(this.logger, 'Instagram', 'probeProfile ok', { igId });
            return ig;
        } catch (e) {
            socialErrorLog(this.logger, 'Instagram', 'probeProfile ig user', e);
            throw e;
        }
    }

    profileSummary(profile: any) {
        const d = profile as { id?: string; username?: string; name?: string };
        if (!d?.id) return undefined;
        return { id: d.id, name: d.name, username: d.username };
    }

    getAuthUrl(user: ActiveUserData): string {
        const state = signOAuthState({ sub: user.sub, platform: SocialPlatform.INSTAGRAM });
        const v = this.config.instagramGraphVersion;
        const u = new URL(`https://www.facebook.com/${v}/dialog/oauth`);
        u.searchParams.set('client_id', this.config.instagramAppId);
        u.searchParams.set('redirect_uri', this.config.instagramCallbackUrl);
        u.searchParams.set('response_type', 'code');
        u.searchParams.set('scope', this.config.instagramScopes.replace(/,/g, ' '));
        u.searchParams.set('state', state);
        socialDebugLog(this.logger, 'Instagram', 'getAuthUrl built', {
            redirect_uri: this.config.instagramCallbackUrl,
            app_id: maskClientId(this.config.instagramAppId),
            graph: this.config.instagramGraphVersion,
        });
        return u.toString();
    }

    private async exchangeCodeForUserToken(code: string): Promise<{ access_token: string; expires_in?: number }> {
        const v = this.config.instagramGraphVersion;
        const u = new URL(`https://graph.facebook.com/${v}/oauth/access_token`);
        u.searchParams.set('client_id', this.config.instagramAppId);
        u.searchParams.set('client_secret', this.config.instagramAppSecret);
        u.searchParams.set('redirect_uri', this.config.instagramCallbackUrl);
        u.searchParams.set('code', code);
        return getJson(u.toString());
    }

    private async longLivedUserToken(shortToken: string): Promise<{ access_token: string; expires_in?: number }> {
        const v = this.config.instagramGraphVersion;
        const u = new URL(`https://graph.facebook.com/${v}/oauth/access_token`);
        u.searchParams.set('grant_type', 'fb_exchange_token');
        u.searchParams.set('client_id', this.config.instagramAppId);
        u.searchParams.set('client_secret', this.config.instagramAppSecret);
        u.searchParams.set('fb_exchange_token', shortToken);
        return getJson(u.toString());
    }

    async handleCallback(code: string, state: string): Promise<number> {
        socialDebugLog(this.logger, 'Instagram', 'handleCallback start', { codeLen: code?.length });
        let payload;
        try {
            payload = verifyOAuthState(state, SocialPlatform.INSTAGRAM);
        } catch (e) {
            socialErrorLog(this.logger, 'Instagram', 'verifyOAuthState', e);
            throw e;
        }
        let userToken: string;
        let igUserId: string;
        let expiresAt: Date | undefined;
        try {
            const shortTok = await this.exchangeCodeForUserToken(code);
            socialDebugLog(this.logger, 'Instagram', 'handleCallback short-lived token ok');
            const longTok = await this.longLivedUserToken(shortTok.access_token);
            userToken = longTok.access_token;
            expiresAt = longTok.expires_in ? new Date(Date.now() + longTok.expires_in * 1000) : undefined;
            socialDebugLog(this.logger, 'Instagram', 'handleCallback long-lived token ok');

            const v = this.config.instagramGraphVersion;
            const acc = await getJson<any>(
                `https://graph.facebook.com/${v}/me/accounts?fields=access_token,instagram_business_account&access_token=${encodeURIComponent(userToken)}`,
            );
            const page = (acc.data ?? []).find((x: any) => x.instagram_business_account);
            if (!page?.instagram_business_account?.id) {
                throw new Error('No Instagram Professional account linked to a Facebook Page for this user');
            }
            igUserId = page.instagram_business_account.id;
        } catch (e) {
            socialErrorLog(this.logger, 'Instagram', 'handleCallback graph exchange / me/accounts', e);
            throw e;
        }
        socialDebugLog(this.logger, 'Instagram', 'handleCallback linked IG', { igUserId });

        const userEntity = await this.integrationRepo.manager.getRepository(User).findOneBy({ id: payload.sub });
        if (!userEntity) throw new Error('User not found');

        let row = await this.integrationRepo.findOne({ where: { user: { id: payload.sub }, platform: SocialPlatform.INSTAGRAM } });
        if (!row) {
            row = this.integrationRepo.create({
                user: userEntity,
                platform: SocialPlatform.INSTAGRAM,
                social_id: igUserId,
                access_token: userToken,
                refresh_token: null,
                token_expires_at: expiresAt,
                scope_granted: this.config.instagramScopes,
            });
        } else {
            row.social_id = igUserId;
            row.access_token = userToken;
            row.token_expires_at = expiresAt;
            row.scope_granted = this.config.instagramScopes;
        }
        row = await this.integrationRepo.save(row);
        socialDebugLog(this.logger, 'Instagram', 'handleCallback saved', { integrationId: row.id });
        return row.id;
    }

    private async resolvePageTokenForIg(userAccessToken: string, igUserId: string): Promise<string> {
        const v = this.config.instagramGraphVersion;
        let acc;
        try {
            acc = await getJson<any>(
                `https://graph.facebook.com/${v}/me/accounts?fields=access_token,instagram_business_account&access_token=${encodeURIComponent(userAccessToken)}`,
            );
        } catch (e) {
            socialErrorLog(this.logger, 'Instagram', 'resolvePageTokenForIg me/accounts', e);
            throw e;
        }
        const page = (acc.data ?? []).find((x: any) => x.instagram_business_account?.id === igUserId);
        if (!page?.access_token) {
            throw new Error('Could not resolve Page access token for this Instagram account');
        }
        return page.access_token;
    }

    async refreshTokenIfNeeded(
        integrationId: number,
        _refreshToken?: string,
    ): Promise<{ access_token: string; refresh_token?: string } | null | undefined> {
        const row = await this.integrationRepo.findOne({ where: { id: integrationId } });
        if (!row?.access_token) return null;
        const v = this.config.instagramGraphVersion;
        const u = new URL(`https://graph.facebook.com/${v}/oauth/access_token`);
        u.searchParams.set('grant_type', 'fb_exchange_token');
        u.searchParams.set('client_id', this.config.instagramAppId);
        u.searchParams.set('client_secret', this.config.instagramAppSecret);
        u.searchParams.set('fb_exchange_token', row.access_token);
        try {
            const longTok = await getJson<{ access_token: string; expires_in?: number }>(u.toString());
            row.access_token = longTok.access_token;
            if (longTok.expires_in) row.token_expires_at = new Date(Date.now() + longTok.expires_in * 1000);
            await this.integrationRepo.save(row);
            socialDebugLog(this.logger, 'Instagram', 'refreshTokenIfNeeded', { integrationId, ok: true });
            return { access_token: longTok.access_token };
        } catch (err: unknown) {
            socialErrorLog(this.logger, 'Instagram', `refreshTokenIfNeeded integrationId=${integrationId}`, err);
            return null;
        }
    }

    private async igMediaInsightsViewCount(pageToken: string, mediaId: string, mediaType: string): Promise<number> {
        if (mediaType === 'IMAGE') return 0;
        const v = this.config.instagramGraphVersion;
        const metrics = mediaType === 'REELS' || mediaType === 'VIDEO' ? 'plays' : 'plays';
        try {
            const url = `https://graph.facebook.com/${v}/${mediaId}/insights?metric=${metrics}&access_token=${encodeURIComponent(pageToken)}`;
            const ins = await getJson<any>(url);
            const val = ins.data?.[0]?.values?.[0]?.value;
            return val != null ? Number(val) : 0;
        } catch {
            try {
                const url2 = `https://graph.facebook.com/${v}/${mediaId}/insights?metric=impressions&access_token=${encodeURIComponent(pageToken)}`;
                const ins2 = await getJson<any>(url2);
                const val2 = ins2.data?.[0]?.values?.[0]?.value;
                return val2 != null ? Number(val2) : 0;
            } catch {
                return 0;
            }
        }
    }

    async fetchAndStoreStats(integrationId: number): Promise<any> {
        socialDebugLog(this.logger, 'Instagram', 'fetchAndStoreStats start', { integrationId });
        const row = await this.integrationRepo.findOne({ where: { id: integrationId } });
        if (!row?.access_token || !row.social_id) throw new Error('Instagram integration incomplete');
        let pageToken: string;
        try {
            pageToken = await this.resolvePageTokenForIg(row.access_token, row.social_id);
        } catch (err: unknown) {
            socialErrorLog(this.logger, 'Instagram', `fetchAndStoreStats resolvePageToken integrationId=${integrationId}`, err);
            throw err;
        }
        const v = this.config.instagramGraphVersion;
        const igId = row.social_id;

        let followers: number;
        try {
            const userResp = await getJson<any>(
                `https://graph.facebook.com/${v}/${igId}?fields=followers_count&access_token=${encodeURIComponent(pageToken)}`,
            );
            followers = Number(userResp.followers_count ?? 0);
            socialDebugLog(this.logger, 'Instagram', 'fetchAndStoreStats ig user ok', { integrationId, followers });
        } catch (err: unknown) {
            socialErrorLog(this.logger, 'Instagram', `fetchAndStoreStats ig user integrationId=${integrationId}`, err);
            throw err;
        }

        const posts: Array<{ id: string; like_count: number; view_count: number; posted_at?: string; raw?: any }> = [];
        let after: string | undefined;
        for (let page = 0; page < 40; page++) {
            let url = `https://graph.facebook.com/${v}/${igId}/media?fields=id,media_type,timestamp,like_count,comments_count&limit=50&access_token=${encodeURIComponent(pageToken)}`;
            if (after) url += `&after=${encodeURIComponent(after)}`;
            let m: any;
            try {
                m = await getJson<any>(url);
            } catch (err: unknown) {
                socialErrorLog(this.logger, 'Instagram', `fetchAndStoreStats media page=${page} integrationId=${integrationId}`, err);
                throw err;
            }
            const items = m.data ?? [];
            socialDebugLog(this.logger, 'Instagram', 'fetchAndStoreStats media page', {
                integrationId,
                page,
                batchSize: items.length,
            });
            for (const it of items) {
                let views: number;
                try {
                    views = await this.igMediaInsightsViewCount(pageToken, it.id, it.media_type);
                } catch (err: unknown) {
                    socialErrorLog(
                        this.logger,
                        'Instagram',
                        `fetchAndStoreStats igMediaInsights mediaId=${it.id} integrationId=${integrationId}`,
                        err,
                    );
                    throw err;
                }
                posts.push({
                    id: it.id,
                    like_count: Number(it.like_count ?? 0),
                    view_count: views,
                    posted_at: it.timestamp,
                    raw: it,
                });
            }
            after = m.paging?.cursors?.after;
            if (!after) break;
        }

        socialDebugLog(this.logger, 'Instagram', 'fetchAndStoreStats done', { integrationId, posts: posts.length });
        return {
            followers_total: followers,
            posts,
            views_definition: 'instagram_insights_plays_or_impressions',
            sampled_posts_count: posts.length,
        };
    }
}
