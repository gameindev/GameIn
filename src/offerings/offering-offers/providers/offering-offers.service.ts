import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
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
        if (!dto.offering_id || !dto.offer_type) {
            throw new BadRequestException('offering_id and offer_type are required');
        }

        const repository = manager ? manager.getRepository(OfferingOffers) : this.repo;

        const existing = await repository.findOne({
            where: {
                offering_id: Number(dto.offering_id),
                offer_type: dto.offer_type,
            },
        });

        if (existing) {
            throw new ConflictException('An offer with this offering_id and offer_type already exists');
        }

        const entity = repository.create({
            ...dto,
            offering_id: Number(dto.offering_id),
        });

        try {
            return await repository.save(entity);
        } catch (err: any) {
            // Postgres: 23505; MySQL: ER_DUP_ENTRY (1062)
            if (err?.code === '23505' || err?.code === 'ER_DUP_ENTRY' || err?.errno === 1062) {
                throw new ConflictException('Duplicate offer detected (offering_id + offer_type must be unique).');
            }
            throw err;
        }
    }

    async bulkCreate(dtos: CreateOfferingOfferDto[], manager?: EntityManager): Promise<OfferingOffers[]> {
        if (!dtos?.length) return [];

        const processed = dtos.map(d => ({
            ...d,
            offering_id: Number(d.offering_id),
        }));

        // 1) Detect duplicates inside the payload itself
        const seen = new Set<string>();
        const dupKeys = new Set<string>();
        for (const d of processed) {
            if (!d.offering_id || !d.offer_type) {
                throw new BadRequestException('Each offer must include offering_id and offer_type');
            }
            const key = `${d.offering_id}:${d.offer_type}`;
            if (seen.has(key)) dupKeys.add(key);
            else seen.add(key);
        }
        if (dupKeys.size) {
            throw new BadRequestException(
                `Duplicate offers in payload for: ${[...dupKeys].join(', ')}`
            );
        }

        const repository = manager ? manager.getRepository(OfferingOffers) : this.repo;

        // 2) Detect conflicts already in the DB (OR where-clause)
        const existing = await repository.find({
            where: processed.map(d => ({
                offering_id: d.offering_id,
                offer_type: d.offer_type,
            })),
        });

        if (existing.length > 0) {
            const conflicts = existing.map(e => `${e.offering_id}:${e.offer_type}`);
            throw new ConflictException(
                `Some offers already exist for this offering: ${conflicts.join(', ')}`
            );
        }

        // 3) Save (and still catch DB-level uniqueness just in case of race)
        const entities = repository.create(processed);
        try {
            return await repository.save(entities);
        } catch (err: any) {
            if (err?.code === '23505' || err?.code === 'ER_DUP_ENTRY' || err?.errno === 1062) {
                throw new ConflictException('Duplicate offer detected (offering_id + offer_type must be unique).');
            }
            throw err;
        }
    }
}
