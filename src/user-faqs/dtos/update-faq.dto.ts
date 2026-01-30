import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt, Min, MaxLength } from 'class-validator';

export class UpdateFaqDto {
    @ApiProperty({
        description: 'FAQ question',
        example: 'What games do you play?',
        maxLength: 500,
        required: false,
    })
    @IsString()
    @IsOptional()
    @MaxLength(500)
    question?: string;

    @ApiProperty({
        description: 'FAQ answer',
        example: 'I primarily play FPS games like Call of Duty and Valorant.',
        required: false,
    })
    @IsString()
    @IsOptional()
    answer?: string;

    @ApiProperty({
        description: 'Display order (lower numbers appear first)',
        example: 0,
        required: false,
    })
    @IsInt()
    @IsOptional()
    @Min(0)
    order?: number;
}

