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
    private readonly baseUrl = 'https://api.x.com/2';
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

    async probeProfile(accessToken: string): Promise<any>{
        return {}
    }

    getAuthUrl(user: ActiveUserData): string {
        const verifier = this.makeVerifier();
        const challenge = this.makeChallenge(verifier);

        // 2) Create state and store verifier server-side
        const state = this.makeState(user.sub);
        pkceStore.set(state, { verifier, userId: user.sub, ts: Date.now() });

        // 3) Build authorize URL (S256, space-separated scopes)
        const params = new URLSearchParams({
            client_id: this.config.xClientId,
            redirect_uri: this.config.xCallbackUrl,
            response_type: 'code',
            code_challenge: challenge,
            code_challenge_method: 'S256',
            scope: this.scopesString(),                  // e.g. "tweet.read users.read offline.access"
            state,                                       // opaque; mapped to userId in pkceStore
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

        // 2) Exchange code -> tokens (form-url-encoded)
        const tokenUrl = 'https://api.x.com/2/oauth2/token';
        const basic = Buffer.from(`${this.config.xClientId}:${this.config.xClientSecret}`).toString('base64');
        const body = new URLSearchParams({
            grant_type: 'authorization_code',
            code,
            redirect_uri: this.config.xCallbackUrl,
            code_verifier: verifier,                    // <-- the ORIGINAL verifier
            // If you prefer Basic auth with client secret, omit client_id and add the header instead.
        });

        try { // Added try-catch for better error handling
            const response = await firstValueFrom(
            this.httpService.post(tokenUrl, body.toString(), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Basic ${basic}`, // <-- required for confidential clients
                },
            }),
        );

            const { access_token, refresh_token } = response.data;

            const userProfile = await this.getUserProfile(access_token);

            // <-- CHANGE 3: Use userId to find integration
            let integration = await this.integrationRepo.findOne({
                where: { user: { id: userId }, platform: SocialPlatform.X }
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
                    platform: SocialPlatform.X,
                    access_token,
                    refresh_token,
                    social_id: userProfile.id,
                });
                await this.integrationRepo.save(newIntegration);
            }
        } catch (error) {
            this.logger.error(`Error in X callback: ${error.message}`);
            // Re-throw the error to be caught by the NestJS exception filter
            throw error;
        }

        

    }

    async getUserProfile(accessToken: string): Promise<any> {
        const url = `${this.baseUrl}/users/me`;
        const response = await firstValueFrom(
            this.httpService.get(url, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Client-Id': this.config.xClientId,
                },
            }),
        );
        return response.data.data;
    }

    async refreshTokenIfNeeded(integrationId: number): Promise<{ access_token: string; refresh_token?: string }> {
        const integration = await this.integrationRepo.findOne({
            where: { id: integrationId },
            relations: ['users']
        });

        if (!integration) {
            throw new Error('Integration not found');
        }

        if (!integration.refresh_token) {
            throw new Error('No refresh token available');
        }        

        const tokenUrl = 'https://api.x.com/2/oauth2/token';       
        const params = new URLSearchParams({
            client_id: this.config.xClientId,
            client_secret: this.config.xClientSecret,
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

        return {access_token, refresh_token}
    }



    async fetchAndStoreStats(integrationId: number): Promise<any> {
        throw new Error('Method not implemented.');
    }

}
