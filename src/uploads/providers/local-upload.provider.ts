import { Injectable } from "@nestjs/common";
import { UploadProviderInterface } from "../interfaces/upload.interface";
import { Express } from 'express';
import * as path from 'path';
import { v4 as uuid } from 'uuid';
import * as fs from 'fs';

@Injectable()
export class LocalUploadProvider implements UploadProviderInterface {
    private readonly uploadRoot = path.resolve(process.cwd(), 'media/uploads');

    async upload(file: Express.Multer.File): Promise<string> {
        if (!fs.existsSync(this.uploadRoot)) {
            fs.mkdirSync(this.uploadRoot, { recursive: true });
        }

        const filename = `${uuid()}-${file.originalname}`;
        const absolutePath = path.join(this.uploadRoot, filename);
        fs.writeFileSync(absolutePath, file.buffer);

        // Only return relative DB path:
        return `uploads/${filename}`;
    }

    async delete(filePath: string): Promise<void> {
        // filePath is: uploads/uuid.png
        const absolutePath = path.resolve(process.cwd(), 'media', filePath);
        if (fs.existsSync(absolutePath)) {
            fs.unlinkSync(absolutePath);
        }
    }

    async exists(filePath: string): Promise<boolean> {
        const absolutePath = path.resolve(process.cwd(), 'media', filePath);
        return fs.existsSync(absolutePath);
    }
}