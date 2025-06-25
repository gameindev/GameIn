import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

/**
 * Create user DTO.
 */
export class UserSearchDto {
    @ApiPropertyOptional({ description: 'Search keyword (username, email, creator name, brand name)' })
    @IsOptional()
    @IsString()
    keyword?: string;

    @ApiPropertyOptional({ enum: ['CREATOR', 'BRAND'], description: 'User type to search (CREATOR or BRAND)' })
    @IsOptional()
    @IsEnum(['CREATOR', 'BRAND'])
    userType?: 'CREATOR' | 'BRAND';

    @ApiPropertyOptional({ description: 'Country filter' })
    @IsOptional()   
    @IsString()
    country?: string;

    @ApiPropertyOptional({ description: 'Page number for pagination', default: 1 })
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    page?: number = 1;

    @ApiPropertyOptional({ description: 'Results per page', default: 20 })
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    limit?: number = 20;
}
