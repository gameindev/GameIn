import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ConversationType } from "../enum/conversation-type.enum";
import { IsArray, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";


export class CreateConversationDto {

    @ApiProperty({
        description: 'The type of conversation',
        enum: ConversationType,
        example: ConversationType.DIRECT
    })
    @IsEnum(ConversationType)
    @IsNotEmpty()
    type: ConversationType;

    @ApiPropertyOptional({
        description: 'The title of the conversation',
        example: 'John Doe',
        maxLength: 120
    })
    @IsString()
    @IsOptional()
    @MaxLength(120)
    title?: string;



    @ApiProperty({
        description: 'The user IDs of the participants',
        example: [1, 2, 3],
        type: [Number]
    })
    @IsArray()
    @IsNotEmpty()
    @IsInt({ each: true })
    participant_ids: number[];

    @ApiProperty({
        description: 'The user IDs that should be admins (must be subset of participant_ids)',
        example: [1],
        type: [Number],
        required: false
    })
    @IsArray()
    @IsInt({ each: true })
    admin_ids?: number[];
}