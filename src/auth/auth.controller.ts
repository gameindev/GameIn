import { Body, ClassSerializerInterceptor, Controller, HttpCode, HttpStatus, Inject, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { SigninDto } from './dtos/signin.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiProperty, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { Auth } from './decorators/auth.decorator';
import { AuthType } from './enums/auth-type.enum';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { UserTypeGuard } from './guards/user-type.guard';
import { UserTypes } from './decorators/user-types.decorator';
import { UserType } from 'src/users/enums/user-type.enums';

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
    @UseInterceptors(ClassSerializerInterceptor)
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
    @ApiBearerAuth()
    @Post('refresh-tokens')
    @HttpCode(HttpStatus.OK)
    @UseGuards(UserTypeGuard)
    @UserTypes(UserType.ADMIN, UserType.CREATOR, UserType.BRAND, UserType.COMMUNITY)
    public async refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
        return this.authService.refreshTokens(refreshTokenDto);
    }


}
