import { forwardRef, Inject, Injectable, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import { GoogleTokenDto } from '../dtos/google-token.dto';
import jwtConfig from '../../config/jwt.config';
import { UsersService } from '../../../users/providers/users.service';
import { GenerateTokensProvider } from '../../providers/generate-tokens.provider';

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
            let user = await this.userService.findOneByGoogleId(googleId);

            // If the googleId exists generate token
            if (user) {
                return this.generateTokensProvider.generateTokens(user);
            }

            // Check if user exists with this email (but different or no google_id)
            let existingUserByEmail = null;
            try {
                existingUserByEmail = await this.userService.findUserOneByEmail(email);
            } catch (error) {
                // User doesn't exist by email, which is fine - we'll create a new one
            }

            // If user exists with email but no google_id, update it
            if (existingUserByEmail) {
                if (!existingUserByEmail.google_id) {
                    // Update the existing user with google_id
                    await this.userService.updateUserGoogleId(existingUserByEmail.id, googleId);
                    // Reload the user to get updated data
                    user = await this.userService.findOneByGoogleId(googleId);
                    if (user) {
                        return this.generateTokensProvider.generateTokens(user);
                    }
                } else {
                    // User exists with email but has a different google_id
                    // This shouldn't happen, but handle it gracefully
                    throw new UnauthorizedException('Email is already associated with a different Google account');
                }
            }

            // If not create the user in our database and generate token
            const newUser = await this.userService.createGoogleUser({
                email: email,
                google_id: googleId,
                given_name: given_name
            });

            return this.generateTokensProvider.generateTokens(newUser);
        } catch (error) {
            // If it's already an HTTP exception, re-throw it to preserve the status code
            if (error?.statusCode) {
                throw error;
            }

            // Otherwise throw UnauthorizedException if the user is not found
            throw new UnauthorizedException(`Google authentication failed: ${error?.message || 'Unknown error'}`);
        }

    }
}
