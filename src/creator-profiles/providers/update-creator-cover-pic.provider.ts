import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatorProfile } from '../creator-profile.entity';
import { Repository } from 'typeorm';
import { UploadsService } from '../../uploads/providers/uploads.service';

@Injectable()
export class UpdateCreatorCoverPicProvider {

    constructor(
        @InjectRepository(CreatorProfile)
        private readonly creatorProfileRepository: Repository<CreatorProfile>,
        private readonly uploadService: UploadsService, // <-- Inject uploadService here
    ) { }

    public async updateCreatorCoverPic(profileId: number, coverImageFile: Express.Multer.File) { 
        let creatorProfile: CreatorProfile;

        try {
            creatorProfile = await this.creatorProfileRepository.findOne({
                where: { id: profileId },
                relations: ['cover_image'],
            });

        } catch (error) {
            throw new InternalServerErrorException('Error while trying to find creator profile.');
        }

        if (!creatorProfile) {
            throw new BadRequestException('Creator profile not found.');
        }

        if (coverImageFile) {
            if (creatorProfile.cover_image) {
                // Step 1: Unlink FK
                const oldUpload = creatorProfile.cover_image;
                creatorProfile.cover_image = null;
                await this.creatorProfileRepository.save(creatorProfile);

                // Step 2: Delete old upload safely
                await this.uploadService.deleteUpload(oldUpload);
            }

            // Step 3: Upload new file
            creatorProfile.cover_image = await this.uploadService.uploadNew(coverImageFile);
        }

        try {
            const result = await this.creatorProfileRepository.save(creatorProfile);
            return result;
        } catch (error) {
            throw new InternalServerErrorException('Error while trying to update creator profile.');
        }
    }

}
