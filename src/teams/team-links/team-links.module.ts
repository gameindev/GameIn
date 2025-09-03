import { Module } from '@nestjs/common';
import { TeamLinksController } from './team-links.controller';
import { TeamLinksService } from './providers/team-links.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamLinks } from './team-links.entity';

@Module({
    controllers: [TeamLinksController],
    providers: [TeamLinksService],
    exports: [TeamLinksService],
    imports: [TypeOrmModule.forFeature([TeamLinks])]
})
export class TeamLinksModule { }
