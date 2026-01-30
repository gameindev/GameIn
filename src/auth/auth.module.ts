import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './providers/auth.service';
import { HashingProvider } from './providers/hashing.provider';
import { BcryptProvider } from './providers/bcrypt.provider';
import { SignInProvider } from './providers/sign-in.provider';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { GenerateTokensProvider } from './providers/generate-tokens.provider';
import { RefreshTokensProvider } from './providers/refresh-tokens.provider';
import { GoogleAuthController } from './social/google-auth.controller';
import { GoogleAuthService } from './social/providers/google-auth.service';
import { UsersModule } from '../users/users.module';
import { UpdateUserProvider } from '../users/providers/update-user.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';

@Module({
    controllers: [AuthController, GoogleAuthController],
    providers: [
        AuthService,
        {
            provide: HashingProvider,
            useClass: BcryptProvider,
        },
        SignInProvider,
        GenerateTokensProvider,
        RefreshTokensProvider,
        GoogleAuthService,
        UpdateUserProvider
    ],
    imports: [
        ConfigModule.forFeature(jwtConfig),
        JwtModule.registerAsync(jwtConfig.asProvider()),
        TypeOrmModule.forFeature([User]),
        forwardRef(() => UsersModule)
    ],
    exports: [AuthService, HashingProvider, GenerateTokensProvider, GoogleAuthService, UpdateUserProvider, JwtModule]
})
export class AuthModule { }
