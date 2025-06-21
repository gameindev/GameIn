import { Inject, Injectable } from '@nestjs/common';
import { Express } from 'express';
import { UploadProviderInterface } from '../interfaces/upload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Upload } from '../upload.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UploadsService {

    constructor(
        @InjectRepository(Upload)
        private readonly uploadRepo: Repository<Upload>,

        @Inject('UploadProviderInterface')
        private readonly provider: UploadProviderInterface
    ) { }

    async uploadNew(file: Express.Multer.File): Promise<Upload> {
        const relativePath = await this.provider.upload(file);

        const upload = this.uploadRepo.create({
            name: file.originalname,
            path: relativePath,
            mime: file.mimetype,
            size: file.size,
            type: file.mimetype.startsWith('video') ? 'video' : 'image',
        });

        return await this.uploadRepo.save(upload);
    }


    async deleteUpload(existingUpload: Upload): Promise<void> {
        if (!existingUpload) return;

        await this.provider.delete(existingUpload.path);
        await this.uploadRepo.delete(existingUpload.id);
    }
}
