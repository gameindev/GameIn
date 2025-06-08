import { Module } from '@nestjs/common';
import { BrandProfilesController } from './brand-profiles.controller';
import { BrandProfilesService } from './providers/brand-profiles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandProfile } from './brand-profile.entity';
import { UpdateBrandProfileProvider } from './providers/update-brand-profile.provider';

@Module({
    controllers: [BrandProfilesController],
    providers: [BrandProfilesService, UpdateBrandProfileProvider],
    imports: [TypeOrmModule.forFeature([BrandProfile])],
    exports: [BrandProfilesService],
})
export class BrandProfilesModule { }
