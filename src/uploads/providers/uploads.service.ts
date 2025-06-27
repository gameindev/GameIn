import { Inject, Injectable } from '@nestjs/common';
import { Express } from 'express';
import { UploadProviderInterface } from '../interfaces/upload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UploadEntity } from '../upload.entity';

@Injectable()
export class UploadsService {

    constructor(
        @InjectRepository(UploadEntity)
        private readonly uploadRepo: Repository<UploadEntity>,

        @Inject('UploadProviderInterface')
        private readonly provider: UploadProviderInterface
    ) { }

    async uploadNew(file: Express.Multer.File): Promise<UploadEntity> {
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


    async deleteUpload(existingUpload: UploadEntity): Promise<void> {
        if (!existingUpload) return;

        await this.provider.delete(existingUpload.path);
        await this.uploadRepo.delete(existingUpload.id);
    }
}
