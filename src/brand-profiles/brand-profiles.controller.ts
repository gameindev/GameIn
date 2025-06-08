import { Body, Controller, Patch, UseGuards } from '@nestjs/common';
import { BrandProfilesService } from './providers/brand-profiles.service';
import { PatchBrandProfileDto } from './dtos/patch-brandProfile.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserTypeGuard } from 'src/auth/guards/user-type.guard';
import { UserTypes } from 'src/auth/decorators/user-types.decorator';
import { UserType } from 'src/users/enums/user-type.enums';

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
    @ApiBearerAuth()
    @UseGuards(UserTypeGuard)
    @UserTypes(UserType.ADMIN, UserType.CREATOR, UserType.BRAND, UserType.COMMUNITY)
    updateBrandProfile(@Body() patchBrandProfileDto: PatchBrandProfileDto) 
    {
        return this.brandProfilesService.updateBrandProfile(patchBrandProfileDto); // return the updated brand profil
    }
}
