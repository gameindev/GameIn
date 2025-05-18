import { Module } from '@nestjs/common';
import { CreatorProfilesController } from './creator-profiles.controller';
import { CreatorProfilesService } from './providers/creator-profiles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreatorProfile } from './creator-profile.entity';

@Module({
    controllers: [CreatorProfilesController],
    providers: [CreatorProfilesService],
    imports: [TypeOrmModule.forFeature([CreatorProfile])],
    exports: [CreatorProfilesService, ],
})
export class CreatorProfilesModule { }
