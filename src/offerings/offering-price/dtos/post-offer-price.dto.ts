import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsOptional, IsString, MaxLength } from "class-validator";
import { PaymentProvider } from "@/offerings/enums/payment-provider.enum";
import { Unique } from "typeorm";


// @Unique('UQ_price_offering_id', ['offering_id'])
export class CreateOfferingPriceDto{
    
    // @ApiProperty({
    //     description: 'Parent offering id',
    //     type: Number,
    //     example: 2
    // })
    // @IsInt()
    // offering_id: number;

    @ApiProperty({
        description: 'Actual Price of the Offering',
        type: String,
        example: '1,000.00'
    })
    @IsOptional()
    @IsString()
    @MaxLength(30)
    price?: string;

    @ApiProperty({
        description: 'GameIn Platform Fee calculated based on some percentage',
        type: String,
        example: '75.00'
    })
    @IsOptional()
    @IsString()
    @MaxLength(30)
    platform_fee?: string;


    @ApiProperty({
        description: 'Additional Tax/VAT amount',
        type: String,
        example: '215.00'
    })
    @IsOptional()
    @IsString()
    @MaxLength(30)
    tax?: string;

    @ApiProperty({
        description: 'Total amount price + platform fee + tax',
        type: String,
        example: '1,219.00'
    })
    @IsOptional()
    @IsString()
    @MaxLength(30)
    total?: string;

    @ApiProperty({
        description: 'Mention Payment Provider to use',
        enum: PaymentProvider,
        example: PaymentProvider.PAYPAL
    })
    @IsOptional()
    @IsEnum(PaymentProvider)
    payment_provider?: PaymentProvider;

}