import { ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsArray,
    IsIn,
    IsInt,
    IsOptional,
    Max,
    Min,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class FindOfferingsQueryDto {
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

    @ApiPropertyOptional({ description: 'Filter by user id' })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    user_id?: number;

    @ApiPropertyOptional({
        description: 'Relations to include (comma-separated or repeated)',
        isArray: true,
        enum: ['user', 'offering_offers', 'offering_price'],
        example: ['user', 'offering_offers', 'offering_price'],
    })
    @IsOptional()
    @IsArray()
    @IsIn(['user', 'offering_offers', 'offering_price'], { each: true })
    @Transform(({ value }) =>
        Array.isArray(value)
            ? value
            : typeof value === 'string'
                ? value.split(',').map((v) => v.trim()).filter(Boolean)
                : undefined,
    )
    relations?: Array<'user' | 'offering_offers' | 'offering_price'>;
}

export class PaginationMetaDto {
    @ApiPropertyOptional()
    total!: number;

    @ApiPropertyOptional()
    page!: number;

    @ApiPropertyOptional()
    limit!: number;

    @ApiPropertyOptional()
    pages!: number;
}
