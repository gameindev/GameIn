import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SocialIntegration } from '../entities/social-integration.entity';
import { SocialIntegrationProvider } from './social-integration.provider';
import { SocialPlatform } from '../enums/social-platform.enums';
import { User } from 'src/users/user.entity';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';

@Injectable()
export class SocialIntegrationService {
    constructor(
        @InjectRepository(SocialIntegration)
        private readonly integrationRepo: Repository<SocialIntegration>,
        private readonly integrationProvider: SocialIntegrationProvider,
    ) {}

    getAuthUrl(platform: SocialPlatform, user: ActiveUserData) {
        const provider = this.integrationProvider.getProvider(platform);
        return provider.getAuthUrl(user);
    }

    handleCallback(platform: SocialPlatform, code: string, user: ActiveUserData) {
        const provider = this.integrationProvider.getProvider(platform);
        return provider.handleCallback(code, user);
    }

    fetchStats(platform: SocialPlatform, integrationId: number) {
        const provider = this.integrationProvider.getProvider(platform);
        return provider.fetchAndStoreStats(integrationId);
    }
}
