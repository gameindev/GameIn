import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { OfferingsOrderService } from '../../offerings-order/providers/offerings-order.service';

/**
 * Scheduled tasks tied to offerings / sponsorship lifecycle.
 */
@Injectable()
export class OfferingsScheduler {
    private readonly logger = new Logger(OfferingsScheduler.name);

    constructor(private readonly offeringsOrderService: OfferingsOrderService) {}

    /**
     * After an offering’s `end_date`, paid or in-progress orders are marked DELIVERED
     * so the brand rating prompt (notification + inbox) can run.
     *
     * Schedule: 03:00 daily (cron timezone = server TZ, usually UTC on DigitalOcean).
     * Opt out: `AUTO_DELIVER_SPONSORSHIPS=false`
     */
    @Cron(CronExpression.EVERY_DAY_AT_3AM)
    async autoDeliverSponsorshipsPastEndDate(): Promise<void> {
        try {
            const { updated, failed } =
                await this.offeringsOrderService.autoDeliverOrdersPastOfferingEnd();
            if (updated > 0 || failed > 0) {
                this.logger.log(
                    `autoDeliverSponsorshipsPastEndDate: updated=${updated}, failed=${failed}`,
                );
            }
        } catch (err) {
            this.logger.error(
                `autoDeliverSponsorshipsPastEndDate failed: ${(err as Error)?.message}`,
                (err as Error)?.stack,
            );
        }
    }
}
