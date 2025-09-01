import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsNumber, IsOptional, IsString, IsUrl, MaxLength, Min } from "class-validator";


export class CreateBrandProfileDto {

    @ApiPropertyOptional({ example: 'Nvidia', maxLength: 30 })
    @IsString()
    @IsOptional()
    @MaxLength(30)
    brand_name?: string;

    @ApiPropertyOptional({ example: 1, description: 'ID of uploaded profile image' })
    @IsOptional()
    @IsInt()
    profile_image_id?: number;

    @ApiPropertyOptional({ example: 2, description: 'ID of uploaded cover image' })
    @IsOptional()
    @IsInt()
    cover_image_id?: number;

    @ApiPropertyOptional({ example: 'New York', maxLength: 30 })
    @IsOptional()
    @IsString()
    @MaxLength(30)
    head_office?: string;

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

}