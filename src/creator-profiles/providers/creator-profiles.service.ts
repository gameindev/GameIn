import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatorProfile } from '../creator-profile.entity';
import { QueryRunner, Repository } from 'typeorm';
import { PatchCreatorProfileDto } from '../dtos/patch-creatorProfile.dto';
import { UpdateCreatorProfileProvider } from './update-creator-profile.provider';
import { UpdateCreatorProfilePicProvider } from './update-creator-profile-pic.provider';
import { UpdateCreatorCoverPicProvider } from './update-creator-cover-pic.provider';
import { User } from '../../users/user.entity';

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
    public async createProfileForUser(user: User, queryRunner: QueryRunner): Promise<CreatorProfile> {
        const profile = queryRunner.manager.create(CreatorProfile, {
            user: user,
        });

        const creatorProfile = await queryRunner.manager.save(profile)
        return creatorProfile;
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
