import { Body, Controller, Patch } from '@nestjs/common';
import { CreatorProfilesService } from './providers/creator-profiles.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PatchCreatorProfileDto } from './dtos/patch-creatorProfile.dto';


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

    @Patch()
    @ApiOperation({
        summary: 'Updates a creator profile data on the application by User ID.'
    })
    @ApiResponse({
        status: 200,
        description: 'User profile updated successfully based on the query',
    })
    /**
     * Updates a creator profile data on the application by User ID.
     * @param patchCreatorProfileDto
     * @returns
     */
    updateCreatorProfile(
        @Body() patchCreatorProfileDto: PatchCreatorProfileDto
    ) {
        return this.creatorProfilesService.updateCreatorProfile(patchCreatorProfileDto);
    }


}
