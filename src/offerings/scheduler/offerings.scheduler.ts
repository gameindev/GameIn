
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { Offering } from '../offerings.entity';
import { OfferingStatus } from '../enums/offering-status.enum';

@Injectable()
export class OfferingsScheduler {
    private readonly logger = new Logger(OfferingsScheduler.name);

    constructor(
        @InjectRepository(Offering)
        private readonly offeringRepo: Repository<Offering>
    ) { }

    // @Cron(CronExpression.EVERY_10_MINUTES)
    // async expireStaleOffers(): Promise<void> {
    //     const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000); // 24 hours ago

    //     const expired = await this.offeringRepo.find({
    //         where: {
    //             status: OfferingStatus.OFFERED,
    //             last_adjusted_at: LessThan(cutoff)
    //         },
    //     });

    //     if (expired.length > 0) {
    //         for (const offer of expired) {
    //             offer.status = OfferingStatus.EXPIRED;
    //             await this.offeringRepo.save(offer);

    //             // TODO: ADD NOTIFIER

    //             this.logger.log(`Offer ID ${offer.id} marked as expired.`);
    //         }
    //     }
    // }
}
