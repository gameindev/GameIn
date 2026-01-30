import {
    IsString,
    IsOptional,
    IsEnum,
    IsArray,
    IsNumber,
    IsObject,
    ValidateNested,
    IsNotEmpty,
    MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PostType } from '../enums/post-type.enum';
import { PostVisibility } from '../enums/post-visibility.enum';
import { MediaType } from '../enums/media-type.enum';

export class PostMediaDto {
    @IsNumber()
    @IsNotEmpty()
    upload_id: number;

    @IsEnum(MediaType)
    @IsNotEmpty()
    media_type: MediaType;

    @IsNumber()
    @IsOptional()
    order?: number;

    @IsString()
    @IsOptional()
    @MaxLength(500)
    caption?: string;

    @IsObject()
    @IsOptional()
    metadata?: Record<string, any>;
}

export class CreatePostDto {
    @IsEnum(PostType)
    @IsNotEmpty()
    type: PostType;

    @IsEnum(PostVisibility)
    @IsOptional()
    visibility?: PostVisibility;

    @IsString()
    @IsOptional()
    @MaxLength(10000)
    content?: string;

    @IsString()
    @IsOptional()
    location?: string;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    hashtags?: string[];

    @IsArray()
    @IsNumber({}, { each: true })
    @IsOptional()
    mentions?: number[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => PostMediaDto)
    @IsOptional()
    media?: PostMediaDto[];

    @IsObject()
    @IsOptional()
    metadata?: Record<string, any>;
}

