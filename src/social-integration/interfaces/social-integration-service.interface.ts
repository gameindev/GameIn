import { ActiveUserData } from '@/auth/interfaces/active-user-data.interface';
import { User } from '@/users/user.entity';
import { ConnectionState, SocialPlatform } from '../enums/social-platform.enums';

export interface SocialIntegrationServiceInterface {

    probeProfile(accessToken: string): Promise<any>;

    /** Optional: trim external profile into a tiny UI summary (id/name/username). */
    profileSummary?(profile: any): { id?: string; name?: string; username?: string } | undefined;

    getAuthUrl(user: ActiveUserData): string;
    handleCallback(code: string, state: string): Promise<void>;
    refreshTokenIfNeeded(integrationId: number, refreshToken?: string): Promise<{ access_token: string; refresh_token?: string } | null | undefined>;
    fetchAndStoreStats(integrationId: number): Promise<any>;
}

export interface ConnectionCheckResult {
    user_id: number;
    integration_id?: number;
    platform: SocialPlatform; // your enum
    state: ConnectionState;   // 'ADD' | 'CONNECT' | 'CONNECTED'
    label: 'Add' | 'Connect' | 'Connected';
    refreshed?: boolean;
    warning?: string; // e.g., 'RATE_LIMIT'
    summary?: { id?: string; name?: string; username?: string }; // optional UI snippet
}