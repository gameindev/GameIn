
// upload.interface.ts
import { Express } from 'express';

export interface UploadProviderInterface {
  fileUpload(file: Express.Multer.File): Promise<string>;
}
