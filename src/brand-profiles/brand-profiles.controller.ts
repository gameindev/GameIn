import { Body, Controller, Patch } from '@nestjs/common';
import { BrandProfilesService } from './providers/brand-profiles.service';
import { PatchBrandProfileDto } from './dtos/patch-brandProfile.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

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
    

    @Patch()
    @ApiOperation({
        summary: 'Updates a brand profile data on the application by User ID.'
    })
    @ApiResponse({
        status: 200,
        description: 'User profile updated successfully based on the query',
    })
    /**
     * Updates a creator profile data on the application by User ID.
     * @param patchBrandProfileDto
     * @returns
     */
    updateBrandProfile(@Body() patchBrandProfileDto: PatchBrandProfileDto) 
    {
        return this.brandProfilesService.updateBrandProfile(patchBrandProfileDto); // return the updated brand profil
    }
}
