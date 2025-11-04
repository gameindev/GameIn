import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { SigninDto } from '../dtos/signin.dto';
import { SignInProvider } from './sign-in.provider';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import { RefreshTokensProvider } from './refresh-tokens.provider';
import { UpdateUserProvider } from '../../users/providers/update-user.provider';
import { ActiveUserData } from '../interfaces/active-user-data.interface';

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

        /**
         * Injecting UpdateUserProvider.
         */
        @Inject(forwardRef(() => UpdateUserProvider))
        private readonly updateUserProvider: UpdateUserProvider,

    ) { }

    public async signIn(signinDto: SigninDto) {
        return await this.signInProvider.signIn(signinDto);
    }

    public async refreshTokens(refreshTokenDto: RefreshTokenDto) {
        return await this.refreshTokenProvider.refreshTokens(refreshTokenDto);
    }

    public async logout(user: ActiveUserData) {
        await this.updateUserProvider.updateUserIsLoggedOut(user.sub);
        return { message: 'Successfully logged out' };
    }
}
