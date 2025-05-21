import { forwardRef, Inject, Injectable, RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
import { SigninDto } from '../dto/signin.dto';
import { UsersService } from 'src/users/providers/users.service';
import { HashingProvider } from './hashing.provider';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';

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
         * Injecting JWT Service
         */
        private readonly jwtService: JwtService,

        /**
         * Injecting JWT Configuration
         */
        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    ) { }

    public async signIn(signinDto: SigninDto) {
        //Find the user using email ID        
        // Throw an exception if user not found
        let user = await this.usersService.findUserOneByEmail(signinDto.email);

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

        // Generate JWT token
        const accessToken = await this.jwtService.signAsync(
            {
                sub: user.id,
                email: user.email,
            },
            {
                audience: this.jwtConfiguration.audience,
                issuer: this.jwtConfiguration.issuer,
                secret: this.jwtConfiguration.secret,
                expiresIn: this.jwtConfiguration.accessTokenTTl,
            }
        );

        return {
            accessToken,
        };


    }
}
