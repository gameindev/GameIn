import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { SigninDto } from './../dto/signin.dto';
import { SignInProvider } from './sign-in.provider';

@Injectable()
export class AuthService {
    constructor(
        /**
         * Injecting signInProvider.
         */
        private readonly signInProvider: SignInProvider,
        
    ) { }

    public async signIn(signinDto: SigninDto) {
        return await this.signInProvider.signIn(signinDto);
    }

    public isAuth() {
        return true;
    }
}
