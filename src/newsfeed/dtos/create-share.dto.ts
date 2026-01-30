import { IsString, IsOptional, MaxLength } from 'class-validator';

export class CreateShareDto {
    @IsString()
    @IsOptional()
    @MaxLength(1000)
    comment?: string;
}

