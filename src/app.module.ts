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
import * as fs from 'fs';

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
import youtubeConfig from "./social-integration/platforms/youtube/youtube.config";
import sesConfig from "./emails/config/ses.config";
import smtpConfig from "./emails/config/smtp.config";
import sendgridConfig from "./emails/config/sendgrid.config";
import kafkaConfig from "./kafka/kafka.config";
import stripeConfig from "./payments/config/stripe.config";
import paypalConfig from "./payments/config/paypal.config";
import razorpayConfig from "./payments/config/razorpay.config";
import paymentsConfig from "./payments/config/payments.config";
import { AccessTokenGuard } from "./auth/guards/access-token/access-token.guard";
import { AuthenticationGuard } from "./auth/guards/authentication/authentication.guard";
import { DataResponseInterceptor } from "./common/interceptors/data-response/data-response.interceptor";
import { AllExceptionsFilter } from "./common/filters/all-exceptions.filter";
import { ChatModule } from './chat/chat.module';
import { ConversationEntity } from "./chat/chat.entity";
import { ConversationParticipantEntity } from "./chat/conversation-participant.entity";
import { MessageEntity } from "./chat/message.entity";
import { MessageReceiptEntity } from "./chat/message-receipt.entity";
import { KafkaModule } from './kafka/kafka.module';
import { OfferingsOrderModule } from './offerings-order/offerings-order.module';
import { InvoicesModule } from './invoices/invoices.module';
import { PaymentIntent } from './payments/payment-intent.entity';
import { Payment } from './payments/payment.entity';
import { PaymentRefund } from './payments/payment-refund.entity';
import { Invoice } from './invoices/invoice.entity';
import { OfferingOrder } from "./offerings-order/offering-order.entity";
import { PaymentsModule } from './payments/payments.module';
import { UserFavouriteModule } from './user-favourite/user-favourite.module';
import { UserFavourite } from "./user-favourite/user-favourite.entity";
import { NotificationsModule } from './notifications/notifications.module';
import { NotificationEntity } from './notifications/entities/notification.entity';
import { NotificationPreferenceEntity } from './notifications/entities/notification-preference.entity';
import { UserFaqsModule } from './user-faqs/user-faqs.module';
import { UserFaq } from './user-faqs/user-faq.entity';
import { NewsfeedModule } from './newsfeed/newsfeed.module';
import { Post } from './newsfeed/entities/post.entity';
import { PostMedia } from './newsfeed/entities/post-media.entity';
import { PostLike } from './newsfeed/entities/post-like.entity';
import { PostComment } from './newsfeed/entities/post-comment.entity';
import { PostShare } from './newsfeed/entities/post-share.entity';

dotenvFlow.config(); // ✅ Loads .env only in local/dev

const ENV = process.env.NODE_ENV || 'development';
// console.log(ENV)
@Module({
    imports: [ 
        /** 🌍 Global Config Module */
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: [`.env.${ENV}`, '.env'],
            load: [appConfig, databaseConfig, jwtConfig, twitchConfig, xConfig, youtubeConfig, sesConfig, smtpConfig, sendgridConfig, discordConfig, kafkaConfig, stripeConfig, paypalConfig, razorpayConfig, paymentsConfig],
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
                        ConversationEntity,
                        ConversationParticipantEntity,
                        MessageEntity,
                        MessageReceiptEntity,
                        OfferingOrder,
                        PaymentIntent,
                        Payment,
                        PaymentRefund,
                        Invoice,
                        UserFavourite,
                        NotificationEntity,
                        NotificationPreferenceEntity,
                        UserFaq,
                        Post,
                        PostMedia,
                        PostLike,
                        PostComment,
                        PostShare,
                    ],
                    synchronize: false, // 🚫 Always false in production
                    namingStrategy: new SnakeNamingStrategy(),
                    // logging: isProduction ? ['error', 'warn'] : ['error', 'warn', 'query'],
                    ssl: configService.get<boolean>('database.ssl') || process.env.DATABASE_SSL === 'true'
                        ? false
                        : false,

                    // TODO: Need to replace in Production
                    // ? {
                    //     rejectUnauthorized: process.env.DATABASE_SSL_REJECT_UNAUTHORIZED !== 'false',
                    //     ca: process.env.DATABASE_SSL_CA ? fs.readFileSync(process.env.DATABASE_SSL_CA).toString() : undefined
                    // }
                    // : false,
                    extra: {
                        max: Number(process.env.TYPEORM_POOL_MAX ?? 20),
                        min: Number(process.env.TYPEORM_POOL_MIN ?? 2),
                        idleTimeoutMillis: Number(process.env.TYPEORM_POOL_IDLE ?? 30000),
                        connectionTimeoutMillis: Number(process.env.TYPEORM_POOL_ACQUIRE ?? 60000),
                        // Removed statement_timeout - it was causing "canceling statement due to statement timeout"
                        // Services inside transactions may need longer than 30s
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
        ChatModule,
        KafkaModule,
        OfferingsOrderModule,
        InvoicesModule,
        PaymentsModule,
        UserFavouriteModule,
        NotificationsModule,
        UserFaqsModule,
        NewsfeedModule,
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
