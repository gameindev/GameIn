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
        description: 'Filter by offering IDs (comma-separated or array)',
        isArray: true,
        type: Number,
        example: [1, 2, 3],
    })
    @IsOptional()
    @Transform(({ value }) => {
        if (!value) return undefined;
        // Handle array from repeated query params: ?ids=1&ids=2
        if (Array.isArray(value)) {
            return value.map((v) => Number(v)).filter((v) => !isNaN(v) && v > 0);
        }
        // Handle comma-separated string: ?ids=1,2,3
        if (typeof value === 'string') {
            return value.split(',').map((v) => Number(v.trim())).filter((v) => !isNaN(v) && v > 0);
        }
        // Handle single value: ?ids=1
        const num = Number(value);
        return !isNaN(num) && num > 0 ? [num] : undefined;
    })
    @IsArray()
    @IsInt({ each: true })
    @Min(1, { each: true })
    ids?: number[];

    @ApiPropertyOptional({
        description: 'Relations to include (comma-separated or repeated)',
        isArray: true,
        enum: ['user', 'offering_offers', 'offering_prices', 'offering_price', 'last_adjusted_by', 'logo'],
        example: ['user', 'offering_offers', 'offering_prices', 'offering_price', 'last_adjusted_by', 'logo'],
    })
    @IsOptional()
    @IsArray()
    @IsIn(['user', 'offering_offers', 'offering_prices', 'offering_price', 'last_adjusted_by', 'logo'], { each: true })
    @Transform(({ value }) =>
        Array.isArray(value)
            ? value
            : typeof value === 'string'
                ? value.split(',').map((v) => v.trim()).filter(Boolean)
                : undefined,
    )
    relations?: Array<'user' | 'offering_offers' | 'offering_prices' | 'offering_price' | 'last_adjusted_by' | 'logo'>;
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
