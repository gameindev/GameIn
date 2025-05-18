import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BrandProfile } from '../brand-profile.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import { PatchBrandProfileDto } from '../dtos/patch-brandProfile.dto';

@Injectable()
export class BrandProfilesService {

    constructor(
        /**
         * Injecting BrandProfile Repository.
         */
        @InjectRepository(BrandProfile)
        private brandProfileRepository: Repository<BrandProfile>,
    ) { }

    /**
     * Creates a profile for a user.
     * @param user 
     * @returns 
     */
    public async createProfileForUser(user: User): Promise<BrandProfile> {
        const profile = this.brandProfileRepository.create({
            user: user,
        });

        return this.brandProfileRepository.save(profile);
    }

    /**
     * Updates a brand profile data on the application by User ID.
     * @param patchBrandProfileDto 
     */
    public async updateBrandProfile(patchBrandProfileDto: PatchBrandProfileDto) {

    }
}
