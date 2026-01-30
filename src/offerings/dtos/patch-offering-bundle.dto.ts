import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsDefined, IsOptional, ValidateNested } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { PatchOfferingDto } from './patch-offering.dto';
import { PatchOfferingOfferDto } from '../offering-offers/dtos/patch-offering-offer.dto';
import { CreateOfferingPriceDto } from '../offering-price/dtos/post-offer-price.dto';

export class PatchOfferingBundleDto {
    @ApiProperty({ type: PatchOfferingDto })
    @IsDefined()
    @ValidateNested()
    @Type(() => PatchOfferingDto)
    offering!: PatchOfferingDto; // base offering

    @ApiPropertyOptional({ type: [PatchOfferingOfferDto] })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => PatchOfferingOfferDto)
    offers?: PatchOfferingOfferDto[];

    @ApiPropertyOptional({ type: CreateOfferingPriceDto })
    @IsOptional()
    @ValidateNested()
    @Type(() => CreateOfferingPriceDto)
    price?: CreateOfferingPriceDto;
}
