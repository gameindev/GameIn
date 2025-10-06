import { Module } from '@nestjs/common';
import { CreatorProfilesController } from './creator-profiles.controller';
import { CreatorProfilesService } from './providers/creator-profiles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreatorProfile } from './creator-profile.entity';
import { UploadsModule } from '@/uploads/uploads.module';
import { UpdateCreatorProfileProvider } from './providers/update-creator-profile.provider';
import { UpdateCreatorProfilePicProvider } from './providers/update-creator-profile-pic.provider';
import { UpdateCreatorCoverPicProvider } from './providers/update-creator-cover-pic.provider';

@Module({
    controllers: [CreatorProfilesController],
    providers: [
        CreatorProfilesService,
        UpdateCreatorProfileProvider,
        UpdateCreatorProfilePicProvider,
        UpdateCreatorCoverPicProvider
    ],
    imports: [
        TypeOrmModule.forFeature([CreatorProfile]),
        UploadsModule
    ],
    exports: [CreatorProfilesService,],
})
export class CreatorProfilesModule { }
