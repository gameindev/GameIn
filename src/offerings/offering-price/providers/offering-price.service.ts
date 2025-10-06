import { BadRequestException, ConflictException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OfferingPrice } from '../offering-price.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateOfferingPriceDto } from '../dtos/post-offer-price.dto';
import { Offering } from '@/offerings/offerings.entity';
import { OfferingStatus } from '@/offerings/enums/offering-status.enum';
import { OfferingsService } from '@/offerings/providers/offerings.service';

@Injectable()
export class OfferingPriceService {
    constructor(
        @InjectRepository(OfferingPrice)
        private readonly repo: Repository<OfferingPrice>,

        @Inject(forwardRef(() => OfferingsService))
        private readonly offeringsService: OfferingsService,
    ) { }

    async create(offering_id: number, dto: CreateOfferingPriceDto, manager?: EntityManager): Promise<OfferingPrice> {
        if (!offering_id) {
            throw new BadRequestException('offering_id is required');
        }

        const repository = manager ? manager.getRepository(OfferingPrice) : this.repo;

        // Normalize types
        if (Number.isNaN(offering_id)) {
            throw new BadRequestException('offering_id must be a number');
        }


        const entity = repository.create({ ...dto, offering_id });

        try {
            return await repository.save(entity);
        } catch (err: any) {
            // Postgres 23505; MySQL 1062/ER_DUP_ENTRY
            if (err?.code === '23505' || err?.code === 'ER_DUP_ENTRY' || err?.errno === 1062) {
                throw new ConflictException('Duplicate price detected (unique constraint violated).');
            }
            throw err;
        }
    }



    async updatePrice(offeringId: number, dto: CreateOfferingPriceDto) {
        const offering = await this.offeringsService.findOne(offeringId);
        if (!offering || offering.adjustment_count >= 8 || offering.status === OfferingStatus.ACCEPTED) {
            throw new BadRequestException('Price adjustment not allowed');
        }


        let price = await this.repo.findOne({ where: { offering: { id: offeringId } } });
        if (price) {
            Object.assign(price, dto);
        } else {
            price = this.repo.create({ ...dto, offering });
        }
        await this.repo.save(price);


        offering.adjustment_count++;
        offering.last_adjusted_at = new Date();
        await this.offeringsService.saveOne(offering);


        return price;
    }
}
