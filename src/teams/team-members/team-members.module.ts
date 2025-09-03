import { Module } from '@nestjs/common';
import { TeamMembersController } from './team-members.controller';
import { TeamMembersService } from './providers/team-members.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamMembers } from './team-members.entity';

@Module({
    controllers: [TeamMembersController],
    providers: [TeamMembersService],
    exports: [TeamMembersService],
    imports: [
        TypeOrmModule.forFeature([TeamMembers]),
    ]
})
export class TeamMembersModule { }
