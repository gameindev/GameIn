

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsDate, IsDefined, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min, ValidateNested } from "class-validator";
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
    @IsOptional()
    @IsEnum(OfferingStatus)
    status?: OfferingStatus;

    @ApiPropertyOptional({
        description: 'Start Date of the Offering/Sponsorship',
        type: Date,
        format: 'date-time',
        example: '2025-09-01T10:00:00.000Z',
    })
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    start_date?: Date;

    @ApiPropertyOptional({
        description: 'End Date of the Offering/Sponsorship',
        type: Date,
        format: 'date-time',
        example: '2025-09-10T10:00:00.000Z',
    })
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    end_date?: Date;


    
}
