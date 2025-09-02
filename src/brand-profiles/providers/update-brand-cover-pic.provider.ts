import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BrandProfile } from '../brand-profile.entity';
import { Repository } from 'typeorm';
import { UploadsService } from 'src/uploads/providers/uploads.service';

@Injectable()
export class UpdateBrandCoverPicProvider {

    constructor(
        @InjectRepository(BrandProfile)
        private readonly brandProfileRepository: Repository<BrandProfile>,
        private readonly uploadService: UploadsService,
    ) { }

    public async updateBrandCoverPic(profileId: number, coverImageFile: Express.Multer.File) {
        let brandProfile: BrandProfile;

        try {
            brandProfile = await this.brandProfileRepository.findOne({
                where: { id: profileId },
                relations: ['cover_image'],
            });

        } catch (error) {
            throw new InternalServerErrorException('Error while trying to find brand profile.');
        }

        if (!brandProfile) {
            throw new BadRequestException('Brand profile not found.');
        }

        if (coverImageFile) {
            if (brandProfile.cover_image) {
                // Step 1: Unlink FK
                const oldUpload = brandProfile.cover_image;
                brandProfile.cover_image = null;
                await this.brandProfileRepository.save(brandProfile);

                // Step 2: Delete old upload safely
                await this.uploadService.deleteUpload(oldUpload);
            }

            // Step 3: Upload new file
            brandProfile.cover_image = await this.uploadService.uploadNew(coverImageFile);
        }

        try {
            return await this.brandProfileRepository.save(brandProfile);
        } catch (error) {
            throw new InternalServerErrorException('Error while trying to update brand profile.');
        }
    }
}
