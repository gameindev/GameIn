import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BrandProfile } from '../brand-profile.entity';
import { Repository } from 'typeorm';
import { UploadsService } from '@/uploads/providers/uploads.service';

@Injectable()
export class UpdateBrandProfilePicProvider {

    constructor(
        @InjectRepository(BrandProfile)
        private readonly brandProfileRepository: Repository<BrandProfile>,
        private readonly uploadService: UploadsService, // <-- Inject uploadService here
    ) { }

    public async updateBrandProfilePic(profileId: number, profileImageFile: Express.Multer.File) {
        let brandProfile: BrandProfile;

        try {
            brandProfile = await this.brandProfileRepository.findOne({
                where: { id: profileId },
                relations: ['profile_image'],
            });
        } catch (error) {
            throw new InternalServerErrorException('Error while trying to find brand profile.');
        }

        if (!brandProfile) {
            throw new BadRequestException('Brand profile not found.');
        }

        if (profileImageFile) {
            if (brandProfile.profile_image) {
                // Step 1: Unlink FK
                const oldUpload = brandProfile.profile_image;
                brandProfile.profile_image = null;
                await this.brandProfileRepository.save(brandProfile);

                // Step 2: Delete old upload safely
                await this.uploadService.deleteUpload(oldUpload);
            }

            // Step 3: Upload new file
            brandProfile.profile_image = await this.uploadService.uploadNew(profileImageFile);
        }

        try {
            return await this.brandProfileRepository.save(brandProfile);
        } catch (error) {
            throw new InternalServerErrorException('Error while trying to update brand profile.');
        }
     }
}
