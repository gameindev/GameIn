import { IsEnum, IsInt, IsNotEmpty } from "class-validator";
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
    userType: UserType;
}