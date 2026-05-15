import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SocialIntegration } from '../entities/social-integration.entity';
import { SocialIntegrationService } from './social-integration.service';
import { SOCIAL_INTEGRATION_OAUTH_PLATFORMS } from '../enums/social-platform.enums';

const oauthPlatformSet = new Set(SOCIAL_INTEGRATION_OAUTH_PLATFORMS);

@Injectable()
export class SocialSyncScheduler {
    private readonly logger = new Logger(SocialSyncScheduler.name);

    constructor(
        @InjectRepository(SocialIntegration)
        private readonly integrationRepo: Repository<SocialIntegration>,
        private readonly socialIntegrationService: SocialIntegrationService,
    ) {}

    @Cron(CronExpression.EVERY_30_MINUTES)
    async syncConnectedAccounts(): Promise<void> {
        const integrations = await this.integrationRepo.find({ relations: ['user'] });
        for (const integration of integrations) {
            if (!oauthPlatformSet.has(integration.platform)) continue;
            try {
                await this.socialIntegrationService.fetchStats(integration.platform, integration.id, integration.user?.id);
            } catch (error) {
                this.logger.warn(`Sync failed for integration ${integration.id} (${integration.platform}): ${(error as Error)?.message}`);
            }
        }
    }

    /** Ensures one snapshot row per integration per UTC day from cached rollups (no external API calls) */
    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    async dailyMetricSnapshotsFromRollups(): Promise<void> {
        const integrations = await this.integrationRepo.find({ relations: ['user'] });
        for (const integration of integrations) {
            if (!oauthPlatformSet.has(integration.platform)) continue;
            try {
                await this.socialIntegrationService.upsertDailySnapshotFromRollup(integration.id);
            } catch (error) {
                this.logger.warn(`Daily snapshot failed for integration ${integration.id}: ${(error as Error)?.message}`);
            }
        }
    }
}
