/* eslint-disable */

import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateUserDto } from "./post-create-user.dto";
import { IsInt, IsNotEmpty } from "class-validator";


/**
 * Patch user DTO.
 */
export class PatchUserDto extends PartialType(CreateUserDto) {

    /**
     * The id of the user.
     */
    @ApiProperty({
        description: 'The id of the user',
        type: Number,
        example: 1,
    })
    @IsInt()
    @IsNotEmpty()
    id: number;
}
