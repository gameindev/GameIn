import { Body, Controller, Patch } from '@nestjs/common';
import { BrandProfilesService } from './providers/brand-profiles.service';
import { PatchBrandProfileDto } from './dtos/patch-brandProfile.dto';

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
    updateBrandProfile(@Body() patchBrandProfileDto: PatchBrandProfileDto) 
    {
        return this.brandProfilesService.updateBrandProfile(patchBrandProfileDto); // return the updated brand profil
    }
}
