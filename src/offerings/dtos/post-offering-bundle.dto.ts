import { ApiProperty } from "@nestjs/swagger";
import { CreateOfferingDto } from "./post-offering.dto";
import { IsArray, IsOptional, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CreateOfferingOfferDto } from "../offering-offers/dtos/post-offering-offer.dto";
import { CreateOfferingPriceDto } from "../offering-price/dtos/post-offer-price.dto";

/**
 * Bundle Offering DTO
 */
export class CreateOfferingBundleDto {
    @ApiProperty({ type: CreateOfferingDto })
    @ValidateNested()
    @Type(() => CreateOfferingDto)
    offering!: CreateOfferingDto;          // base offering

    @ApiProperty({ type: [CreateOfferingOfferDto] })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateOfferingOfferDto)
    offers!: CreateOfferingOfferDto[];     // media/offers

    @ApiProperty({ type: [CreateOfferingPriceDto], required: false })
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CreateOfferingPriceDto)
    prices: CreateOfferingPriceDto;     
}