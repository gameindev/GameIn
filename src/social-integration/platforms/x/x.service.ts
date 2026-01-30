import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import xConfig from './x.config';
import { firstValueFrom } from 'rxjs';
import { createHash, randomBytes } from 'crypto';
import { SocialIntegrationServiceInterface } from '../../interfaces/social-integration-service.interface';
import { SocialIntegration } from '../../entities/social-integration.entity';
import { UsersService } from '../../../users/providers/users.service';
import { ActiveUserData } from '../../../auth/interfaces/active-user-data.interface';
import { SocialPlatform } from '../../enums/social-platform.enums';

const pkceStore = new Map<string, { verifier: string; userId: number; ts: number }>();

@Injectable()
export class XService implements SocialIntegrationServiceInterface {
    private readonly baseUrl = 'https://api.twitter.com/2';
    private readonly logger = new Logger(XService.name);

    constructor(
        private readonly httpService: HttpService,
        @Inject(xConfig.KEY)
        private readonly config: ConfigType<typeof xConfig>,
        @InjectRepository(SocialIntegration)
        private readonly integrationRepo: Repository<SocialIntegration>,

        private readonly userService: UsersService// Inject the UserRep
    ) { }


    /** Helpers */
    private makeVerifier(len = 64) {
        return randomBytes(len).toString('base64url'); // URL-safe, no padding
    }
    private makeChallenge(verifier: string) {
        return createHash('sha256').update(verifier).digest('base64url');
    }
    private makeState(userId: number) {
        return `${userId}.${randomBytes(16).toString('hex')}`;
    }
    private scopesString() {
        // allow env as "a b c" or array
        const s = this.config.xScopes;
        return Array.isArray(s) ? s.join(' ') : `${s}`.trim();
    }

    async probeProfile(accessToken: string): Promise<any> {
        return {}
    }

    /** redirect_uri must match exactly in authorize URL and token exchange and in X Developer Portal */
    private getRedirectUri(): string {
        return (this.config.xCallbackUrl || '').trim().replace(/\/$/, '');
    }

    getAuthUrl(user: ActiveUserData): string {
        const verifier = this.makeVerifier();
        const challenge = this.makeChallenge(verifier);

        const state = this.makeState(user.sub);
        pkceStore.set(state, { verifier, userId: user.sub, ts: Date.now() });

        const redirectUri = this.getRedirectUri();
        if (!redirectUri) {
            this.logger.warn('X_REDIRECT_URI is not set; OAuth will fail at callback');
        }

        const params = new URLSearchParams({
            client_id: (this.config.xClientId || '').trim(),
            redirect_uri: redirectUri,
            response_type: 'code',
            code_challenge: challenge,
            code_challenge_method: 'S256',
            scope: this.scopesString(),
            state,
        });

        return `https://x.com/i/oauth2/authorize?${params.toString()}`;
    }



    async handleCallback(code: string, state: string): Promise<void> {
        // 1) Look up PKCE verifier & user
        const entry = pkceStore.get(state);
        pkceStore.delete(state); // one-time use
        if (!entry) {
            this.logger.error(`Invalid/expired state: ${state}`);
            throw new Error('Invalid or expired state');
        }
        const { verifier, userId } = entry;

        const redirectUri = this.getRedirectUri();
        if (!redirectUri) {
            this.logger.error('X_REDIRECT_URI is not set');
            throw new Error('X callback URL is not configured');
        }

        // 2) Exchange code -> tokens (form-url-encoded)
        const tokenUrl = 'https://api.twitter.com/2/oauth2/token';
        const clientId = (this.config.xClientId || '').trim();
        const clientSecret = (this.config.xClientSecret || '').trim();
        if (!clientId || !clientSecret) {
            this.logger.error('X_CLIENT_ID or X_CLIENT_SECRET is not set');
            throw new Error('X OAuth credentials are not configured');
        }
        const body = new URLSearchParams({
            grant_type: 'authorization_code',
            code: (code || '').trim(),
            redirect_uri: redirectUri,
            code_verifier: verifier,
        });

        // Use axios auth option so Basic header is set correctly (avoids encoding issues)
        let response: any;
        try {
            response = await firstValueFrom(
                this.httpService.post(tokenUrl, body.toString(), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    },
                    auth: {
                        username: clientId,
                        password: clientSecret,
                    },
                }),
            );
        } catch (error: any) {
            const status = error?.response?.status;
            const data = error?.response?.data;
            this.logger.error(
                `X token exchange failed: ${status} - ${JSON.stringify(data || error.message)}`,
            );
            if (status === 401) {
                const hint = data?.error_description || data?.error || '';
                if (/redirect_uri|callback/i.test(String(hint))) {
                    throw new Error(
                        `X OAuth redirect_uri rejected. Ensure X_REDIRECT_URI matches exactly the Callback URL in your X Developer Portal (App → User authentication settings). Current value: ${redirectUri}`,
                    );
                }
                throw new Error(
                    `X OAuth credentials rejected. Check X_CLIENT_ID and X_CLIENT_SECRET (use OAuth 2.0 Client ID and Secret from X Developer Portal). ${hint}`,
                );
            }
            throw error;
        }

        const { access_token, refresh_token } = response.data;

        const userProfile = await this.getUserProfile(access_token);

        let integration = await this.integrationRepo.findOne({
            where: { user: { id: userId }, platform: SocialPlatform.X },
        });

        if (integration) {
            integration.access_token = access_token;
            integration.refresh_token = refresh_token;
            integration.social_id = userProfile.id;
            await this.integrationRepo.save(integration);
        } else {
            const newIntegration = this.integrationRepo.create({
                user: { id: userId },
                platform: SocialPlatform.X,
                access_token,
                refresh_token,
                social_id: userProfile.id,
            });
            await this.integrationRepo.save(newIntegration);
        }
    }

    async getUserProfile(accessToken: string): Promise<any> {
        const url = `${this.baseUrl}/users/me`;
        const response = await firstValueFrom(
            this.httpService.get(url, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }),
        );
        return response.data.data;
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

        const tokenUrl = 'https://api.twitter.com/2/oauth2/token';
        const params = new URLSearchParams({
            client_id: this.config.xClientId,
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

        // ✅ Correct base URL for Twitter
        const baseUrl = 'https://api.twitter.com/2';

        // 1️⃣ Refresh token if needed and use fresh token
        const tokens = await this.refreshTokenIfNeeded(integrationId);
        const access_token = tokens?.access_token ?? integration.access_token;
        if (tokens?.access_token) integration.access_token = tokens.access_token;

        try {
            // 2️⃣ Fetch user with public_metrics for followers_count (v2 API)
            const userUrl = `${baseUrl}/users/${integration.social_id}?user.fields=public_metrics`;
            const userRes = await firstValueFrom(
                this.httpService.get(userUrl, {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                }),
            );
            const followersCount = userRes.data?.data?.public_metrics?.followers_count ?? 0;

            // 3️⃣ Fetch latest tweets with metrics
            const tweetsUrl = `${baseUrl}/users/${integration.social_id}/tweets?max_results=50&tweet.fields=public_metrics`;
            const tweetsRes = await firstValueFrom(
                this.httpService.get(tweetsUrl, {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                }),
            );

            const tweets = tweetsRes.data?.data ?? [];

            // 4️⃣ Determine top liked & top viewed tweets
            let topLiked = null;
            let topViewed = null;

            if (tweets.length > 0) {
                topLiked = tweets.reduce((max, t) =>
                    (t.public_metrics?.like_count ?? 0) >
                        (max.public_metrics?.like_count ?? 0)
                        ? t
                        : max,
                );

                topViewed = tweets.reduce((max, t) =>
                    (t.public_metrics?.impression_count ?? 0) >
                        (max.public_metrics?.impression_count ?? 0)
                        ? t
                        : max,
                );
            }

            const topLikeSummary = topLiked
                ? {
                    id: topLiked.id,
                    text: topLiked.text,
                    likes: topLiked.public_metrics?.like_count ?? 0,
                }
                : null;

            const topViewSummary = topViewed
                ? {
                    id: topViewed.id,
                    text: topViewed.text,
                    views: topViewed.public_metrics?.impression_count ?? 0,
                }
                : null;

            // 5️⃣ Log for verification
            this.logger.log(`[X Stats] User ${integration.user.id}`, {
                followers: followersCount,
                topLiked: topLikeSummary,
                topViewed: topViewSummary,
            });

            // 6️⃣ Return summary (followers from public_metrics; likes/views from top tweet)
            return {
                followers: followersCount,
                topLiked: topLikeSummary,
                topViewed: topViewSummary,
            };
        } catch (error) {
            this.logger.error(`Error fetching X stats: ${error.response?.data?.error || error.message}`);
            if (error.response?.status === 401) {
                throw new Error('Invalid or expired access token. Please reconnect X account.');
            }
            throw error;
        }
    }



}
