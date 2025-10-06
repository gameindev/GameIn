import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsUrl, Length } from 'class-validator';
import { SocialPlatform } from '../../../social-integration/enums/social-platform.enums';
import { TeamLinkType } from '../../enums/team-link-type.enum';

export class SocialLinkDto {
    @ApiProperty({
        enum: TeamLinkType,
        example: TeamLinkType.SOCIAL,
        description: 'Link type must be SOCIAL for social links',
    })
    @IsEnum(TeamLinkType)
    type: TeamLinkType.SOCIAL;

    @ApiProperty({
        enum: SocialPlatform,
        example: SocialPlatform.TWITCH,
        description: 'Platform enum for social networks',
    })
    @IsString()
    platform: SocialPlatform | string;

    @ApiProperty({
        example: 'https://twitch.tv/team-hydra',
        description: 'The full URL of the social profile',
    })
    @IsUrl()
    url: string;

    @ApiPropertyOptional({
        example: 'Official Twitch Channel',
        description: 'Optional label to show in UI',
    })
    @IsOptional()
    @IsString()
    @Length(1, 120)
    label?: string;
}
