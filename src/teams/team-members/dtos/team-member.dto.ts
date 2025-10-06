import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { TeamMemberRole } from '../../enums/team-member-role.enum';
import { TeamMemberStatus } from '../../enums/team-member-status.enum';

export class TeamMemberDto {
    @ApiProperty({
        description: 'User ID to be added to the team',
        example: 42,
    })
    @IsInt()
    @IsNotEmpty()
    user_id: number;

    @ApiPropertyOptional({
        enum: TeamMemberRole,
        description: 'Role of the team member',
        example: TeamMemberRole.COACH,
    })
    @IsEnum(TeamMemberRole)
    role: TeamMemberRole = TeamMemberRole.MEMBER;

    @ApiPropertyOptional({
        enum: TeamMemberStatus,
        description: 'Status of the membership',
        example: TeamMemberStatus.ACTIVE,
    })
    @IsOptional()
    @IsEnum(TeamMemberStatus)
    status?: TeamMemberStatus = TeamMemberStatus.ACTIVE;
}
