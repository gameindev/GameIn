import { InjectRepository } from "@nestjs/typeorm";
import { CreatorProfile } from "../creator-profile.entity";
import { Repository } from "typeorm";
import { BadRequestException, InternalServerErrorException } from "@nestjs/common";
import { UploadsService } from "../../uploads/providers/uploads.service";

export class UpdateCreatorProfilePicProvider {
    constructor(
        @InjectRepository(CreatorProfile)
        private readonly creatorProfileRepository: Repository<CreatorProfile>,
        private readonly uploadService: UploadsService, // <-- Inject uploadService here
    ) { }


    public async updateCreatorProfilePic(profileId: number, profileImageFile: Express.Multer.File) {
        let creatorProfile: CreatorProfile;

        try {
            creatorProfile = await this.creatorProfileRepository.findOne({
                where: { id: profileId },
                relations: ['profile_image'],
            });

        } catch (error) {
            throw new InternalServerErrorException('Error while trying to find creator profile.');
        }

        if (!creatorProfile) {
            throw new BadRequestException('Creator profile not found.');
        }

        if (profileImageFile) {
            if (creatorProfile.profile_image) {
                // Step 1: Unlink FK
                const oldUpload = creatorProfile.profile_image;
                creatorProfile.profile_image = null;
                await this.creatorProfileRepository.save(creatorProfile);

                // Step 2: Delete old upload safely
                await this.uploadService.deleteUpload(oldUpload);
            }

            // Step 3: Upload new file
            creatorProfile.profile_image = await this.uploadService.uploadNew(profileImageFile);
        }

        try {
            const result = await this.creatorProfileRepository.save(creatorProfile);
            return result;
        } catch (error) {
            throw new InternalServerErrorException('Error while trying to update creator profile.');
        }
    }
}