/* eslint-disable */

import { IsBoolean, IsEmail, IsEnum, IsISO8601, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength, ValidateNested } from "class-validator";
import { UserType } from "../enums/user-type.enums";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { CreateCreatorProfileDto } from "@/creator-profiles/dtos/create-creatorProfile.dto";
import { CreateBrandProfileDto } from "@/brand-profiles/dtos/create-brandProfile.dto";


/**
 * Create user DTO.
 */
export class CreateUserDto {

    @ApiProperty({
        description: 'The username of the user',
        type: String,
        example: 'johndoe',
        maxLength: 30,
    })
    @IsString()
    @MinLength(3)
    @MaxLength(30)
    @IsNotEmpty()
    username: string;

    @ApiProperty({
        description: 'The email of the user',
        type: String,
        example: 'johndoe@email.com',
        maxLength: 96,
    })
    @IsEmail()
    @MaxLength(96)
    @IsNotEmpty()
    email: string;


    @ApiProperty({
        description: 'The password of the user',
        type: String,
        example: 'Kj#9mP$2nL',
        minLength: 8,
        maxLength: 96,
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(96)
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
        message:
            'Minimum eight characters, at least one letter, one number and one special character',
    })
    password: string;

    @ApiProperty({
        enum: UserType,
        example: UserType.COMMUNITY,
        description: 'Type of user - CREATOR, BRAND, ADMIN, COMMUNITY.',
    })
    @IsEnum(UserType)
    @IsNotEmpty()
    user_type: UserType;

    @ApiProperty({
        description: 'The date of birth of the user in DD-MM-YYYY format',
        type: String,
        example: '01-01-1990',
    })
    @IsString()
    @IsNotEmpty()
    @Matches(/^\d{2}-\d{2}-\d{4}$/, {
        message: 'Date must be in DD-MM-YYYY format',
    })
    date_of_birth: string;

    // @ApiPropertyOptional({
    //     type: () => CreateCreatorProfileDto,
    // })
    // @IsOptional()
    // @ValidateNested()
    // @Type(() => CreateCreatorProfileDto)
    // creatorProfile?: CreateCreatorProfileDto;

    // @ApiPropertyOptional({
    //     type: () => CreateBrandProfileDto,
    // })
    // @IsOptional()
    // @ValidateNested()
    // @Type(() => CreateBrandProfileDto)
    // brandProfile?: CreateBrandProfileDto;

    @ApiPropertyOptional({
        description: 'If the user is active or not',
        type: Boolean,
        example: true,
        default: true,
    })
    @IsBoolean()
    @IsOptional()
    is_active?: boolean;

      



    /* USER ACTIVITY */
    // lastLogin: Date;
    // lastLogout: Date;
    // lastActivity: Date;
    // lastPasswordChange: Date;
    // lastFailedLogin: Date;
    // failedLoginCount: number;
    // failedLoginIp: string;
    // failedLoginUserAgent: string;
    // failedLoginReason: string;
    // failedLoginDate: Date;
    // failedLoginCountResetDate: Date;
    // failedLoginCountResetIp: string;
    // failedLoginCountResetUserAgent: string;
    // failedLoginCountResetReason: string;

}

