import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { WalletReleaseService } from '../providers/wallet-release.service';

@Injectable()
export class WalletReleaseScheduler {
    private readonly logger = new Logger(WalletReleaseScheduler.name);

    constructor(private readonly walletReleaseService: WalletReleaseService) {}

    @Cron(CronExpression.EVERY_HOUR)
    async processDueReleases(): Promise<void> {
        try {
            const { processed, failed } = await this.walletReleaseService.processDueReleases();
            if (processed > 0 || failed > 0) {
                this.logger.log(`Wallet release job: processed=${processed}, failed=${failed}`);
            }
        } catch (err) {
            this.logger.error(`Wallet release job failed: ${(err as Error)?.message}`);
        }
    }
}
