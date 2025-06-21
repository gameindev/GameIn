import { Module } from '@nestjs/common';
import { BrandProfilesController } from './brand-profiles.controller';
import { BrandProfilesService } from './providers/brand-profiles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandProfile } from './brand-profile.entity';
import { UpdateBrandProfileProvider } from './providers/update-brand-profile.provider';
import { UpdateBrandCoverPicProvider } from './providers/update-brand-cover-pic.provider';
import { UpdateBrandProfilePicProvider } from './providers/update-brand-profile-pic.provider';
import { UploadsModule } from 'src/uploads/uploads.module';

@Module({
    controllers: [BrandProfilesController],
    providers: [BrandProfilesService, UpdateBrandProfileProvider, UpdateBrandCoverPicProvider, UpdateBrandProfilePicProvider],
    imports: [TypeOrmModule.forFeature([BrandProfile]), UploadsModule],
    exports: [BrandProfilesService],
})
export class BrandProfilesModule { }
