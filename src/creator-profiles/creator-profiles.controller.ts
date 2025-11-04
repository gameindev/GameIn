import { Body, Controller, Param, Patch, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreatorProfilesService } from './providers/creator-profiles.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PatchCreatorProfileDto } from './dtos/patch-creatorProfile.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UserTypeGuard } from '../auth/guards/user-type.guard';
import { UserType } from '../users/enums/user-type.enums';
import { UserTypes } from '../auth/decorators/user-types.decorator';


/**
 * Creator Profile Controller
 */
@Controller('creator-profiles')
export class CreatorProfilesController {

    constructor(
        /**
         * Injecting Creator Profile service.
         */
        private readonly creatorProfilesService: CreatorProfilesService,
    ) { }


    /**
    * Updates a creator profile data on the application by User ID.
    * @param patchCreatorProfileDto
    * @returns
    */
    @Patch()
    @ApiOperation({
        summary: 'Updates a creator profile data on the application by User ID.'
    })
    @ApiResponse({
        status: 200,
        description: 'User profile updated successfully based on the query',
    })
    @ApiBody({
        schema: {   
            type: 'object',
            properties: {
                user_id: { type: 'number', example: 1 }, // <-- Add userId property to PatchCreatorProfileDto class
                first_name: { type: 'string', example: 'John' },
                last_name: { type: 'string', example: 'Doe' },
                gender: { type: 'string', example: 'male' },
                country: { type: 'string', example: 'India' },
                contact: { type: 'string', example: '+91-9876543210' },
                website: { type: 'string', format: 'url', example: 'https://johnportfolio.com' },
                followers: { type: 'number', example: 1000 },
                views: { type: 'number', example: 50000 },
                rank: { type: 'integer', example: 3 },
            }
        }
    })
    @ApiBearerAuth()
    @UseGuards(UserTypeGuard)
    @UserTypes(UserType.ADMIN, UserType.CREATOR, UserType.BRAND, UserType.COMMUNITY)   
    updateCreatorProfile(
        @Body() patchCreatorProfileDto: PatchCreatorProfileDto
    ) {
        return this.creatorProfilesService.updateCreatorProfile(patchCreatorProfileDto);
    }


    /**
     * Updates a creator profile picture on the application by profile ID.
     * @returns
     */
    @Patch(':id/profile-pic')
    @ApiOperation({
        summary: 'Updates a creator profile picture on the application by Profile ID.'
    })
    @ApiResponse({
        status: 200,
        description: 'User profile picture updated successfully based on the query',
    })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                profile_image: { type: 'string', format: 'binary' }
            }
        }
    })
    @ApiBearerAuth()
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'profile_image', maxCount: 1 }
    ]))
    updateProfilePic(
        @Param('id') profileId: number,
        @UploadedFiles() profileImageFile: Express.Multer.File[],
    ) {
        const file = profileImageFile['profile_image'][0];
        const result = this.creatorProfilesService.updateCreatorProfilePic(profileId, file);
        
        return result;
    }

 
    /**
     * Updates a creator cover picture on the application by profile ID.
     * @returns
     */
    @Patch(':id/cover-pic')
    @ApiOperation({
        summary: 'Updates a creator cover picture on the application by Profile ID.'
    })
    @ApiResponse({
        status: 200,
        description: 'User cover picture updated successfully based on the query',
    })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                cover_image: { type:'string', format: 'binary' }
            }
        }
    })
    @ApiBearerAuth()
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'cover_image', maxCount: 1 }
    ]))
    updateCoverPic(
        @Param('id') profileId: number,
        @UploadedFiles() coverImageFile: Express.Multer.File[],
    ) {
        const file = coverImageFile['cover_image'][0];
        return this.creatorProfilesService.updateCreatorCoverPic(profileId, file);
    }
   


}
