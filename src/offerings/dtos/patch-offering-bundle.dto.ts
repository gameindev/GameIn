import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDefined, ValidateNested } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { PatchOfferingDto } from './patch-offering.dto';
import { PatchOfferingOfferDto } from '../offering-offers/dtos/patch-offering-offer.dto';

export class PatchOfferingBundleDto {
    @ApiProperty({ type: PatchOfferingDto })
    @IsDefined()
    @ValidateNested()
    @Type(() => PatchOfferingDto)
    offering!: PatchOfferingDto; // base offering

  
}
