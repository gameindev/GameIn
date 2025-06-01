import { IsEnum, IsNotEmpty } from "class-validator";
import { UserType } from "../enums/user-type.enums";
import { ApiProperty } from "@nestjs/swagger";



export class PathcUserRoleDto {

    @ApiProperty({
        description: 'Google ID of the user to assign a role',
        type: String,
        example: '1234567890',
    })
    @IsNotEmpty()
    googleId: string;

    @ApiProperty({
        enum: UserType,
        example: UserType.COMMUNITY,
        description: 'Type of user - CREATOR, BRAND, COMMUNITY.',
    })
    @IsEnum(UserType)
    @IsNotEmpty()
    userType: UserType;
}