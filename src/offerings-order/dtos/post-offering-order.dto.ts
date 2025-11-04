import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";
import { OrderStatus } from "../enums/order-status.enum";
import { OfferingType } from "../../offerings/enums/offering-type.enum";


export class CreateOfferingOrderDto {
    @ApiProperty({
        description: 'Offering ID',
        type: Number,
        example: 1
    })
    @IsInt()
    offering_id: number;

    @ApiProperty({
        description: 'Title of the offering order',
        type: String,
        example: 'Ultimate Promoting Package'
    })
    @IsString()
    title: string;

    @ApiProperty({
        description: 'Notes of the offering order',
        type: String,
        example: 'Lorem ipsum dolor sit amit.'
    })
    @IsString()
    @IsOptional()
    notes?: string;

    @ApiProperty({
        description: 'Type of the offering order',
        type: String,
        example: 'Ultimate Promoting Package'
    })
    @IsEnum(OfferingType)
    @IsNotEmpty()
    type: OfferingType;

    @ApiProperty({
        description: 'Currency of the offering order',
        type: String,
        example: 'USD'
    })
    @IsString()
    @IsNotEmpty()
    currency: string;


    @ApiProperty({
        description: 'Sub total of the offering order',
        type: Number,
        example: 100
    })
    @IsNumber()
    @IsNotEmpty()
    sub_total: number;

    @ApiProperty({
        description: 'Fee of the offering order',
        type: Number,
        example: 10
    })
    @IsNumber()
    @IsNotEmpty()
    fee: number;

    @ApiProperty({
        description: 'Tax of the offering order',
        type: Number,
        example: 10
    })
    @IsNumber()
    @IsNotEmpty()
    tax: number;

    @ApiProperty({
        description: 'Total of the offering order',
        type: Number,
        example: 120
    })
    @IsNumber()
    @IsNotEmpty()
    total: number;


    @ApiProperty({
        description: 'Status of the offering order',
        type: String,
        example: 'PENDING_PAYMENT'
    })
    @IsEnum(OrderStatus)
    @IsNotEmpty()
    status: OrderStatus;

    @ApiProperty({
        description: 'Creator ID',
        type: Number,
        example: 1
    })
    @IsInt()
    @IsNotEmpty()
    creator_id: number;

    @ApiProperty({
        description: 'Brand ID',
        type: Number,
        example: 1
    })
    @IsInt()
    @IsNotEmpty()
    brand_id: number;
}