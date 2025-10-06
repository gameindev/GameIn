import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsEnum, IsInt, IsOptional, IsString, IsUrl, Length } from 'class-validator';
import { TeamLinkType } from '../enums/team-link-type.enum';
import { Transform, Type } from 'class-transformer';
import { SocialLinkDto } from '../team-links/dtos/social-link.dto';
import { SimpleLinkDto } from '../team-links/dtos/simple-link.dto';
import { TeamMemberDto } from '../team-members/dtos/team-member.dto';
import { PaymentProvider } from '../../offerings/enums/payment-provider.enum';

/**
 * Create Team DTO
 */
export class CreateTeamDto {
    @ApiProperty({ example: 'Team Hydra' })
    @IsString()
    @Length(2, 150)
    display_name: string;

    @ApiPropertyOptional({ example: 'https://teamhydra.gg' })
    @IsOptional()
    @IsUrl()
    website?: string;

    @ApiPropertyOptional({ example: 'We are a pro squad focused on FPS titles.' })
    @IsOptional()
    @IsString()
    bio?: string;

    @ApiPropertyOptional({ description: 'Upload ID for profile image' })
    @IsOptional()
    @IsInt()
    profile_image_id?: number;

    @ApiPropertyOptional({ description: 'Upload ID for cover image' })
    @IsOptional()
    @IsInt()
    cover_image_id?: number;

    @ApiPropertyOptional({ enum: PaymentProvider })
    @IsOptional()
    @IsEnum(PaymentProvider)
    payment_provider?: PaymentProvider;

    @ApiPropertyOptional({ example: 'acct_1PqXYZ...' })
    @IsOptional()
    @IsString()
    @Length(2, 128)
    payment_provider_account?: string;

    // Members
    @ApiPropertyOptional({ type: [TeamMemberDto], description: 'List of coaches to add' })
    @IsOptional()
    @IsArray()
    @Transform(({ value }) => transformToArray(value))
    @Type(() => TeamMemberDto)
    coaches?: TeamMemberDto[];

    @ApiPropertyOptional({ type: [TeamMemberDto], description: 'List of teammates to add' })
    @IsOptional()
    @IsArray()
    @Transform(({ value }) => transformToArray(value))
    @Type(() => TeamMemberDto)
    team_mates?: TeamMemberDto[];

    // Links
    @ApiPropertyOptional({ type: [SocialLinkDto] })
    @IsOptional()
    @IsArray()
    @Transform(({ value }) => transformToArray(value))
    @Type(() => SocialLinkDto)
    social_links?: SocialLinkDto[]; // must carry type = SOCIAL

    @ApiPropertyOptional({ type: [SimpleLinkDto] })
    @IsOptional()
    @IsArray()
    @Transform(({ value }) => transformToArray(value))
    @Type(() => SimpleLinkDto)
    achievement_links?: SimpleLinkDto[]; // type = ACHIEVEMENT

    @ApiPropertyOptional({ type: [SimpleLinkDto] })
    @IsOptional()
    @IsArray()
    @Transform(({ value }) => transformToArray(value))
    @Type(() => SimpleLinkDto)
    stats_links?: SimpleLinkDto[]; // type = STATS
}

// Helpers
function transformToArray(value: any) {
    if (value === undefined || value === null || value === '') return undefined;
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') {
        try {
            const parsed = JSON.parse(value);
            return Array.isArray(parsed) ? parsed : [parsed];
        } catch {
            return [value];
        }
    }
    return [value];
}
