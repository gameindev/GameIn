import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsObject, IsInt, IsNotEmpty } from 'class-validator';

export class PatchPreferredGamesDto {

    @ApiProperty({ required: false })
    @IsInt()
    @IsOptional()
    id?: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    gameUrl: string;

    @ApiProperty()
    @IsInt()
    sortOrder: number;

    @ApiProperty({ type: Object, required: false })
    @IsObject()
    @IsOptional()
    metaData?: Record<string, any>;
}
