import { Body, Controller, Post } from '@nestjs/common';
import { GoogleAuthService } from './providers/google-auth.service';
import { GoogleTokenDto } from './dtos/google-token.dto';
import { Auth } from '../decorators/auth.decorator';
import { AuthType } from '../enums/auth-type.enum';

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
    public authenticate(@Body() googleTokenDto: GoogleTokenDto) {
        return this.googleAuthService.authenticate(googleTokenDto);
    }
}
