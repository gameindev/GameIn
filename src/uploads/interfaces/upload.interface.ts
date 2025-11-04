
// upload.interface.ts
import { Express } from 'express';

export interface UploadProviderInterface {
    // fileUpload(file: Express.Multer.File): Promise<string>;
    upload(file: Express.Multer.File): Promise<string>; // returns relative DB path
    delete(filePath: string): Promise<void>;
    exists(filePath: string): Promise<boolean>; // checks if file exists
}
