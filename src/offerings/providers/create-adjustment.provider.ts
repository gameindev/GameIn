


import { BadRequestException, ConflictException, ForbiddenException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Offering } from '../offerings.entity';
import { Repository } from 'typeorm';
import { PatchOfferingBundleDto } from '../dtos/patch-offering-bundle.dto';
import { UploadsService } from 'src/uploads/providers/uploads.service';
import { OfferingOffersService } from '../offering-offers/providers/offering-offers.service';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { UserType } from 'src/users/enums/user-type.enums';

@Injectable()
export class CreateAdjustmentProvider {
    constructor(
        @InjectRepository(Offering)
        private readonly repo: Repository<Offering>,
        private readonly offeringOffersService: OfferingOffersService,       
        private readonly uploadService: UploadsService,
        
    ) { }

    async createAdjustment(dto: PatchOfferingBundleDto, logo?: Express.Multer.File, user?: ActiveUserData) {
        const offeringId = dto.offering.id;

        // Step 1: Fetch offering
        const offering = await this.findExistingOffering(offeringId);
   
        
        // if the user.sub is equal to the offering.user_id, then the user is the owner of the offering
        // Check if user is either the owner (creator) or any brand user
        const isOwner = user?.sub === offering.user?.id;
        const isBrand = user?.user_type === UserType.BRAND;
        
        // Ensure user exists before proceeding
        if (!user) {
            throw new ForbiddenException('Authentication required');
        }

        // Allow access if user is either owner or brand
        if (isOwner || isBrand) {
            // Step 2: Replace logo if needed
            await this.replaceLogoIfNeeded(offering, logo);

            // Step 3: Update basic fields
            if (dto.offering.notes) {
                offering.notes = dto.offering.notes;
            }
            

            // Step 4: Adjust offers — pass the entity directly
            if (dto.offering.offers?.length) {
                await this.offeringOffersService.adjustOffers(offering, dto.offering.offers, user);
            }

            // Step 5: Reload updated entity with relations
            const updated = await this.repo.findOne({
                where: { id: offering.id },
                relations: ['offering_offers'],
            });

            return updated;
        }

        throw new ForbiddenException('You are not authorized to adjust this offering');
    }


    // ✅ Separated private method: fetch offering or throw
    private async findExistingOffering(id: number): Promise<Offering> {
        const offering = await this.repo.findOne({ where: { id }, relations: ['users'] });
        if (!offering) throw new NotFoundException(`Offering with ID ${id} not found`);
        return offering;
    }

    // ✅ Separated private method: handle logo logic
    private async replaceLogoIfNeeded(offering: Offering, newLogo?: Express.Multer.File) {
        if (offering.logo && newLogo) {
            // Sync: Update existing logo
            const oldUpload = offering.logo;
            offering.logo = await this.uploadService.uploadNew(newLogo);
            await this.repo.save(offering);
            await this.uploadService.deleteUpload(oldUpload);
        } else if (!offering.logo && newLogo) {
            // Add: No existing logo, just add new one
            offering.logo = await this.uploadService.uploadNew(newLogo);
            await this.repo.save(offering);
        }
    }


}

