/* eslint-disable */

import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./users/users.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CreatorProfilesModule } from './creator-profiles/creator-profiles.module';
import { BrandProfilesModule } from './brand-profiles/brand-profiles.module';
import { AuthModule } from './auth/auth.module';
import appConfig from "./config/app.config";
import databaseConfig from "./config/database.config";
import * as dotenvFlow from 'dotenv-flow';
import environmentValidation from "./config/environment.validation";
import jwtConfig from "./auth/config/jwt.config";
import { JwtModule } from "@nestjs/jwt";
import { APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";
import { AccessTokenGuard } from "./auth/guards/access-token/access-token.guard";
import { AuthenticationGuard } from "./auth/guards/authentication/authentication.guard";
import { DataResponseInterceptor } from "./common/interceptors/data-response/data-response.interceptor";
import { UsersBioModule } from './users-bio/users-bio.module';
import { UploadsModule } from './uploads/uploads.module';
import { UserBio } from "./users-bio/user-bio.entity";
import { BrandProfile } from "./brand-profiles/brand-profile.entity";
import { CreatorProfile } from "./creator-profiles/creator-profile.entity";
import { User } from "./users/user.entity";
import { Upload } from "./uploads/upload.entity";
import { PreferredGamesModule } from './preferred-games/preferred-games.module';
import { PreferredGames } from "./preferred-games/preferred-games.entity";
import { SocialIntegrationModule } from './social-integration/social-integration.module';
import twitchConfig from "./social-integration/platforms/twitch/twitch.config";
import { SocialIntegration } from "./social-integration/entities/social-integration.entity";
import { MetadataModule } from './metadata/metadata.module';
import { UserSearchModule } from './user-search/user-search.module';
dotenvFlow.config();

const ENV = process.env.NODE_ENV;

@Module({
    imports: [        
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: [`.env.${ENV}`, '.env'],
            load: [appConfig, databaseConfig, twitchConfig],
            validationSchema: environmentValidation,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],

            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                return {
                    type: "postgres", // Use the injected ConfigService t,
                    host: configService.get('database.host'), // Use the injected ConfigService t,
                    port: +configService.get('database.port'), // Use the injected ConfigService to get the value,
                    username: configService.get('database.username'), // Use the injected ConfigService t,
                    password: configService.get('database.password'),
                    database: configService.get('database.name'),
                    // autoLoadEntities: configService.get('database.autoLoadEntities'),
                    entities: [User, Upload, CreatorProfile, BrandProfile, UserBio, PreferredGames, SocialIntegration],
                    // synchronize: configService.get('database.synchronize')
                    synchronize: false
                }
            }
        }),
        ConfigModule.forFeature(jwtConfig),
        JwtModule.registerAsync(jwtConfig.asProvider()),
        AuthModule,
        UsersModule,
        CreatorProfilesModule,
        BrandProfilesModule,
        UsersBioModule,
        UploadsModule,
        PreferredGamesModule,
        SocialIntegrationModule,
        MetadataModule,
        UserSearchModule
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: AuthenticationGuard
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: DataResponseInterceptor
        },
        AccessTokenGuard,
    ]
})
export class AppModule { }
