import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty } from "class-validator";

export class RemoveAdminDto {
    @ApiProperty({
        description: 'The conversation ID',
        example: 1,
        type: Number
    })
    @IsInt()
    @IsNotEmpty()
    conversation_id: number;

    @ApiProperty({
        description: 'The user ID to remove admin status from',
        example: 1,
        type: Number
    })
    @IsInt()
    @IsNotEmpty()
    user_id: number;
}
