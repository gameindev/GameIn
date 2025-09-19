import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsDefined, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min } from "class-validator";
import { OfferingCategory } from "src/offerings/enums/offering-category.enum";



export class PatchOfferingOfferDto {


    @ApiProperty({
        description: 'The id of the offering',
        type: Number,
        example: 1,
    })
    @IsInt()
    @IsNotEmpty()
    offering_id: number;


    @ApiProperty({
        description: 'The type of the offering offer',
        type: String,
        example: OfferingCategory.LOGO_STREAM,
    })
    @IsDefined()
    @IsString()
    offer_type: OfferingCategory;

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


}



