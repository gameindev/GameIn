import { OfferingBaseService } from './offering.base.service';
import { Offering } from './../offerings.entity';
import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { OfferingOffersService } from '../offering-offers/providers/offering-offers.service';
import { OfferingPriceService } from '../offering-price/providers/offering-price.service';
import { CreateOfferingBundleDto } from '../dtos/post-offering-bundle.dto';
import { CreateOfferingDto } from '../dtos/post-offering.dto';
import { UsersService } from 'src/users/providers/users.service';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { UserType } from 'src/users/enums/user-type.enums';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OfferingsService {

    constructor(
        private readonly dataSource: DataSource,
        private readonly offeringBaseService: OfferingBaseService,
        private readonly OfferingOffersService: OfferingOffersService,
        private readonly priceService: OfferingPriceService,
        private readonly userService: UsersService,
        
        @InjectRepository(Offering)
        private readonly repo: Repository<Offering>
    ) { }

    // async createBundle(dto: CreateOfferingBundleDto) {
    //     // Using transaction ensures ACID compliance
    //     return this.dataSource.transaction(async (manager) => {
    //         try {
    //             // 1) Create base offering
    //             const offering = await this.offeringBaseService.create(dto.offering, manager);
    //             if (!offering) {
    //                 throw new Error('Failed to create base offering');
    //             }

    //             // 2) Attach FK to offers (media) and insert
    //             const offersPayload = dto.offers.map(o => ({ ...o, offeringId: offering.id }));
    //             const offers = await this.OfferingOffersService.bulkCreate(offersPayload, manager);
    //             if (!offers) {
    //                 throw new Error('Failed to create offers');
    //             }

    //             // 3) Attach FK to prices (if any) and insert
    //             const pricePayload = dto.prices ? { ...dto.prices, offeringId: offering.id } : null;
    //             const prices = pricePayload ? await this.priceService.create(pricePayload, manager) : null;
    //             if (pricePayload && !prices) {
    //                 throw new Error('Failed to create prices');
    //             }

    //             // 4) Return composed result
    //             return { offering, offers, prices };
    //         } catch (error) {
    //             // Transaction will automatically rollback on error
    //             throw error;
    //         }
    //     });
    // }


    /**
     * 
     * CreateOfferingDto {
            type: 'INDIVIDUAL',
            title: 'Ultimate Promoting Package',
            description: 'Lorem ipsum dolor sit amit.',
            stream_platform: 'TWITCH',
            start_date: 2025-09-01T10:00:00.000Z,
            end_date: 2025-09-10T10:00:00.000Z,
            event_type: 'MATCH',
            game: 'Valorant',
            estimated_views: 1000000,
            team_id: 2,
            org_funds: '200000',
            notes: 'Lorem ipsum dolor sit amit',
            terms_of_use: 'Lorem ipsum dolor sit amit',
            is_terms_signed: false,
            can_edit: false,
            status: 'OFFERED',
            meta_data: {}
        } {
            sub: 14,
            email: 'roy.gourav6490@gmail.com',
            userType: 'CREATOR',
            iat: 1756656494,
            exp: 1756660094,
            aud: 'localhost:3000',
            iss: 'localhost:3000'
        }
     */
    async createOffering(offerinDto: CreateOfferingDto, user: ActiveUserData) {
        let currentUser = undefined;

        try {
            currentUser = this.userService.getUserById(user.sub)
        } catch (error) {
            throw new InternalServerErrorException('Error while trying to find User.');
        }
      
        if (!currentUser) {
            throw new BadRequestException('User not found!')
        } else if ((await currentUser).user_type !== UserType.CREATOR) {
            throw new BadRequestException('User is not a CREATOR')
        }

        const offering = this.repo.create({
            ...offerinDto,
            user: (await currentUser),
        });

        try {
            const savedOffering = await this.repo.save(offering);
            const { user, ...offeringWithoutUser } = savedOffering;
            return {
                ...offeringWithoutUser,
                user_id: user.id
            };
        } catch (error) {
            throw new InternalServerErrorException('Error while trying to create an Offering.');
        }
    }
}
