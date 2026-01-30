import {
    IsString,
    IsOptional,
    IsEnum,
    IsArray,
    IsNumber,
    IsObject,
    ValidateNested,
    MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PostVisibility } from '../enums/post-visibility.enum';
import { PostMediaDto } from './create-post.dto';

export class UpdatePostDto {
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

