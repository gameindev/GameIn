import { forwardRef, Inject, Injectable, RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
import { SigninDto } from '../dtos/signin.dto';
import { UsersService } from '@/users/providers/users.service';
import { HashingProvider } from './hashing.provider';
import { GenerateTokensProvider } from './generate-tokens.provider';
import { UserType } from '@/users/enums/user-type.enums';

@Injectable()
export class SignInProvider {

    constructor(
        /**
         * Injecting UsersService
         */
        @Inject(forwardRef(() => UsersService))
        private readonly usersService: UsersService,

        /**
         * Injecting Hashing Provider
         */
        @Inject(HashingProvider)
        private readonly hashingProvider: HashingProvider,

        /**
         * Inject Generate Tokens Provider
         */
        private readonly generateTokensProvider: GenerateTokensProvider
    ) { }

    public async signIn(signinDto: SigninDto) {
        // Find the user using email or username
        let user = await this.usersService.findOneByIdentifier(signinDto.identifier);     

        // Compare the password
        let isEqual: boolean = false

        try {
            isEqual = await this.hashingProvider.comparePassword(signinDto.password, user.password);
        } catch (error) {
            throw new RequestTimeoutException(error, 'Could not compare password');
        }

        // Throw an exception if password does not match
        if (!isEqual) {
            throw new UnauthorizedException('Invalid Password');
        }

        return await this.generateTokensProvider.generateTokens(user);

    }
}
