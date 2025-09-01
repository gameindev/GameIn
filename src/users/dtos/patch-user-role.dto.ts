import { IsEnum, IsInt, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { UserType } from "../enums/user-type.enums";
import { ApiProperty } from "@nestjs/swagger";



export class PathcUserRoleDto {

    @ApiProperty({
        enum: UserType,
        example: UserType.COMMUNITY,
        description: 'Type of user - CREATOR, BRAND, COMMUNITY.',
    })
    @IsEnum(UserType)
    @IsNotEmpty()
    user_type: UserType;


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
}