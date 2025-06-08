import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PatchCreatorProfileDto } from '../dtos/patch-creatorProfile.dto';
import { Repository } from 'typeorm';
import { CreatorProfile } from '../creator-profile.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UpdateCreatorProfileProvider {

    constructor(
        /**
         * Injecting CreatorProfileRepository.
         */
        @InjectRepository(CreatorProfile)
        private readonly creatorProfileRepository: Repository<CreatorProfile>,        
    ){}

    public async updateCreatorProfile(patchCreatorProfileDto: PatchCreatorProfileDto) {
        let creatorProfile = undefined;

        try {
            creatorProfile = await this.creatorProfileRepository.findOneBy({
                user: { id: patchCreatorProfileDto.userId, }
            });
        } catch (error) {
            throw new InternalServerErrorException('Error while trying to find creator profile.');
        }

        if (!creatorProfile) {
            throw new BadRequestException('Creator profile not found.');
        }

        try {
            creatorProfile = await this.creatorProfileRepository.save({
                ...creatorProfile,
                ...patchCreatorProfileDto,
            });
        } catch (error) {
            throw new InternalServerErrorException('Error while trying to update creator profile.');
        }

        return creatorProfile;

        
    }
}
