import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsObject, IsInt, IsNotEmpty, MaxLength } from 'class-validator';

export class PatchPreferredGamesDto {

    @ApiProperty({ 
        description: 'ID of the current preffered game',
        required: false
     })
    @IsInt()
    @IsOptional()
    id?: number;

    @ApiProperty({
        description: 'Game URL of the current game',
    })
    @IsString()
    @MaxLength(100)
    @IsNotEmpty()
    game_url: string;

    @ApiProperty({
        description: 'Sorting order in which sequence the games should appear',
        example: 1
    })
    @IsInt()
    sort_order: number;

    @ApiProperty({ type: Object, required: false })
    @IsObject()
    @IsOptional()
    meta_data?: Record<string, any>;
}
