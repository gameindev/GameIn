import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { SocialIntegration } from '../entities/social-integration.entity';
import { SocialSyncJob } from '../entities/social-sync-job.entity';
import { SocialIntegrationService } from './social-integration.service';
import { SOCIAL_INTEGRATION_OAUTH_PLATFORMS } from '../enums/social-platform.enums';

const oauthPlatformSet = new Set(SOCIAL_INTEGRATION_OAUTH_PLATFORMS);
const SEED_SCOPE = 'seed_dummy_no_oauth';

function minIntervalMs(): number {
    const hours = Number(process.env.SOCIAL_SYNC_MIN_INTERVAL_HOURS);
    if (Number.isFinite(hours) && hours > 0) {
        return hours * 60 * 60 * 1000;
    }
    return 6 * 60 * 60 * 1000;
}

@Injectable()
export class SocialSyncScheduler {
    private readonly logger = new Logger(SocialSyncScheduler.name);

    constructor(
        @InjectRepository(SocialIntegration)
        private readonly integrationRepo: Repository<SocialIntegration>,
        @InjectRepository(SocialSyncJob)
        private readonly syncJobRepo: Repository<SocialSyncJob>,
        private readonly socialIntegrationService: SocialIntegrationService,
    ) {}

    /**
     * Background sync — only OAuth-complete integrations, respects min interval since last success.
     * Manual POST /social-integration/sync bypasses this scheduler.
     */
    @Cron(process.env.SOCIAL_SYNC_CRON ?? CronExpression.EVERY_6_HOURS)
    async syncConnectedAccounts(): Promise<void> {
        const integrations = await this.integrationRepo.find({
            where: { access_token: Not(IsNull()) },
            relations: ['user'],
        });

        const minGap = minIntervalMs();
        let synced = 0;
        let skipped = 0;

        for (const integration of integrations) {
            if (!integration.platform || !oauthPlatformSet.has(integration.platform)) {
                skipped++;
                continue;
            }

            if (integration.scope_granted === SEED_SCOPE) {
                skipped++;
                continue;
            }

            const lastJob = await this.syncJobRepo.findOne({
                where: { integration: { id: integration.id } },
                order: { last_success_at: 'DESC' },
            });

            if (lastJob?.last_success_at) {
                const elapsed = Date.now() - new Date(lastJob.last_success_at).getTime();
                if (elapsed < minGap) {
                    skipped++;
                    continue;
                }
            }

            try {
                await this.socialIntegrationService.fetchStats(
                    integration.platform,
                    integration.id,
                    integration.user?.id,
                );
                synced++;
            } catch (error) {
                this.logger.warn(
                    `Sync failed for integration ${integration.id} (${integration.platform}): ${(error as Error)?.message}`,
                );
            }
        }

        if (synced || skipped) {
            this.logger.log(`Social sync cycle: ${synced} synced, ${skipped} skipped`);
        }
    }

    /** Ensures one snapshot row per integration per UTC day from cached rollups (no external API calls) */
    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    async dailyMetricSnapshotsFromRollups(): Promise<void> {
        const integrations = await this.integrationRepo.find({
            where: { access_token: Not(IsNull()) },
            relations: ['user'],
        });

        for (const integration of integrations) {
            if (!integration.platform || !oauthPlatformSet.has(integration.platform)) continue;
            if (integration.scope_granted === SEED_SCOPE) continue;

            try {
                await this.socialIntegrationService.upsertDailySnapshotFromRollup(integration.id);
            } catch (error) {
                this.logger.warn(`Daily snapshot failed for integration ${integration.id}: ${(error as Error)?.message}`);
            }
        }
    }
}
