import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { SigninDto } from './../dto/signin.dto';
import { SignInProvider } from './sign-in.provider';
import { RefreshTokenDto } from './../dto/refresh-token.dto';
import { RefreshTokensProvider } from './refresh-tokens.provider';

@Injectable()
export class AuthService {
    constructor(
        /**
         * Injecting signInProvider.
         */
        private readonly signInProvider: SignInProvider,

        /**
         * Injecting RefreshTokenProvider.
         */
        private readonly refreshTokenProvider: RefreshTokensProvider,

    ) { }

    public async signIn(signinDto: SigninDto) {
        return await this.signInProvider.signIn(signinDto);
    }

    public async refreshTokens(refreshTokenDto: RefreshTokenDto) {
        return await this.refreshTokenProvider.refreshTokens(refreshTokenDto);
    }
}
