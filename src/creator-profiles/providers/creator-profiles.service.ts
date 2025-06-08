import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatorProfile } from '../creator-profile.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import { CreateCreatorProfileDto } from '../dtos/create-creatorProfile.dto';
import { PatchCreatorProfileDto } from '../dtos/patch-creatorProfile.dto';
import { UpdateCreatorProfileProvider } from './update-creator-profile.provider';

/**
 * Creator Profiles service.
 */
@Injectable()
export class CreatorProfilesService {

    constructor(
        /**
         * Injecting CreatorProfileRepository.
         */
        @InjectRepository(CreatorProfile)
        private readonly creatorProfileRepository: Repository<CreatorProfile>, 
        /**
         * Injecting Update Creator Profile Provider.
         */
        private readonly updateCreatorProfileProvider: UpdateCreatorProfileProvider,
    ) {

    }

    /**
     * Creates a profile for a user.
     * @param user 
     * @returns 
     */
    public async createProfileForUser(user: User): Promise<CreatorProfile> {
        const profile = this.creatorProfileRepository.create({
            user: user,
        });

        return this.creatorProfileRepository.save(profile);
    }

    /**
     * Updates a creator profile data on the application by User ID.
     * @param patchCreatorProfileDto 
     */
    public async updateCreatorProfile(patchCreatorProfileDto: PatchCreatorProfileDto) {
        return await this.updateCreatorProfileProvider.updateCreatorProfile(patchCreatorProfileDto);
    }

}
