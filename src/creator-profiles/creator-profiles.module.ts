import { Module } from '@nestjs/common';
import { CreatorProfilesController } from './creator-profiles.controller';
import { CreatorProfilesService } from './providers/creator-profiles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreatorProfile } from './creator-profile.entity';
import { UploadsModule } from 'src/uploads/uploads.module';
import { UpdateCreatorProfileProvider } from './providers/update-creator-profile.provider';

@Module({
    controllers: [CreatorProfilesController],
    providers: [CreatorProfilesService, UpdateCreatorProfileProvider],
    imports: [
        TypeOrmModule.forFeature([CreatorProfile]),
        UploadsModule
    ],
    exports: [CreatorProfilesService,],
})
export class CreatorProfilesModule { }
