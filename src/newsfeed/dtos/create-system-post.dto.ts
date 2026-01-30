import {
    IsString,
    IsOptional,
    IsEnum,
    IsArray,
    IsObject,
    ValidateNested,
    IsNotEmpty,
    MaxLength,
    IsNumber,
    Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PostType } from '../enums/post-type.enum';
import { PostVisibility } from '../enums/post-visibility.enum';
import { MediaType } from '../enums/media-type.enum';
import { PostMediaDto } from './create-post.dto';
import { SystemPostCategory } from '../enums/system-post-category.enum';

export class CreateSystemPostDto {
    @IsEnum(PostType)
    @IsNotEmpty()
    type: PostType;

    @IsEnum(PostVisibility)
    @IsOptional()
    visibility?: PostVisibility;

    @IsString()
    @IsNotEmpty()
    @MaxLength(10000)
    content: string;

    @IsEnum(SystemPostCategory)
    @IsNotEmpty()
    system_category: SystemPostCategory; // welcome, collision, broadcast, statistics

    @IsNumber()
    @IsOptional()
    @Min(1)
    user_id?: number; // Optional: for user-specific system posts (e.g., welcome posts)

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => PostMediaDto)
    @IsOptional()
    media?: PostMediaDto[];

    @IsObject()
    @IsOptional()
    metadata?: Record<string, any>;
}

