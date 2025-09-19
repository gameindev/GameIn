import { BadRequestException, ConflictException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CreateOfferingOfferDto } from '../dtos/post-offering-offer.dto';
import { OfferingOffers } from '../offering-offers.entity';
import { Offering } from 'src/offerings/offerings.entity';
import { OfferingStatus } from 'src/offerings/enums/offering-status.enum';
import { OfferingsService } from 'src/offerings/providers/offerings.service';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { isEqual } from 'lodash';
import { UsersService } from 'src/users/providers/users.service';


@Injectable()
export class OfferingOffersService {
    constructor(
        @InjectRepository(OfferingOffers)
        private readonly repo: Repository<OfferingOffers>,

        @Inject(forwardRef(() => OfferingsService))
        private readonly offeringsService: OfferingsService,
        private readonly usersService: UsersService,
    ) { }

    async create(offering_id: number, dto: CreateOfferingOfferDto, manager?: EntityManager): Promise<OfferingOffers> {
        if (!offering_id || !dto.offer_type) {
            throw new BadRequestException('offering_id and offer_type are required');
        }

        const repository = manager ? manager.getRepository(OfferingOffers) : this.repo;

        const existing = await repository.findOne({
            where: {
                offering_id: offering_id,
                offer_type: dto.offer_type,
            },
        });

        if (existing) {
            throw new ConflictException('An offer with this offering_id and offer_type already exists');
        }

        const entity = repository.create({
            ...dto,
            offering_id
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

    async bulkCreate(offering_id: number, dtos: CreateOfferingOfferDto[], manager?: EntityManager): Promise<OfferingOffers[]> {
        if (!dtos?.length) return [];

        const processed = dtos.map(d => ({
            ...d,
            offering_id,
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


    async adjustOffers(offering: Offering, offers: Partial<OfferingOffers>[], user?: ActiveUserData) {
        if (
            !offering ||
            offering.adjustment_count >= 8 ||
            offering.status === OfferingStatus.ACCEPTED
        ) {
            throw new BadRequestException('Adjustment not allowed');
        }

        const getUser = await this.usersService.getUserById(user?.sub);

        await Promise.all(offers.map(async offer => {
            if (!offer.offering_id || !offer.offer_type) {
                throw new BadRequestException('Each offer must include offering_id and offer_type');
            }

            // Check if the current offertype and offering id is exists
            const existing = await this.repo.findOne({
                where: {
                    offering_id: offer.offering_id,
                    offer_type: offer.offer_type,
                },
                order: {
                    version: 'DESC',
                    created_at: 'DESC',
                }
            })


            // do check all the columns if there is any changes from request data
            const fieldsToCheck = ['time_mode', 'schedule', 'repetition', 'duration', 'size', 'sub_type'];
            const isChanged = fieldsToCheck.some(key => {
                const existingValue = existing?.[key];
                const newValue = offer[key];
                return !isEqual(existingValue, newValue);
            });



            if (existing) {

                if (isChanged) {
                    // Update the existing offer
                    await this.repo.save({
                        ...existing,
                        ...offer,
                        id: undefined,
                        version: existing.version + 1,
                        updated_by_user_id: user?.sub,
                    });
                }
            } else {
                // create a new offer
                await this.repo.save({
                    ...offer,
                    version: 1,
                    offering_id: offer.offering_id,
                    offer_type: offer.offer_type,
                    updated_by_user_id: user?.sub,
                })
            }


        }))

        // Update offering stats
        offering.adjustment_count++;
        offering.last_adjusted_at = new Date();
        offering.last_adjusted_by = getUser;
        await this.offeringsService.saveOne(offering);

        return offers;
    }


}
