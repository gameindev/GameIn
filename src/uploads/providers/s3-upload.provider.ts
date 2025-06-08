// s3-upload.provider.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Express } from 'express';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuid } from 'uuid';
import { UploadProviderInterface } from '../interfaces/upload.interface';

@Injectable()
export class S3UploadProvider implements UploadProviderInterface {
  private s3: S3Client;
  private bucket: string;

  constructor(private configService: ConfigService) {
    this.s3 = new S3Client({
      region: this.configService.get<string>('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY'),
      },
    });

    this.bucket = this.configService.get<string>('AWS_BUCKET_NAME');
  }

  async fileUpload(file: Express.Multer.File): Promise<string> {
    const key = `uploads/${uuid()}-${file.originalname}`;

    await this.s3.send(new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    }));

    return `https://${this.bucket}.s3.amazonaws.com/${key}`;
  }
}
