import { InjectRepository } from "@nestjs/typeorm";
import { CreatorProfile } from "../creator-profile.entity";
import { Repository } from "typeorm";
import { UploadsService } from "src/uploads/providers/uploads.service";
import { BadRequestException, InternalServerErrorException } from "@nestjs/common";
import { Upload } from "src/uploads/upload.entity";

export class UpdateCreatorProfilePicProvider {
    constructor(
        @InjectRepository(CreatorProfile)
        private readonly creatorProfileRepository: Repository<CreatorProfile>,
        private readonly uploadService: UploadsService, // <-- Inject uploadService here
    ) { }


    public async updateCreatorProfilePic(profileId: number, profileImageFile: Express.Multer.File): Promise<CreatorProfile> {
        let creatorProfile: CreatorProfile;

        // --- Step 1: Find the Creator Profile ---
        try {
            creatorProfile = await this.creatorProfileRepository.findOne({
                where: { id: profileId },
                relations: ['profileImage'], // Ensure the related profileImage is loaded
            });

            console.log(`[updateCreatorProfilePic] Fetched creatorProfile for ID ${profileId}:`, JSON.stringify(creatorProfile, null, 2));

        } catch (error) {
            console.error(`[updateCreatorProfilePic] Error finding creator profile ID ${profileId}:`, error);
            throw new InternalServerErrorException('Error while trying to find creator profile.');
        }

        if (!creatorProfile) {
            console.warn(`[updateCreatorProfilePic] Creator profile with ID ${profileId} not found.`);
            throw new BadRequestException('Creator profile not found.');
        }

        // --- Step 2: Handle new profile image file if provided ---
        if (profileImageFile) {
            console.log(`[updateCreatorProfilePic] New profile image file provided: ${profileImageFile.originalname}`);

            // If there's an existing profile image, unlink and delete it
            if (creatorProfile.profileImage) {
                console.log(`[updateCreatorProfilePic] Existing profile image found (ID: ${creatorProfile.profileImage.id}).`);
                const oldUpload = creatorProfile.profileImage;

                // Step 2a: Unlink FK by setting profileImage to null and saving
                // This ensures the foreign key constraint isn't violated when deleting the old upload record
                creatorProfile.profileImage = null;
                try {
                    await this.creatorProfileRepository.save(creatorProfile);
                    console.log(`[updateCreatorProfilePic] Successfully unlinked old profile image from creator profile.`);
                } catch (error) {
                    console.error(`[updateCreatorProfilePic] Error unlinking old profile image from creator profile:`, error);
                    throw new InternalServerErrorException('Error unlinking old profile image.');
                }

                // Step 2b: Delete the old upload record (physical file and DB entry)
                try {
                    await this.uploadService.deleteUpload(oldUpload);
                    console.log(`[updateCreatorProfilePic] Successfully deleted old upload record (ID: ${oldUpload.id}).`);
                } catch (error) {
                    console.error(`[updateCreatorProfilePic] Error deleting old upload record (ID: ${oldUpload.id}):`, error);
                    // Decide whether to throw here or continue. For now, we throw.
                    throw new InternalServerErrorException('Error deleting old profile image file.');
                }
            } else {
                console.log(`[updateCreatorProfilePic] No existing profile image found for creator profile.`);
            }

            // Step 2c: Upload the new file and assign the returned Upload entity
            let newUploadEntity: Upload;
            try {
                newUploadEntity = await this.uploadService.uploadNew(profileImageFile);
                console.log(`[updateCreatorProfilePic] uploadService.uploadNew returned:`, JSON.stringify(newUploadEntity, null, 2));

                // --- CRITICAL CHECK POINT ---
                if (!newUploadEntity || !newUploadEntity.id) {
                    console.error(`[updateCreatorProfilePic] ERROR: uploadService.uploadNew did not return a valid Upload entity with an ID.`);
                    throw new InternalServerErrorException('Failed to get valid upload ID for new profile image.');
                }
                console.log(`[updateCreatorProfilePic] New upload entity ID received: ${newUploadEntity.id}`);

                creatorProfile.profileImage = newUploadEntity; // Assign the newly created and persisted Upload entity

            } catch (uploadError) {
                console.error(`[updateCreatorProfilePic] Error uploading new file via uploadService.uploadNew:`, uploadError);
                throw new InternalServerErrorException({
                    message: 'Error processing new profile image upload.',
                    original: uploadError.message,
                });
            }
        } else {
            console.log(`[updateCreatorProfilePic] No new profile image file provided. Will save creator profile as is.`);
        }

        // --- Step 3: Save the Creator Profile with the (potentially new) profile image link ---
        try {
            console.log(`[updateCreatorProfilePic] Attempting to save creatorProfile. Final state of creatorProfile.profileImage:`, JSON.stringify(creatorProfile.profileImage, null, 2));
            console.log(`[updateCreatorProfilePic] Final profileImageId to save: ${creatorProfile.profileImage?.id || 'NULL'}`);
            
            const savedCreatorProfile = await this.creatorProfileRepository.save(creatorProfile);
            console.log(`[updateCreatorProfilePic] Successfully saved creatorProfile (ID: ${savedCreatorProfile.id}).`);
            return savedCreatorProfile;
        } catch (error) {
            console.error(`[updateCreatorProfilePic] ERROR during final save of creatorProfile:`, error);
            throw new InternalServerErrorException({
                message: 'Error while trying to update creator profile.',
                original: error.message,
            });
        }
    }
}