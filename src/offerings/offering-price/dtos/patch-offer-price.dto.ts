

import { ApiProperty,  PartialType } from "@nestjs/swagger";
import { IsInt, IsNotEmpty } from "class-validator";
import { CreateOfferingPriceDto } from "./post-offer-price.dto";

export class PatchOfferPriceDto extends PartialType(CreateOfferingPriceDto) {
    @ApiProperty({
        description: 'The id of the offer price',
        type: Number,
        example: 1,
    })
    @IsInt()
    @IsNotEmpty()
    id: number;
}
