import { Inject, Injectable } from '@nestjs/common';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { ActiveUserData } from '../interfaces/active-user-data.interface';

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
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>
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
                email: user.email
            }),

            // Gererate Refresh Token
            this.signToken(user.id, this.jwtConfiguration.refreshTokenTTL)
        ]);

        return {
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                userType: user.userType,
                isActive: user.isActive,
                isVerified: user.isVerified,
                dateOfBirth: user.dateOfBirth,
            },
            accessToken,
            refreshToken
        }

    }
}
