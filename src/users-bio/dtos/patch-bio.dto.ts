import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { CreateBioDto } from "./create-bio.dto";
import { Type } from "class-transformer";
import { PatchPreferredGamesDto } from "../../preferred-games/dto/patch-preferred-games.dto";

/**
 * Patch bio DTO.
 */
export class PatchBioDto extends PartialType(CreateBioDto) {

    @ApiProperty({ description: 'User ID', type: Number, example: 1, required: true })
    @IsInt()
    @IsNotEmpty()
    user_id: number;

    @ApiProperty({ type: [PatchPreferredGamesDto], required: false })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => PatchPreferredGamesDto)
    preferred_games?: PatchPreferredGamesDto[];     


}