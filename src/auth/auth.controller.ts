import { Body, Controller, HttpCode, HttpStatus, Inject, Post } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { SigninDto } from './dtos/signin.dto';
import { ApiBody, ApiOperation, ApiProperty, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { Auth } from './decorators/auth.decorator';
import { AuthType } from './enums/auth-type.enum';
import { RefreshTokenDto } from './dtos/refresh-token.dto';

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
    @Auth(AuthType.None)
    public async signIn(@Body() signInDto: SigninDto) {
        return this.authService.signIn(signInDto);
    }


    @ApiProperty({
        description: 'Refresh Tokens',
        type: RefreshTokenDto,
    })
    @ApiBody({
        type: RefreshTokenDto,
    })
    @ApiOperation({
        summary: 'Generate Refresh Tokens',
        description: 'Refresh Tokens',
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'The user is successfully signed in.',
        schema: {
            properties: {
                access_token: {
                    type: 'string',
                    description: 'JWT access token',
                    example: '...'
                }
            }
        }
    })
    @Post('refresh-tokens')
    @HttpCode(HttpStatus.OK)
    @Auth(AuthType.None)
    public async refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
        return this.authService.refreshTokens(refreshTokenDto);
    }


}
