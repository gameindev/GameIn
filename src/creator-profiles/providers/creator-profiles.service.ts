import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatorProfile } from '../creator-profile.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import { PatchCreatorProfileDto } from '../dtos/patch-creatorProfile.dto';
import { UpdateCreatorProfileProvider } from './update-creator-profile.provider';
import { UpdateCreatorProfilePicProvider } from './update-creator-profile-pic.provider';
import { UpdateCreatorCoverPicProvider } from './update-creator-cover-pic.provider';

/**
 * Creator Profiles service.
 */
@Injectable()
export class CreatorProfilesService {

    constructor(
 
        @InjectRepository(CreatorProfile)
        private readonly creatorProfileRepository: Repository<CreatorProfile>, 

        private readonly updateCreatorProfileProvider: UpdateCreatorProfileProvider,

        private readonly updateCreatorCoverPicProvider: UpdateCreatorCoverPicProvider,

        private readonly updateCreatorProfilePicProvider: UpdateCreatorProfilePicProvider,
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


    public async updateCreatorProfilePic(profileId: number, file: Express.Multer.File) {
        return await this.updateCreatorProfilePicProvider.updateCreatorProfilePic(profileId, file);
    }

    public async updateCreatorCoverPic(profileId: number, file: Express.Multer.File) {
        return await this.updateCreatorCoverPicProvider.updateCreatorCoverPic(profileId, file);
    }

}
