import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty } from "class-validator";

export class AddAdminDto {
    @ApiProperty({
        description: 'The conversation ID',
        example: 1,
        type: Number
    })
    @IsInt()
    @IsNotEmpty()
    conversation_id: number;

    @ApiProperty({
        description: 'The user ID to make admin',
        example: 1,
        type: Number
    })
    @IsInt()
    @IsNotEmpty()
    user_id: number;
}
