import { Injectable } from "@nestjs/common";
import { UploadProviderInterface } from "../interfaces/upload.interface";
import { Express } from 'express';
import * as path from 'path';
import { v4 as uuid } from 'uuid';
import * as fs from 'fs';

@Injectable()
export class LocalUploadProvider implements UploadProviderInterface {

    async fileUpload(file: Express.Multer.File): Promise<string> {
        const uploadDir = path.resolve(__dirname, '..', '..', 'uploads');
        const filename = `${uuid()}-${file.originalname}`;
        const filepath = path.join(uploadDir, filename);

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        fs.writeFileSync(filepath, file.buffer);
        return `/uploads/${filename}`;
    }
}