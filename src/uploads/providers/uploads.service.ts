import { Inject, Injectable } from '@nestjs/common';
import { Express } from 'express';
import { UploadProviderInterface } from '../interfaces/upload.interface';

@Injectable()
export class UploadsService {

    constructor(
        @Inject('UploadProviderInterface')
        private readonly uploadProvider: UploadProviderInterface
    ) { }


    public async uploadFile(file: Express.Multer.File) {
        return await this.uploadProvider.fileUpload(file);
    }
}
