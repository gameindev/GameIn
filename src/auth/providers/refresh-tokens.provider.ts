import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { GenerateTokensProvider } from './generate-tokens.provider';
import { UsersService } from 'src/users/providers/users.service';
import { ActiveUserData } from '../interfaces/active-user-data.interface';

@Injectable()
export class RefreshTokensProvider {

    constructor(
        // Inject JWT Service
        private readonly jwtService: JwtService,

        // Inject JWT Configuration
        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

        // Generate Tokens Provider
        private readonly generateTokensProvider: GenerateTokensProvider,

        // Inject Users Service
        @Inject(forwardRef(() => UsersService))
        private readonly usersService: UsersService,

    ) { }


    public async refreshTokens(refreshTokenDto: RefreshTokenDto) {

        try {
            // Verify the refresh token using JWT Service
            const { sub } = await this.jwtService.verifyAsync<Pick<ActiveUserData, 'sub'>>(
                refreshTokenDto.refreshToken,
                {
                    secret: this.jwtConfiguration.secret,
                    audience: this.jwtConfiguration.audience,
                    issuer: this.jwtConfiguration.issuer,
                }
            );

            // Fetch User from the database
            const user = await this.usersService.getUserById(sub);

            // Generate new access and refresh tokens
            return await this.generateTokensProvider.generateTokens(user);
        } catch (error) {
            throw new UnauthorizedException(error)
        }

    }
}
