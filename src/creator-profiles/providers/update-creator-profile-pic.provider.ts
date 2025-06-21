import { InjectRepository } from "@nestjs/typeorm";
import { CreatorProfile } from "../creator-profile.entity";
import { Repository } from "typeorm";
import { UploadsService } from "src/uploads/providers/uploads.service";
import { BadRequestException, InternalServerErrorException } from "@nestjs/common";

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
                relations: ['profileImage'],
            });

        } catch (error) {
            throw new InternalServerErrorException('Error while trying to find creator profile.');
        }

        if (!creatorProfile) {
            throw new BadRequestException('Creator profile not found.');
        }

        if (profileImageFile) {
            if (creatorProfile.profileImage) {
                // Step 1: Unlink FK
                const oldUpload = creatorProfile.profileImage;
                creatorProfile.profileImage = null;
                await this.creatorProfileRepository.save(creatorProfile);

                // Step 2: Delete old upload safely
                await this.uploadService.deleteUpload(oldUpload);
            }

            // Step 3: Upload new file
            creatorProfile.profileImage = await this.uploadService.uploadNew(profileImageFile);
        }

        try {
            return await this.creatorProfileRepository.save(creatorProfile);
        } catch (error) {
            throw new InternalServerErrorException('Error while trying to update creator profile.');
        }
    }
}