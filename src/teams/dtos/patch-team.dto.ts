import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateTeamDto } from "./post-team.dto";
import { IsInt, IsNotEmpty } from "class-validator";


export class UpdateTeamDto extends PartialType(CreateTeamDto){

    /**
     * The id of the Team.
     */
    @ApiProperty({
        description: 'The id of the team',
        type: Number,
        example: 1,
    })
    @IsInt()
    @IsNotEmpty()
    id: number;

}