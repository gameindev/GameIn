import { Body, Controller, HttpCode, HttpStatus, Inject, Post } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { SigninDto } from './dto/signin.dto';
import { ApiBody, ApiOperation, ApiProperty, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    constructor(
        /**
         * Injecting Auth Service.
         */
        @Inject(AuthService)
        private readonly authService: AuthService,
    ) { }

    @ApiProperty({
        description: 'Sign In',
        type: SigninDto,
    })
    @ApiBody({
        type: SigninDto,
    })
    @ApiOperation({
        summary: 'Sign In',
        description: 'Sign In',
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'The user is successfully signed in.',
        schema: {
            properties: {
                access_token: {
                    type: 'string',
                    description: 'JWT access token',
                    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
                }
            }
        }
    })
    @Post('sign-in')
    @HttpCode(HttpStatus.OK)
    public async signIn(@Body() signInDto: SigninDto) {
        return this.authService.signIn(signInDto);
    }
}
