import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CreateOfferingOfferDto } from '../dtos/post-offering-offer.dto';
import { OfferingOffers } from '../offering-offers.entity';

@Injectable()
export class OfferingOffersService {

    constructor(
        @InjectRepository(OfferingOffers)
        private readonly repo: Repository<OfferingOffers>,
    ) { }

    async create(dto: CreateOfferingOfferDto, manager?: EntityManager): Promise<OfferingOffers> {
        const repo = manager ? manager.getRepository(OfferingOffers) : this.repo;
        const entity = repo.create(dto);
        return repo.save(entity);
    }

    async bulkCreate(dtos: CreateOfferingOfferDto[], manager?: EntityManager): Promise<OfferingOffers[]> {
        if (!dtos?.length) return [];
        const repo = manager ? manager.getRepository(OfferingOffers) : this.repo;
        const entities = repo.create(dtos);
        return repo.save(entities);
    }
}
