import { Body, Controller, Get, Patch, Query } from '@nestjs/common';
import { UsersBioService } from './providers/users-bio.service';
import { MetadataService } from 'src/metadata/providers/metadata.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { PatchBioDto } from './dtos/patch-bio.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('users-bio')
export class UsersBioController {

    constructor(
        /**
         * Injecting UserBioService
         */
        private userBioService: UsersBioService,

        private readonly metadataService: MetadataService,
    ) { }


    @ApiOperation({ summary: 'Update user bio' })
    @ApiResponse({ status: 200, description: 'User bio updated successfully.' })
    @ApiBody({
        description: 'Patch user bio data',
        type: PatchBioDto,
    })
    @ApiBearerAuth()
    @Patch()
    async updateUserBio(
        @Body() patchUserBioDto: PatchBioDto,
    ) {
        if (patchUserBioDto.preferred_games) {
            patchUserBioDto.preferred_games = await this.metadataService.enrichPreferredGames(patchUserBioDto.preferred_games); 
        }

        return await this.userBioService.updateUserBio(patchUserBioDto);
    }


}
