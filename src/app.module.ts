/* eslint-disable */
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";
import * as dotenvFlow from "dotenv-flow";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

// 🧱 Modules
import { UsersModule } from "./users/users.module";
import { CreatorProfilesModule } from "./creator-profiles/creator-profiles.module";
import { BrandProfilesModule } from "./brand-profiles/brand-profiles.module";
import { AuthModule } from "./auth/auth.module";
import { UsersBioModule } from "./users-bio/users-bio.module";
import { UploadsModule } from "./uploads/uploads.module";
import { PreferredGamesModule } from "./preferred-games/preferred-games.module";
import { SocialIntegrationModule } from "./social-integration/social-integration.module";
import { MetadataModule } from "./metadata/metadata.module";
import { UserSearchModule } from "./user-search/user-search.module";
import { ViewsModule } from "./views/views.module";
import { UserFollowModule } from "./user-follow/user-follow.module";
import { EmailsModule } from "./emails/emails.module";
import { OfferingsModule } from "./offerings/offerings.module";
import { TeamsModule } from "./teams/teams.module";

// 🧩 Entities
import { User } from "./users/user.entity";
import { CreatorProfile } from "./creator-profiles/creator-profile.entity";
import { BrandProfile } from "./brand-profiles/brand-profile.entity";
import { UserBio } from "./users-bio/user-bio.entity";
import { PreferredGames } from "./preferred-games/preferred-games.entity";
import { SocialIntegration } from "./social-integration/entities/social-integration.entity";
import { UploadEntity } from "./uploads/upload.entity";
import { ProfileView } from "./views/views.entity";
import { UserFollow } from "./user-follow/user-follow.entity";
import { Offering } from "./offerings/offerings.entity";
import { OfferingOffers } from "./offerings/offering-offers/offering-offers.entity";
import { OfferingPrice } from "./offerings/offering-price/offering-price.entity";
import { Team } from "./teams/teams.entity";
import { TeamMembers } from "./teams/team-members/team-members.entity";
import { TeamLinks } from "./teams/team-links/team-links.entity";

// 🧠 Configs & Utilities
import appConfig from "./config/app.config";
import databaseConfig from "./config/database.config";
import jwtConfig from "./auth/config/jwt.config";
import environmentValidation from "./config/environment.validation";
import twitchConfig from "./social-integration/platforms/twitch/twitch.config";
import discordConfig from "./social-integration/platforms/discord/discord.config";
import xConfig from "./social-integration/platforms/x/x.config";
import sesConfig from "./emails/config/ses.config";
import smtpConfig from "./emails/config/smtp.config";
import { AccessTokenGuard } from "./auth/guards/access-token/access-token.guard";
import { AuthenticationGuard } from "./auth/guards/authentication/authentication.guard";
import { DataResponseInterceptor } from "./common/interceptors/data-response/data-response.interceptor";
import { AllExceptionsFilter } from "./common/filters/all-exceptions.filter";

dotenvFlow.config(); // ✅ Loads .env only in local/dev

const ENV = process.env.NODE_ENV || 'development';
console.log(ENV)
@Module({
    imports: [
        /** 🌍 Global Config Module */
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: [`.env.${ENV}`, '.env'],
            load: [appConfig, databaseConfig, jwtConfig, twitchConfig, xConfig, sesConfig, smtpConfig, discordConfig],
            validationSchema: environmentValidation,
        }),

        /** 🗄 Database Connection */
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                const isProduction = process.env.NODE_ENV === 'production';

                return {
                    type: 'postgres',
                    host: configService.get<string>('database.host'),
                    port: parseInt(configService.get<string>('database.port'), 10),
                    username: configService.get<string>('database.username'),
                    password: configService.get<string>('database.password'),
                    database: configService.get<string>('database.name'),
                    entities: [
                        User,
                        CreatorProfile,
                        BrandProfile,
                        UserBio,
                        PreferredGames,
                        SocialIntegration,
                        UploadEntity,
                        ProfileView,
                        UserFollow,
                        Offering,
                        OfferingOffers,
                        OfferingPrice,
                        Team,
                        TeamMembers,
                        TeamLinks,
                    ],
                    synchronize: false, // 🚫 Always false in production
                    namingStrategy: new SnakeNamingStrategy(),
                    logging: isProduction ? ['error', 'warn'] : ['error', 'warn', 'query'],
                    ssl: configService.get<boolean>('database.ssl') || process.env.DATABASE_SSL === 'true'
                        ? false
                        : false,
                    extra: {
                        max: Number(process.env.TYPEORM_POOL_MAX ?? 10),
                        min: Number(process.env.TYPEORM_POOL_MIN ?? 1),
                        idleTimeoutMillis: Number(process.env.TYPEORM_POOL_IDLE ?? 30000),
                        connectionTimeoutMillis: Number(process.env.TYPEORM_POOL_ACQUIRE ?? 30000),
                    },
                };
            },
        }),

        /** 🔑 JWT & Auth */
        ConfigModule.forFeature(jwtConfig),
        JwtModule.registerAsync(jwtConfig.asProvider()),

        /** 📦 Feature Modules */
        AuthModule,
        UsersModule,
        CreatorProfilesModule,
        BrandProfilesModule,
        UsersBioModule,
        UploadsModule,
        PreferredGamesModule,
        SocialIntegrationModule,
        MetadataModule,
        UserSearchModule,
        ViewsModule,
        UserFollowModule,
        EmailsModule,
        OfferingsModule,
        TeamsModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        /** 🔒 Global Guards */
        { provide: APP_GUARD, useClass: AuthenticationGuard },
        AccessTokenGuard,

        /** 📦 Global Interceptors */
        { provide: APP_INTERCEPTOR, useClass: DataResponseInterceptor },

        /** ⚠️ Global Exception Handler */
        { provide: APP_FILTER, useClass: AllExceptionsFilter },
    ],
})
export class AppModule { }
