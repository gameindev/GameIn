import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { CreateBioDto } from "./create-bio.dto";

/**
 * Patch bio DTO.
 */
export class PatchBioDto extends PartialType(CreateBioDto) {

    @ApiProperty({
        description: 'The id of the user that owns this user bio',
        type: Number,
        example: 1,
        required: true,
    })
    @IsInt()
    @IsNotEmpty()
    userId: number;    
}