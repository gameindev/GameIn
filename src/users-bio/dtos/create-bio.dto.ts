import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

/**
 * Create bio DTO.
 */
export class CreateBioDto {

    @ApiPropertyOptional({ 
        description: 'The bio of the user',
        example: 'I am a user',
     })
    @IsOptional()
    @IsString()
    bio: string;

    @ApiPropertyOptional({ 
        description: 'The video bio of the user',
        example: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
     })
    @IsOptional()
    @IsString()
    video_bio_url: string;

    
}