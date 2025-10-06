import { IsBoolean, IsDate, IsEnum, IsInt, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, MaxLength, maxLength, Min } from "class-validator";
import { OfferingType } from "../enums/offering-type.enum";
import { EventType } from "../enums/event-type.enum";
import { Type } from "class-transformer";
import { OfferingStatus } from "../enums/offering-status.enum";
import { ApiProperty } from "@nestjs/swagger";
import { bool, boolean } from "joi";
import { SocialPlatform } from "../../social-integration/enums/social-platform.enums";


/**
 * Create Offering DTO
 */
export class CreateOfferingDto {    

    @ApiProperty({
        description: 'Type of Offering: ' + OfferingType.INDIVIDUAL + ' | ' + OfferingType.PRIZE_POOLED,
        enum: OfferingType,
        example: OfferingType.INDIVIDUAL
    })
    @IsEnum(OfferingType)
    @IsNotEmpty()
    type: OfferingType;

    @ApiProperty({
        description: 'Title of the Offering',
        example: 'Ultimate Promoting Package',
        type: String,
        maxLength: 160
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(160)
    title: string;

    @ApiProperty({
        description: 'Short description of of the offering',
        type: String,
        example: 'Lorem ipsum dolor sit amit.'
    })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({
        description: 'The main paltform for Prize Pooled Offering',
        type: String,
        example: SocialPlatform.TWITCH
    })
    @IsString()
    @IsOptional()
    @MaxLength(30)
    stream_platform?: string;

    @ApiProperty({
        description: 'Start Date of the Offering/Sponsorship',
        type: Date,
        format: 'date-time',
        example: '2025-09-01T10:00:00.000Z',
    })
    @IsDate()
    @Type(() => Date)
    start_date: Date;

    @ApiProperty({
        description: 'End Date of the Offering/Sponsorship',
        type: Date,
        format: 'date-time',
        example: '2025-09-10T10:00:00.000Z',
    })
    @IsDate()
    @Type(() => Date)
    end_date: Date;

    @ApiProperty({
        description: 'Event type for Prize Pooled Offering',
        type: String,
        example: 'Tournament'
    })
    @IsString()
    @IsOptional()
    @MaxLength(50)
    event_type?: string

    @ApiProperty({
        description: 'Name of the game for Prize Pooled Offering',
        type: String,
        example: 'Valorant'
    })
    @IsString()
    @IsOptional()
    @MaxLength(80)
    game?: string;

    @ApiProperty({
        description: 'Estimated views can achieve for a Prize Pooled Offering',
        type: Number,
        example: 1000000
    })
    @IsNumber()
    @IsOptional()
    estimated_views?: number;

    @ApiProperty({
        description: 'The ID of the team created for Prize Pooled Offering',
        type: Number,
        example: 2
    })
    @IsInt()    
    @IsOptional()
    team_id?: number;

    @ApiProperty({
        description: 'Organization Funds for Prize Pooled Offering',
        type: String,
        example: '200000'
    })
    @IsString()
    @IsOptional()
    org_funds?: string;

    @ApiProperty({
        description: 'Any notes to the for the current Offering',
        type: String,
        example: 'Lorem ipsum dolor sit amit'
    })
    @IsString() 
    @IsOptional()
    notes?: string

     @ApiProperty({
        description: 'Terms of the Offering',
        type: String,
        example: 'Lorem ipsum dolor sit amit'
    })
    @IsString()
    @IsOptional()
    terms_of_use?: string;

     @ApiProperty({
        description: 'Terms Signed By Brand',
        type: Boolean,
        example: false
    })
    @IsBoolean()
    @Type(() => Boolean) 
    is_terms_signed: boolean;

     @ApiProperty({
        description: 'Whether a Brand can edit certain parameter of Offering',
        type: Boolean,
        example: false
    })
    @IsBoolean()
    @Type(() => Boolean)
    can_edit: boolean; 
     

    @ApiProperty({
        description: 'Status of the offering',
        enum: OfferingStatus,
        example: OfferingStatus.OFFERED
    })
    @IsEnum(OfferingStatus)
    status: OfferingStatus;

    @ApiProperty({
        description: 'Any optional meta data in an key and value format',
        type: Object,
        required: false,
        example: {}
    })
    @IsOptional()
    @IsObject()
    meta_data?: Record<string, any>;
}