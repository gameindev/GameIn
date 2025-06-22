import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { User } from 'src/users/user.entity';

export interface SocialIntegrationServiceInterface {
    getAuthUrl(user: ActiveUserData): string;
    handleCallback(code: string, user: ActiveUserData): Promise<void>;
    refreshTokenIfNeeded(integrationId: number): Promise<void>;
    fetchAndStoreStats(integrationId: number): Promise<void>;
}
