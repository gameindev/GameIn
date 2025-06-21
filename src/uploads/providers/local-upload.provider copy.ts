// import { Injectable } from "@nestjs/common";
// import { UploadProviderInterface } from "../interfaces/upload.interface";
// import { Express } from 'express';
// import * as path from 'path';
// import { v4 as uuid } from 'uuid';
// import * as fs from 'fs';

// @Injectable()
// export class LocalUploadProvider implements UploadProviderInterface {

//     async upload(file: Express.Multer.File): Promise<string> {
//         const uploadDir = path.resolve(__dirname, '..', '..', 'media', 'uploads');
//         const filename = `${uuid()}-${file.originalname}`;
//         const filepath = path.join(uploadDir, filename);

//         if (!fs.existsSync(uploadDir)) {
//             fs.mkdirSync(uploadDir, { recursive: true });
//         }

//         fs.writeFileSync(filepath, file.buffer);
//         return `/media/uploads/${filename}`;
//     }

//     async delete(filepath: string): Promise<void> {
//         // const absolutePath = path.resolve(process.cwd(), filePath);
//         // if (fs.existsSync(absolutePath)) {
//         //     fs.unlinkSync(absolutePath);
//         // }
//     }
// }