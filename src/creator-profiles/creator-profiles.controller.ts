import { Body, Controller, Patch, UseGuards } from '@nestjs/common';
import { CreatorProfilesService } from './providers/creator-profiles.service';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PatchCreatorProfileDto } from './dtos/patch-creatorProfile.dto';
import { UserTypeGuard } from 'src/auth/guards/user-type.guard';
import { UserType } from 'src/users/enums/user-type.enums';
import { UserTypes } from 'src/auth/decorators/user-types.decorator';


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
    @ApiBearerAuth()
    @UseGuards(UserTypeGuard)
    @UserTypes(UserType.ADMIN, UserType.CREATOR, UserType.BRAND, UserType.COMMUNITY)
    updateCreatorProfile(
        @Body() patchCreatorProfileDto: PatchCreatorProfileDto
    ) {
        return this.creatorProfilesService.updateCreatorProfile(patchCreatorProfileDto);
    }


}
