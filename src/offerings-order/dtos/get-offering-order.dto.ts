import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsArray, IsDate, IsEnum, IsIn, IsInt, IsOptional, IsString, Max, Min } from "class-validator";
import { OrderStatus } from "../enums/order-status.enum";


export class FindOfferingOrdersQueryDto {
    @ApiPropertyOptional({ minimum: 1, default: 1 })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number = 1;

    @ApiPropertyOptional({ minimum: 1, maximum: 100, default: 20 })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(100)
    limit?: number = 20;

    @ApiPropertyOptional({ description: 'Filter by creator id' })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    creator_id?: number;

    @ApiPropertyOptional({ description: 'Filter by brand id' })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    brand_id?: number;

    @ApiPropertyOptional({ description: 'Filter by offering id' })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    offering_id?: number;

    @ApiPropertyOptional({ description: 'Filter by status' })
    @IsOptional()
    @IsEnum(OrderStatus)
    status?: OrderStatus;

    @ApiPropertyOptional({ description: 'Filter by created at' })
    @IsOptional()
    @Type(() => Date)
    @IsDate()
    created_at?: Date;

    @ApiPropertyOptional({ description: 'Filter by updated at' })
    @IsOptional()
    @Type(() => Date)
    @IsDate()
    updated_at?: Date;

    @ApiPropertyOptional({ description: 'Filter by deleted at' })
    @IsOptional()
    @Type(() => Date)
    @IsDate()
    deleted_at?: Date;

    @ApiPropertyOptional({ description: 'Filter by order id' })
    @IsOptional()
    @IsString()
    order_id?: string;

    @ApiPropertyOptional({ description: 'Filter by relations' })
    @IsOptional()
    @IsArray()
    @IsIn(['brand', 'creator', 'offering', 'order_id'], { each: true })
    @Transform(({ value }) =>
        Array.isArray(value)
            ? value
            : typeof value === 'string'
                ? value.split(',').map((v) => v.trim()).filter(Boolean)
                : undefined,
    )
    relations?: Array<'brand' | 'creator' | 'offering' | 'order_id'>;
}