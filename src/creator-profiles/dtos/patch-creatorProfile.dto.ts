import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateCreatorProfileDto } from "./create-creatorProfile.dto";
import { IsInt, IsNotEmpty } from "class-validator";

/**
 * Patch creator profile DTO.
 */
export class PatchCreatorProfileDto extends PartialType(CreateCreatorProfileDto) {

    /**
     * The id of the creator profile.
     */
    @ApiProperty({
        description: 'The id of the creator profile',
        type: Number,
        example: 1,
    })
    @IsInt()
    @IsNotEmpty()
    id: number;
}