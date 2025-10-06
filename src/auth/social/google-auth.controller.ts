import { Body, Controller, Post } from '@nestjs/common';
import { GoogleAuthService } from './providers/google-auth.service';
import { GoogleTokenDto } from './dtos/google-token.dto';
import { Auth } from '../decorators/auth.decorator';
import { AuthType } from '../enums/auth-type.enum';
import { ApiBody, ApiOperation } from '@nestjs/swagger';

@Auth(AuthType.None)
@Controller('auth/google-authentication')
export class GoogleAuthController {

    constructor(
        /** 
         * Inject the GoogleAuthService
         */
        private readonly googleAuthService: GoogleAuthService,
    ) { } 
    
    @Post()
    @ApiOperation({ summary: 'Authenticate with Google' })
    @ApiBody({ type: GoogleTokenDto })
    
    public authenticate(@Body() googleTokenDto: GoogleTokenDto) {
        return this.googleAuthService.authenticate(googleTokenDto);
    }
}
