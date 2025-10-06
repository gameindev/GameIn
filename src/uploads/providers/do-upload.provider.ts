import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Express } from 'express';
import {
    S3Client,
    PutObjectCommand,
    DeleteObjectCommand,
    CopyObjectCommand,
} from '@aws-sdk/client-s3';
import { v4 as uuid } from 'uuid';
import { UploadProviderInterface } from '../interfaces/upload.interface';

@Injectable()
export class DOUploadProvider implements UploadProviderInterface {
    private s3: S3Client;
    private bucket: string;
    private region: string;
    private endpoint: string;

    constructor(private configService: ConfigService) {
        this.region = this.configService.get<string>('DO_SPACES_REGION'); // e.g. "nyc3"
        this.bucket = this.configService.get<string>('DO_SPACES_BUCKET'); // e.g. "my-space"

        this.s3 = new S3Client({
            endpoint: `https://${this.configService.get('DO_SPACES_REGION')}.digitaloceanspaces.com`, // e.g. sfo2
            region: this.configService.get('DO_SPACES_REGION'),
            forcePathStyle: false, // ✅ use virtual-hosted style (no double bucket)
            credentials: {
                accessKeyId: this.configService.get('DO_SPACES_KEY'),
                secretAccessKey: this.configService.get('DO_SPACES_SECRET'),
            },
        });
    }

    /**
     * Upload a file to DigitalOcean Space
     * Returns the key (path) or full URL depending on your choice.
     */
    async upload(file: Express.Multer.File): Promise<string> {
        const key = `uploads/${uuid()}-${file.originalname}`;

        await this.s3.send(
            new PutObjectCommand({
                Bucket: this.bucket,
                Key: key,
                Body: file.buffer,
                ContentType: file.mimetype,
                ACL: 'public-read', // optional – allows public access
            }),
        );

        // Return logical path (for DB) or full URL if you prefer
        return key;
        // Or: return this.getPublicUrl(key);
    }

    /**
     * Delete an object from Space
     */
    async delete(filePath: string): Promise<void> {
        await this.s3.send(
            new DeleteObjectCommand({
                Bucket: this.bucket,
                Key: filePath,
            }),
        );
    }

    /**
     * Copy an object (like `aws s3 cp`)
     */
    async copy(sourceKey: string, destinationKey: string): Promise<void> {
        await this.s3.send(
            new CopyObjectCommand({
                Bucket: this.bucket,
                CopySource: `${this.bucket}/${sourceKey}`,
                Key: destinationKey,
                ACL: 'public-read', // optional
            }),
        );
    }

    /**
     * Move an object (copy + delete)
     */
    async move(sourceKey: string, destinationKey: string): Promise<void> {
        await this.copy(sourceKey, destinationKey);
        await this.delete(sourceKey);
    }

    /**
     * Helper to generate a public URL
     */
    getPublicUrl(key: string): string {
        return `https://${this.bucket}.${this.region}.digitaloceanspaces.com/${key}`;
    }
}
