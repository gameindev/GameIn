

// offering-base.servicets
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { CreateOfferingDto } from '../dtos/post-offering.dto';
import { Offering } from '../offerings.entity';

@Injectable()
export class OfferingBaseService {
    constructor(
        @InjectRepository(Offering)
        private readonly repo: Repository<Offering>,
    ) { }

    async create(dto: CreateOfferingDto, manager?: EntityManager) {
        // const repo = manager ? manager.getRepository(Offering) : this.repo;
        // const entity = repo.create(dto);
        // return repo.save(entity);
    }
}
