import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";


export class SigninDto {
    @ApiProperty({
        description: 'Email or Username',
        type: String,
        example: 'nvidia'
        // example: 'markdoe@email.com or markdoe'
    })
    @IsString()
    @IsNotEmpty()
    identifier: string;

    @ApiProperty({
        description: 'Password',
        type: String,
        example:'Kj#9mP$2nL',
    })
    @IsString()
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    }, {
        message: 'Password must be at least 8 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol'
    })
    @IsNotEmpty()
    password: string;
}