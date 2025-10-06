import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsUrl, Length } from 'class-validator';
import { TeamLinkType } from '@/teams/enums/team-link-type.enum';

export class SimpleLinkDto {
    @ApiProperty({
        enum: TeamLinkType,
        examples: [TeamLinkType.ACHIEVEMENT, TeamLinkType.STATS],
        description: 'Type of link: ACHIEVEMENT or STATS',
    })
    @IsEnum(TeamLinkType)
    type: TeamLinkType.ACHIEVEMENT | TeamLinkType.STATS;

    @ApiProperty({
        example: 'https://liquipedia.net/some-event',
        description: 'The full URL to the resource',
    })
    @IsUrl()
    url: string;

    @ApiPropertyOptional({
        example: 'Liquipedia — Summer Cup 2024',
        description: 'Optional label to show in UI',
    })
    @IsOptional()
    @IsString()
    @Length(1, 120)
    label?: string;
}
