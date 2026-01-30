import { IsString, IsNotEmpty, IsOptional, IsNumber, MaxLength } from 'class-validator';

export class CreateCommentDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(5000)
    content: string;

    @IsNumber()
    @IsOptional()
    parent_comment_id?: number; // For nested/reply comments
}

