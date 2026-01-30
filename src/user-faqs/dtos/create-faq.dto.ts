import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsInt, Min, MaxLength } from 'class-validator';

export class CreateFaqDto {
    @ApiProperty({
        description: 'FAQ question',
        example: 'What games do you play?',
        maxLength: 500,
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(500)
    question: string;

    @ApiProperty({
        description: 'FAQ answer',
        example: 'I primarily play FPS games like Call of Duty and Valorant.',
    })
    @IsString()
    @IsNotEmpty()
    answer: string;

    @ApiProperty({
        description: 'Display order (lower numbers appear first)',
        example: 0,
        required: false,
        default: 0,
    })
    @IsInt()
    @IsOptional()
    @Min(0)
    order?: number;
}

