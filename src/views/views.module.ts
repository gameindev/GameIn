import { Module } from '@nestjs/common';
import { ViewsController } from './views.controller';
import { ViewsService } from './providers/views.service';
import { ProfileView } from './views.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreatorProfile } from 'src/creator-profiles/creator-profile.entity';
import { BrandProfile } from 'src/brand-profiles/brand-profile.entity';

@Module({
    controllers: [ViewsController],
    providers: [ViewsService],
    imports: [
        TypeOrmModule.forFeature([ProfileView, CreatorProfile, BrandProfile]),
    ]
})
export class ViewsModule { }
