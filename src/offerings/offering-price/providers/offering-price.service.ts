import { Injectable } from '@nestjs/common';
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
        const repo = manager ? manager.getRepository(OfferingPrice) : this.repo;
        const entity = repo.create(dto);
        return repo.save(entity);
    }
}
