import { Body, Controller, Get, Patch, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UsersBioService } from './providers/users-bio.service';

import { PatchBioDto } from './dtos/patch-bio.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MetadataService } from '../metadata/providers/metadata.service';
import { FileInterceptor } from '@nestjs/platform-express';

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
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('intro_video'))
    @Patch()
    async updateUserBio(
        @Body() patchUserBioDto: PatchBioDto,
        @UploadedFile() introVideo?: Express.Multer.File,
    ) {
        if (patchUserBioDto.preferred_games) {
            patchUserBioDto.preferred_games = await this.metadataService.enrichPreferredGames(patchUserBioDto.preferred_games); 
        }

        return await this.userBioService.updateUserBio(patchUserBioDto, introVideo);
    }


}
