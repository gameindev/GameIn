import { Module } from '@nestjs/common';
import { MetadataService } from './providers/metadata.service';

@Module({
    providers: [MetadataService],
    exports: [MetadataService]
})
export class MetadataModule {}
