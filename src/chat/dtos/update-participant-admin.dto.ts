import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsInt, IsNotEmpty } from "class-validator";

export class UpdateParticipantAdminDto {
    @ApiProperty({
        description: 'The conversation ID',
        example: 1,
        type: Number
    })
    @IsInt()
    @IsNotEmpty()
    conversation_id: number;

    @ApiProperty({
        description: 'Array of participant updates with user_id and is_admin status',
        example: [
            { user_id: 1, is_admin: true },
            { user_id: 2, is_admin: false }
        ],
        type: 'array'
    })
    @IsArray()
    @IsNotEmpty()
    participants: {
        user_id: number;
        is_admin: boolean;
    }[];
}
