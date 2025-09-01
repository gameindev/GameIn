import {
    IsString,
    IsOptional,
    IsUrl,
    IsNumber,
    IsInt,
    IsPositive,
    Min,
    MaxLength,
    ValidateNested
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCreatorProfileDto {
    @ApiPropertyOptional({ example: 'John', maxLength: 30 })
    @IsOptional()
    @IsString() 
    @MaxLength(30)
    first_name?: string;

    @ApiPropertyOptional({ example: 'Doe', maxLength: 30 })
    @IsOptional()
    @IsString()
    @MaxLength(30)
    last_name?: string;

    @ApiPropertyOptional({ example: 'male', maxLength: 10 })
    @IsOptional()
    @IsString()
    @MaxLength(10)
    gender?: string;

    @ApiPropertyOptional({ example: 'India', maxLength: 30 })
    @IsOptional()
    @IsString()
    @MaxLength(30)
    country?: string;

    @ApiPropertyOptional({ example: '+91-9876543210', maxLength: 20 })
    @IsOptional()
    @IsString()
    @MaxLength(20)
    contact?: string;

    @ApiPropertyOptional({
        example: 'https://johnportfolio.com',
        description: 'Website URL',
    })
    @IsOptional()
    @IsUrl()
    website?: string;

    @ApiPropertyOptional({ example: 1000, description: 'Total followers count' })
    @IsOptional()
    @IsNumber()
    @Min(0)
    followers?: number;

    @ApiPropertyOptional({ example: 50000, description: 'Total views count' })
    @IsOptional()
    @IsNumber()
    @Min(0)
    views?: number;

    @ApiPropertyOptional({ example: 3, description: 'Rank or tier level' })
    @IsOptional()
    @IsInt()
    @Min(0)
    rank?: number;

    // @ApiPropertyOptional({
    //     type: () => CreateUserBioDto,
    //     description: 'Optional nested bio object',
    // })
    // @IsOptional()
    // @ValidateNested()
    // @Type(() => CreateUserBioDto)
    // bio?: CreateUserBioDto;

    // @ApiPropertyOptional({
    //     type: () => [CreateCreatorSocialStatDto],
    //     description: 'List of social media stats for the creator',
    // })
    // @IsOptional()
    // @ValidateNested({ each: true })
    // @Type(() => CreateCreatorSocialStatDto)
    // socialStats?: CreateCreatorSocialStatDto[];
}
