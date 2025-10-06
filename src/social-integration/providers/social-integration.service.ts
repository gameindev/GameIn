import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SocialIntegration } from '../entities/social-integration.entity';
import { SocialIntegrationProvider } from './social-integration.provider';
import { ConnectionState, SocialPlatform } from '../enums/social-platform.enums';
import { User } from 'src/users/user.entity';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { ConnectionCheckResult, SocialIntegrationServiceInterface } from '../interfaces/social-integration-service.interface';

type ProviderMap = Record<SocialPlatform, SocialIntegrationServiceInterface>;

@Injectable()
export class SocialIntegrationService {
    private readonly logger = new Logger(SocialIntegrationService.name);

    constructor(
        @InjectRepository(SocialIntegration)
        private readonly integrationRepo: Repository<SocialIntegration>,
        private readonly integrationProvider: SocialIntegrationProvider,
        @Inject('SOCIAL_PROVIDER_MAP')
        private readonly providers: ProviderMap,
    ) { }

    private labelFor(state: ConnectionState): 'Add' | 'Connect' | 'Connected' {
        switch (state) {
            case 'ADD': return 'Add';
            case 'CONNECT': return 'Connect';
            default: return 'Connected';
        }
    }

    private isUnauthorized(err: unknown): boolean {
        // Covers 401/403 and common "invalid_grant" 400 shapes
        const anyErr = err as any;
        const status = anyErr?.response?.status;
        const code = anyErr?.response?.data?.error;
        return status === 401 || status === 403 || (status === 400 && code === 'invalid_grant');
    }

    private isRateLimited(err: unknown): boolean {
        return (err as any)?.response?.status === 429;
    }


    async checkConnection(userId: number, platform: SocialPlatform): Promise<ConnectionCheckResult> {
        // 1) No row at all => "ADD"
        const row = await this.integrationRepo.findOne({ where: { user: { id: userId }, platform } });
        if (!row) {
            return { user_id: userId, platform, state: 'ADD', label: this.labelFor('ADD') };
        }

        // 2) Need a provider implementation
        const provider = this.providers[platform];
        if (!provider) {
            this.logger.error(`No social provider registered for ${platform}`);
            return { user_id: userId, platform, state: 'CONNECT', label: this.labelFor('CONNECT'), warning: 'NO_PROVIDER' };
        }

        // 3) Probe with current access token
        try {
            const profile = await provider.probeProfile(row.access_token);
            const summary = provider.profileSummary?.(profile);
            return { user_id: userId, platform, state: 'CONNECTED', label: this.labelFor('CONNECTED'), summary, integration_id: row.id };
        } catch (err) {
            // 4) Try refresh on auth failure (if refresh_token + provider supports refresh)
            if (this.isUnauthorized(err) && row.refresh_token && provider.refreshTokenIfNeeded(userId, row.refresh_token)) {
                try {
                    const refreshed = await provider.refreshTokenIfNeeded(userId, row.refresh_token);
                    if (refreshed?.access_token) {
                        row.access_token = refreshed.access_token;
                        if (refreshed.refresh_token) row.refresh_token = refreshed.refresh_token;
                        const integration = await this.integrationRepo.save(row);

                        // Re-probe after refresh
                        try {
                            const profile = await provider.probeProfile(row.access_token);
                            const summary = provider.profileSummary?.(profile);
                            return { user_id: userId, platform, state: 'CONNECTED', label: this.labelFor('CONNECTED'), integration_id: integration.id, refreshed: true, summary };
                        } catch (err2) {
                            this.logger.warn(`Re-probe failed after refresh (${platform}): ${err2?.message ?? err2}`);
                        }
                    }
                } catch (refreshErr) {
                    this.logger.warn(`Refresh failed (${platform}): ${refreshErr?.message ?? refreshErr}`);
                }
            }

            // 5) Rate limited => token likely valid; keep "CONNECTED" but warn UI (e.g., grey tooltip)
            if (this.isRateLimited(err)) {
                return { user_id: userId, platform, state: 'CONNECTED', label: this.labelFor('CONNECTED'), warning: 'RATE_LIMIT' };
            }

            // 6) Anything else => we have a row but it’s not usable => "CONNECT" (re-auth)
            return { user_id: userId, platform, state: 'CONNECT', label: this.labelFor('CONNECT') };
        }
    }


    async checkAll(userId: number, platforms: SocialPlatform[]): Promise<ConnectionCheckResult[]> {
        return Promise.all(platforms.map(p => this.checkConnection(userId, p)));
    }


    getAuthUrl(platform: SocialPlatform, user: ActiveUserData) {
        const provider = this.integrationProvider.getProvider(platform);
        return provider.getAuthUrl(user);
    }

    handleCallback(platform: SocialPlatform, code: string, state: string) {
        const provider = this.integrationProvider.getProvider(platform);
        return provider.handleCallback(code, state);
    }

    fetchStats(platform: SocialPlatform, integrationId: number) {
        const provider = this.integrationProvider.getProvider(platform);
        return provider.fetchAndStoreStats(integrationId);
    }
}
