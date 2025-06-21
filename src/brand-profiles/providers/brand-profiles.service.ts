import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BrandProfile } from '../brand-profile.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import { PatchBrandProfileDto } from '../dtos/patch-brandProfile.dto';
import { UpdateBrandProfileProvider } from './update-brand-profile.provider';
import { UpdateBrandCoverPicProvider } from './update-brand-cover-pic.provider';
import { UpdateBrandProfilePicProvider } from './update-brand-profile-pic.provider';

@Injectable()
export class BrandProfilesService {

    constructor(
        /**
         * Injecting BrandProfile Repository.
         */
        @InjectRepository(BrandProfile)
        private brandProfileRepository: Repository<BrandProfile>,

        /**
         * Injecting Update Brand Profile Provider.
         */
        private readonly updateBrandProfileProvider: UpdateBrandProfileProvider,
        private readonly updateBrandProfilePicProvider: UpdateBrandProfilePicProvider,
        private readonly updateBrandCoverPicProvider: UpdateBrandCoverPicProvider,
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
        return await this.updateBrandProfileProvider.updateBrandProfile(patchBrandProfileDto);
    }

    public async updateBrandProfilePic(profileId: number, file: Express.Multer.File) {
        return await this.updateBrandProfilePicProvider.updateBrandProfilePic(profileId, file);
    }

    public async updateBrandCoverPic(profileId: number, file: Express.Multer.File) {
        return await this.updateBrandCoverPicProvider.updateBrandCoverPic(profileId, file);
    }

}
