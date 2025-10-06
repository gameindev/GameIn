import { Module, Provider } from '@nestjs/common';
import { UploadsController } from './uploads.controller';
import { UploadsService } from './providers/uploads.service';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { S3UploadProvider } from './providers/s3-upload.provider';
import { LocalUploadProvider } from './providers/local-upload.provider';
import { UploadEntity } from './upload.entity';
import { DOUploadProvider } from './providers/do-upload.provider';

const UploadProviderFactory: Provider = {
    provide: 'UploadProviderInterface',
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
        const uploadStrategy = configService.get<string>('appConfig.uploadStrategy') || 'local';

        switch (uploadStrategy) {
            case 's3':
                return new S3UploadProvider(configService);
            case 'do':
                return new DOUploadProvider(configService);
            case 'local':
            default:
                return new LocalUploadProvider();
        }
    },
};

@Module({
    imports: [
        TypeOrmModule.forFeature([UploadEntity])
    ],
    controllers: [UploadsController],
    providers: [
        UploadsService,
        UploadProviderFactory,
    ],
    exports: [
        UploadsService,
        TypeOrmModule
    ],
})
export class UploadsModule { }
