import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiHeaders, ApiOperation } from '@nestjs/swagger';
import { Express } from 'express';
import { UploadsService } from './providers/uploads.service';


@Controller('uploads')
export class UploadsController {


    constructor(
        /**
         * Injecting Upload Service
         */
        private readonly uploadsService: UploadsService,
    ) { }

    // /**
    //  * Upload a file
    //  * @param file
    //  * @returns
    //  */
    // @ApiHeaders([
    //     { name: 'Content-Type', description: 'multipart/form-data' },
    //     { name: 'Authorization', description: 'Bearer Token' }
    // ])
    // @ApiOperation({
    //     summary: 'Upload a file to the server',
    // })
    // @ApiBearerAuth()
    // @Post('file')
    // @UseInterceptors(FileInterceptor('file'))
    // public uploadFile(@UploadedFile() file: Express.Multer.File) {
    //     return this.uploadsService.manageUpload(file);
    // }
}
