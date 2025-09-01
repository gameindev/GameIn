import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateCreatorProfileDto } from "./create-creatorProfile.dto";
import { IsInt, IsNotEmpty } from "class-validator";

/**
 * Patch creator profile DTO.
 */
export class PatchCreatorProfileDto extends PartialType(CreateCreatorProfileDto) {



    @ApiProperty({
        description: 'The id of the user that owns this creator profile',
        type: Number,
        example: 1,
        required: true,
    })
    @IsInt()
    @IsNotEmpty()
    user_id: number;
}