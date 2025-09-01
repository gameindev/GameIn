import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";


export class RefreshTokenDto {

    @ApiProperty({
        description: 'Refresh Token',
        type: String,
        example: 'refresh_token',
    })
    @IsNotEmpty()
    @IsString()
    refresh_token: string;
}