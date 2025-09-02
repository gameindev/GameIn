import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OfferingPrice } from '../offering-price.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateOfferingPriceDto } from '../dtos/post-offer-price.dto';

@Injectable()
export class OfferingPriceService {
    constructor(
        @InjectRepository(OfferingPrice)
        private readonly repo: Repository<OfferingPrice>,
    ) { }

    async create(dto: CreateOfferingPriceDto, manager?: EntityManager): Promise<OfferingPrice> {
        if (!dto?.offering_id) {
            throw new BadRequestException('offering_id is required');
        }

        const repository = manager ? manager.getRepository(OfferingPrice) : this.repo;

        // Normalize types
        const offering_id = Number(dto.offering_id);
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
}
