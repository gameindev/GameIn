import { Module } from '@nestjs/common';
import { BrandProfilesController } from './brand-profiles.controller';
import { BrandProfilesService } from './providers/brand-profiles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandProfile } from './brand-profile.entity';

@Module({
    controllers: [BrandProfilesController],
    providers: [BrandProfilesService],
    imports: [TypeOrmModule.forFeature([BrandProfile])],
    exports: [BrandProfilesService],
})
export class BrandProfilesModule { }
