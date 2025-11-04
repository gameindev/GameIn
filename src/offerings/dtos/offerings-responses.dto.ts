import { ApiProperty } from '@nestjs/swagger';
import { Offering } from '../offerings.entity';
import { OfferingOffers } from '../offering-offers/offering-offers.entity';
import { OfferingPrice } from '../offering-price/offering-price.entity';
import { PaginationMetaDto } from './get-offering.dto';

export class OfferingBundleResponseDto {
    @ApiProperty({ type: () => Offering })
    offering!: Offering;

    @ApiProperty({ type: () => [OfferingOffers] })
    offers!: OfferingOffers[];

    @ApiProperty({ type: () => OfferingPrice, nullable: true })
    prices!: OfferingPrice | null;
}



export class FindOfferingsResponseDto {
    @ApiProperty({ type: () => [Offering] })
    data!: Offering[];

    @ApiProperty({ type: () => PaginationMetaDto })
    meta!: PaginationMetaDto;
}
