import { Module } from '@nestjs/common';
import { TeamsController } from './teams.controller';
import { TeamsService } from './providers/teams.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './teams.entity';
import { TeamMembersModule } from './team-members/team-members.module';
import { TeamLinksModule } from './team-links/team-links.module';
import { TeamMembers } from './team-members/team-members.entity';
import { TeamLinks } from './team-links/team-links.entity';
import { UploadsModule } from 'src/uploads/uploads.module';

@Module({
    controllers: [TeamsController],
    providers: [TeamsService],
    imports: [TypeOrmModule.forFeature([Team, TeamMembers, TeamLinks]), TeamMembersModule, TeamLinksModule, UploadsModule],
    exports: [TeamsService]
})
export class TeamsModule { }
