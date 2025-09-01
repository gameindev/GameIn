import { forwardRef, Inject, Injectable, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import jwtConfig from 'src/auth/config/jwt.config';
import { GoogleTokenDto } from '../dtos/google-token.dto';
import { UsersService } from 'src/users/providers/users.service';
import { GenerateTokensProvider } from 'src/auth/providers/generate-tokens.provider';

@Injectable()
export class GoogleAuthService implements OnModuleInit {
    private oauthClient: OAuth2Client;

    constructor(
        /**
         * Injecting jwtConfiguration
         */
        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

        /**
         * Injecting UserService
         */
        @Inject(forwardRef(() => UsersService))
        private readonly userService: UsersService,

        /**
         * Injecting GenerateTokensProvider
         */
        private readonly generateTokensProvider: GenerateTokensProvider,
    ) {

    }



    onModuleInit() {
        this.oauthClient = new OAuth2Client(
            this.jwtConfiguration.googleClientId,
            this.jwtConfiguration.googleClientSecret,
        );
    }


    public async authenticate(googleTokenDto: GoogleTokenDto) {
        try {
            // verify the Google Token sent by user
            const loginTicket = await this.oauthClient.verifyIdToken({
                idToken: googleTokenDto.token,
            })
            // Extract the payload from Google JWT
            const { email, sub: googleId, given_name } = loginTicket.getPayload();

            // Find the user in our database using GoogleId
            const user = await this.userService.findOneByGoogleId(googleId);

            // If the googleId exists generate token
            if (user) {
                return this.generateTokensProvider.generateTokens(user);
            }

            // If not create the user in our database and generate token
            const newUser = await this.userService.createGoogleUser({
                email: email,
                google_id: googleId,
                given_name: given_name
            });


            return this.generateTokensProvider.generateTokens(newUser);
        } catch (error) {
            // throw UnauthorizedException if the user is not found
            throw new UnauthorizedException('Google authentication failed');
        }

    }
}
