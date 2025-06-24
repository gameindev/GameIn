import { Body, Controller, Param, Patch, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { BrandProfilesService } from './providers/brand-profiles.service';
import { PatchBrandProfileDto } from './dtos/patch-brandProfile.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserTypeGuard } from 'src/auth/guards/user-type.guard';
import { UserTypes } from 'src/auth/decorators/user-types.decorator';
import { UserType } from 'src/users/enums/user-type.enums';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

/**
 * Controller for Brand Profiles.
 */

@Controller('brand-profiles')
export class BrandProfilesController {
    constructor(
        /**
         * Injecting Brand Profile service.
         */
        private readonly brandProfilesService: BrandProfilesService,
    ) { }

    /**
     * Updates a creator profile data on the application by User ID.
     * @param patchBrandProfileDto
     * @returns
     */
    @Patch()
    @ApiOperation({
        summary: 'Updates a brand profile data on the application by User ID.'
    })
    @ApiResponse({
        status: 200,
        description: 'User profile updated successfully based on the query',
    })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                userId: { type: 'number', example: 1 },
                brandName: { type: 'string', example: 'Brand Name' },
                headOffice: { type: 'string', example: 'Head Office' },
                contact: { type: 'string', example: '0123456789' },
                website: { type: 'string', example: 'www.example.com' },
                followers: { type: 'number', example: 1000 },
                views: { type: 'number', example: 50000 },
                rank: { type: 'integer', example: 3 },
            }
        }
    })
    @ApiBearerAuth()
    @UseGuards(UserTypeGuard)
    @UserTypes(UserType.ADMIN, UserType.CREATOR, UserType.BRAND, UserType.COMMUNITY)
    updateBrandProfile(@Body() patchBrandProfileDto: PatchBrandProfileDto) {
        return this.brandProfilesService.updateBrandProfile(patchBrandProfileDto); // return the updated brand profil
    }



    /**
     * Updates a brand profile picture on the application by profile ID.
     * @returns
     */
    @Patch(':id/profile-pic')
    @ApiOperation({
        summary: 'Updates a brand profile picture on the application by Profile ID.'
    })
    @ApiResponse({
        status: 200,
        description: 'User profile picture updated successfully based on the query',
    })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                profileImageFile: { type:'string', format: 'binary' }
            }
        }
    })
    @ApiBearerAuth()
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'profileImageFile', maxCount: 1 }
    ]))
    updateProfilePic(
        @Param('id') profileId: number,
        @UploadedFiles() profileImageFile: Express.Multer.File[],
    ) {
        const file = profileImageFile['profileImageFile'][0];
        return this.brandProfilesService.updateBrandProfilePic(profileId, file);
    }

    /**
     * Updates a brand cover picture on the application by profile ID.
     * @returns
     */
    @Patch(':id/cover-pic')
    @ApiOperation({
        summary: 'Updates a brand cover picture on the application by Profile ID.'
    })
    @ApiResponse({
        status: 200,
        description: 'User cover picture updated successfully based on the query',
    })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                coverImageFile: { type:'string', format: 'binary' }
            }
        }
    })
    @ApiBearerAuth()
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'coverImageFile', maxCount: 1 }
    ]))
    updateCoverPic(
        @Param('id') profileId: number,
        @UploadedFiles() coverImageFile: Express.Multer.File[],
    ) {
        const file = coverImageFile['coverImageFile'][0]; 
        return this.brandProfilesService.updateBrandCoverPic(profileId, file);
    }
}
