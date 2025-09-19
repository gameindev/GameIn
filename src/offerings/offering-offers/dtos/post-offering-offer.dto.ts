import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsInt, IsOptional, IsPositive, IsString, MaxLength } from "class-validator";
import { OfferingCategory } from "src/offerings/enums/offering-category.enum";
import { SizePreset } from "src/offerings/enums/size-preset.enum";
import { TimeMode } from "src/offerings/enums/time-mode.enum";
import { SocialPlatform } from "src/social-integration/enums/social-platform.enums";



export class CreateOfferingOfferDto {

    // @ApiProperty({
    //     description: 'Parent offering id',
    //     example: 1
    // })
    // @IsOptional()
    // @IsInt()
    // offering_id?: number;

    @ApiProperty({
        description: 'Type of Offer for current Offering',
        enum: OfferingCategory,
        example: OfferingCategory.LOGO_STREAM
    })
    @IsEnum(OfferingCategory)
    offer_type: OfferingCategory;

    @ApiPropertyOptional({
        description: 'Platform where you are running the Offer',
        enum: SocialPlatform,
        example: SocialPlatform.INSTAGRAM
    })
    @IsOptional()
    @IsEnum(SocialPlatform)
    platform?: SocialPlatform;


    @ApiPropertyOptional({
        description: 'Time mode of the Offer',
        type: String,
        example: 'LIVE'
    })
    @IsOptional()
    @IsString()
    @MaxLength(50)
    time_mode?: string;

    @ApiPropertyOptional({
        description: 'Schedule JSON (RRULE or slots)',
        type: String,
        example: 'M,W,F'
    })
    @IsOptional()
    @IsString()
    @MaxLength(30)
    schedule?: string;

    @ApiPropertyOptional({
        description: 'Number of repetitions (for video commercial)',
        type: String,
        example: '2'
    })
    @IsOptional()
    @IsString()
    @MaxLength(30)
    repetition?: string;

    @ApiPropertyOptional({
        description: 'Duration in seconds (for video commercial)',
        type: String,
        example: '20s'
    })
    @IsOptional()
    @IsString()
    @MaxLength(30)
    duration?: string;


    @ApiPropertyOptional({
        description: 'Any relevant size for the Offer',
        type: String,
        example: 'PORTRAIT'
    })
    @IsOptional()
    @IsString()
    @MaxLength(30)
    size?: string;

    @ApiPropertyOptional({
        description: 'Subtype, e.g. for merchandise (t-shirt, cap, etc)',
        type: String,
        example: 'Clothing'
    })
    @IsOptional()
    @IsString()
    @MaxLength(30)
    sub_type?: string;


    @ApiPropertyOptional({
        description: 'Version of the Offering Offer',
        type: Number,
        example: 1
    })
    @IsOptional()
    @IsInt()
    version?: number;

}