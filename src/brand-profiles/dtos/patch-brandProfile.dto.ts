import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateBrandProfileDto } from "./create-brandProfile.dto";
import { IsInt, IsNotEmpty } from "class-validator";



/**
 * Patch brand profile DTO.
 */
export class PatchBrandProfileDto extends PartialType(CreateBrandProfileDto) {

    /**
     * The id of the brand profile.
     */
    // @ApiProperty({
    //     description: 'The id of the brand profile',
    //     type: Number,
    //     example: 1,
    // })
    // @IsInt()
    // @IsNotEmpty()
    // id: number;

    @ApiProperty({
        description: 'The id of the user that owns this creator profile',
        type: Number,
        example: 1,
        required: true,
    })
    @IsInt()
    @IsNotEmpty()
    userId: number;
}