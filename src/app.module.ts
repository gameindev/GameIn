import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
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
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";
import { AccessTokenGuard } from "./auth/guards/access-token/access-token.guard";
import { AuthenticationGuard } from "./auth/guards/authentication/authentication.guard";
import { DataResponseInterceptor } from "./common/interceptors/data-response/data-response.interceptor";
import { UsersBioModule } from './users-bio/users-bio.module';
import { UploadsModule } from './uploads/uploads.module';
import { UserBio } from "./users-bio/user-bio.entity";
import { BrandProfile } from "./brand-profiles/brand-profile.entity";
import { CreatorProfile } from "./creator-profiles/creator-profile.entity";
import { User } from "./users/user.entity";
import { PreferredGamesModule } from './preferred-games/preferred-games.module';
import { PreferredGames } from "./preferred-games/preferred-games.entity";
import { SocialIntegrationModule } from './social-integration/social-integration.module';
import twitchConfig from "./social-integration/platforms/twitch/twitch.config";
import { SocialIntegration } from "./social-integration/entities/social-integration.entity";
import { MetadataModule } from './metadata/metadata.module';
import { UserSearchModule } from './user-search/user-search.module';
import { AllExceptionsFilter } from "./common/filters/all-exceptions.filter";
import { UploadEntity } from "./uploads/upload.entity";
import { ViewsModule } from './views/views.module';
import { ProfileView } from "./views/views.entity";
import { UserFollowModule } from './user-follow/user-follow.module';
import { UserFollow } from "./user-follow/user-follow.entity";
import { EmailsModule } from './emails/emails.module';
import { OfferingsModule } from './offerings/offerings.module';
import sesConfig from "./emails/config/ses.config";
import smtpConfig from "./emails/config/smtp.config";
import discordConfig from "./social-integration/platforms/discord/discord.config";
import xConfig from "./social-integration/platforms/x/x.config";
import { Offering } from "./offerings/offerings.entity";
import { OfferingOffers } from "./offerings/offering-offers/offering-offers.entity";
import { OfferingPrice } from "./offerings/offering-price/offering-price.entity";
import { TeamsModule } from './teams/teams.module';
import { Team } from "./teams/teams.entity";
import { TeamMembers } from "./teams/team-members/team-members.entity";
import { TeamLinks } from "./teams/team-links/team-links.entity";
dotenvFlow.config();

const ENV = process.env.NODE_ENV;

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: [`.env.${ENV}`, '.env'],
            load: [appConfig, databaseConfig, twitchConfig, xConfig, sesConfig, smtpConfig, discordConfig],
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
                    entities: [
                        User,
                        UploadEntity,
                        CreatorProfile,
                        BrandProfile,
                        UserBio,
                        PreferredGames,
                        SocialIntegration,
                        ProfileView,
                        UserFollow,
                        Offering,
                        OfferingOffers,
                        OfferingPrice,
                        Team,
                        TeamMembers,
                        TeamLinks
                    ],
                    // synchronize: configService.get('database.synchronize')
                    synchronize: false,
                    namingStrategy: new SnakeNamingStrategy()}
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
        {
            provide: APP_GUARD,
            useClass: AuthenticationGuard
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: DataResponseInterceptor
        },
        {
            provide: APP_FILTER,
            useClass: AllExceptionsFilter,
        },
        AccessTokenGuard,
    ]
})
export class AppModule { }



