import { OfferingBaseService } from './offering.base.service';
import { Offering } from './../offerings.entity';
import { BadRequestException, forwardRef, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { OfferingOffersService } from '../offering-offers/providers/offering-offers.service';
import { OfferingPriceService } from '../offering-price/providers/offering-price.service';
import { CreateOfferingBundleDto } from '../dtos/post-offering-bundle.dto';
import { CreateOfferingDto } from '../dtos/post-offering.dto';
import { UsersService } from 'src/users/providers/users.service';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { UserType } from 'src/users/enums/user-type.enums';
import { InjectRepository } from '@nestjs/typeorm';
import { OfferingOffers } from '../offering-offers/offering-offers.entity';
import { FindOfferingsParams } from '../enums/offering-type.enum';
import { CreateAdjustmentProvider } from './create-adjustment.provider';
import { PatchOfferingBundleDto } from '../dtos/patch-offering-bundle.dto';



@Injectable()
export class OfferingsService {

    constructor(
        private readonly dataSource: DataSource,
        private readonly offeringBaseService: OfferingBaseService,
        private readonly offeringOffersService: OfferingOffersService,
        private readonly priceService: OfferingPriceService,
        private readonly userService: UsersService,

        @Inject(CreateAdjustmentProvider)
        private readonly createAdjustmentProvider: CreateAdjustmentProvider,

        @InjectRepository(Offering)
        private readonly repo: Repository<Offering>,
 
        @InjectRepository(OfferingOffers)
        private readonly offeringOffersRepo: Repository<OfferingOffers>
    ) { }


    async createOfferingBundle(dto: CreateOfferingBundleDto, user: ActiveUserData) {
        return this.dataSource.transaction(async (manager) => {
            // 1) Create base offering
            const offering = await this.createOffering(dto.offering, user, manager);
            if (!offering) {
                throw new InternalServerErrorException('Failed to create base offering');
            }

            // 2) Offers (optional)
            let offers = [];
            if (dto.offers?.length) {
               
                offers = await this.offeringOffersService.bulkCreate(offering.id, dto.offers, manager);
            }

            // 3) Price (optional; single)
            let prices = null;
            if (dto.price) {               
                prices = await this.priceService.create(offering.id, dto.price, manager);
            }

            // 4) Return composed result
            return { offering, offers, prices };
        });
    }




    async createOffering(offerinDto: CreateOfferingDto, user: ActiveUserData, manager?: EntityManager) {
        let currentUser;
        
        try {
            currentUser = await this.userService.getUserById(user.sub);
        } catch (error) {
            throw new InternalServerErrorException('Error while trying to find User.');
        }
        
        if (!currentUser) {
            throw new BadRequestException('User not found!');
        }
        if (currentUser.user_type !== UserType.CREATOR) {
            throw new BadRequestException('User is not a CREATOR');
        }
        
        const repo = manager ? manager.getRepository(Offering) : this.repo;
        const offering = repo.create({
            ...offerinDto,
            user: currentUser,
            last_adjusted_by: currentUser,
        }); 
        
        try {
            const savedOffering = await repo.save(offering);            
            const { user, ...offeringWithoutUser } = savedOffering;
            return { ...offeringWithoutUser, user_id: user.id };
        } catch (error) {
            throw new InternalServerErrorException('Error while trying to create an Offering.');
        }
    }



    async findAll(params: FindOfferingsParams = {}) {
        try {
            // ---- defaults + validation ----
            const page = Number.isInteger(params.page) && params.page! > 0 ? params.page! : 1;
            const limitRaw = Number.isInteger(params.limit) && params.limit! > 0 ? params.limit! : 20;
            const limit = Math.min(limitRaw, 100);
            const skip = (page - 1) * limit;

            const entityMeta = this.repo.metadata;

            // Allowed relations = actual relation property names from metadata
            const allowedRelations = new Set(entityMeta.relations.map(r => r.propertyName));
            const requested = Array.isArray(params.relations) && params.relations.length
                ? params.relations
                : ['user']; // sensible default

            const relationsToJoin = requested.filter(r => allowedRelations.has(r));

            // ---- query builder ----
            const qb = this.repo.createQueryBuilder('off');

            // Join requested relations
            for (const rel of relationsToJoin) {
                qb.leftJoinAndSelect(`off.${rel}`, rel);
            }

            // ---- optional filter: user_id ----
            if (typeof params.user_id === 'number' && Number.isFinite(params.user_id)) {
                // Since the user relation is eager and always loaded, we can filter directly
                qb.andWhere('off.user.id = :uid', { uid: params.user_id });
            }

            // ---- ordering ----
            // Use created_at column name since that's what's defined in the entity
            qb.orderBy('off.created_at', 'DESC');

            // ---- run + paginate ----
            const [data, total] = await qb.skip(skip).take(limit).getManyAndCount();

            return {
                data,
                meta: {
                    total,
                    page,
                    limit,
                    pages: Math.ceil(total / limit),
                },
            };
        } catch (err: any) {
            // Log the underlying error for debugging
            console.error('findAll error:', err);
            throw new InternalServerErrorException('Failed to fetch offerings.');
        }
    }



    async saveOne(offering: Offering) {
        return await this.repo.save(offering);
    }


    async findOne(id: number) {
        return await this.findOneById(id);
    }


    async findOneById(
        id: number,
        relations?: Array<'user' | 'offering_offers' | 'offering_price' | 'logo'>,
    ) {
        try {
            // Validate relations against entity metadata to avoid invalid joins
            const allowed = new Set(
                this.repo.metadata.relations.map((r) => r.propertyName),
            );
            const safeRelations = (relations ?? []).filter((r) => allowed.has(r));

            const offering = await this.repo.findOne({
                where: { id },
                relations: safeRelations,
            });

            if (!offering) {
                throw new NotFoundException(`Offering with ID ${id} not found`);
            }

            return offering;
        } catch (err) {
            if (err instanceof NotFoundException) throw err;
            throw new InternalServerErrorException('Failed to fetch offering');
        }
    }

    
    async createAdjustment(dto: PatchOfferingBundleDto, logo?: Express.Multer.File, user?: ActiveUserData) {
        return await this.createAdjustmentProvider.createAdjustment(dto, logo, user);
    }



}
