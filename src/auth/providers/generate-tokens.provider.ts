import { forwardRef, Inject, Injectable } from '@nestjs/common';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ActiveUserData } from '../interfaces/active-user-data.interface';
import { User } from '../../users/user.entity';
import { UsersService } from '@/users/providers/users.service';
import { UpdateUserProvider } from '@/users/providers/update-user.provider';

@Injectable()
export class GenerateTokensProvider {

    constructor(
        /**
         * Injecting JWT Service
         */
        private readonly jwtService: JwtService,
        /**
         * Injecting JWT Configuration
         */
        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
        /**
         * Injecting Update User Provider
         */
        @Inject(forwardRef(() => UpdateUserProvider))
        private readonly updateUserProvider: UpdateUserProvider,
    ) { }

    public async signToken<T>(userId: number, expiresIn: number, payload?: T) {
        return await this.jwtService.signAsync(
            {
                sub: userId,
                ...payload,
            },
            {
                audience: this.jwtConfiguration.audience,
                issuer: this.jwtConfiguration.issuer,
                secret: this.jwtConfiguration.secret,
                expiresIn: expiresIn,
            }
        );
    }


    public async generateTokens(user: User) {

        const [accessToken, refreshToken] = await Promise.all([
            // Generate Access Token
            this.signToken<Partial<ActiveUserData>>(user.id, this.jwtConfiguration.accessTokenTTl, {
                email: user.email,
                username: user.username,
                user_type: user.user_type,
            }),

            // Gererate Refresh Token
            this.signToken(user.id, this.jwtConfiguration.refreshTokenTTL)
        ]);

        // Update the user's is_logged_in column to true
        await this.updateUserProvider.updateUserIsLoggedIn(user.id);

        return {
            user: {
                id: user.id, 
                email: user.email,
                username: user.username,
                user_type: user.user_type,
            },
            accessToken,
            refreshToken
        }
 
    }
}
