

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsDefined, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min, ValidateNested } from "class-validator";
import { PatchOfferingOfferDto } from "../offering-offers/dtos/patch-offering-offer.dto";
import { OfferingStatus } from "../enums/offering-status.enum";


export class PatchOfferingDto {
    @ApiProperty({
        description: 'The id of the offering',
        type: Number,
        example: 1,
    })
    @ApiProperty()
    @IsDefined()
    @IsInt()
    @Min(1)
    @Type(() => Number)
    id: number



    @ApiPropertyOptional({
        description: 'Any notes to the for the current Offering',
        type: String,
        example: 'Lorem ipsum dolor sit amit'
    })
    @IsOptional()
    @IsString()
    notes?: string;



    @ApiPropertyOptional({
        description: 'Status of the offering',
        enum: OfferingStatus,
        example: OfferingStatus.OFFERED
    })
    @IsEnum(OfferingStatus)
    status?: OfferingStatus; 


    @ApiPropertyOptional({
        description: 'The offers for the current Offering',
        type: [PatchOfferingOfferDto],
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => PatchOfferingOfferDto)
    offers: PatchOfferingOfferDto[];
}
