import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenvFlow from 'dotenv-flow';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

// Entities
import { User } from './users/user.entity';
import { CreatorProfile } from './creator-profiles/creator-profile.entity';
import { BrandProfile } from './brand-profiles/brand-profile.entity';
import { UserBio } from './users-bio/user-bio.entity';
import { PreferredGames } from './preferred-games/preferred-games.entity';
import { SocialIntegration } from './social-integration/entities/social-integration.entity';
import { UploadEntity } from './uploads/upload.entity';
import { ProfileView } from './views/views.entity';
import { UserFollow } from './user-follow/user-follow.entity';
import { Offering } from './offerings/offerings.entity';
import { OfferingOffers } from './offerings/offering-offers/offering-offers.entity';
import { OfferingPrice } from './offerings/offering-price/offering-price.entity';
import { Team } from './teams/teams.entity';
import { TeamMembers } from './teams/team-members/team-members.entity';
import { TeamLinks } from './teams/team-links/team-links.entity';
import { ConversationEntity } from './chat/chat.entity';
import { ConversationParticipantEntity } from './chat/conversation-participant.entity';
import { MessageEntity } from './chat/message.entity';
import { MessageReceiptEntity } from './chat/message-receipt.entity';
import { OfferingOrder } from './offerings-order/offering-order.entity';
import { PaymentIntent } from './payments/payment-intent.entity';
import { Payment } from './payments/payment.entity';
import { PaymentRefund } from './payments/payment-refund.entity';
import { Invoice } from './invoices/invoice.entity';
import { UserFavourite } from './user-favourite/user-favourite.entity';
import { NotificationEntity } from './notifications/entities/notification.entity';
import { NotificationPreferenceEntity } from './notifications/entities/notification-preference.entity';
import { UserFaq } from './user-faqs/user-faq.entity';
import { Post } from './newsfeed/entities/post.entity';
import { PostMedia } from './newsfeed/entities/post-media.entity';
import { PostLike } from './newsfeed/entities/post-like.entity';
import { PostComment } from './newsfeed/entities/post-comment.entity';
import { PostShare } from './newsfeed/entities/post-share.entity';
import { SocialPostMetric } from './social-integration/entities/social-post-metric.entity';
import { SocialAccountRollup } from './social-integration/entities/social-account-rollup.entity';
import { SocialSyncJob } from './social-integration/entities/social-sync-job.entity';
import { SocialMetricSnapshot } from './social-integration/entities/social-metric-snapshot.entity';
import { SocialAudienceSnapshot } from './social-integration/entities/social-audience-snapshot.entity';

// ✅ Load environment variables for local/dev
if (process.env.NODE_ENV !== 'production') { 
    dotenvFlow.config();
}

// ✅ Build DB connection settings
const isProduction = process.env.NODE_ENV === 'production';

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT ?? '5432', 10),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'gamein_db',
    schema: 'public',

    // 🧩 Entities
    entities: [
        User,
        UploadEntity,
        CreatorProfile,
        BrandProfile,
        UserBio,
        SocialIntegration,
        PreferredGames,
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
        SocialPostMetric,
        SocialAccountRollup,
        SocialSyncJob,
        SocialMetricSnapshot,
        SocialAudienceSnapshot,
    ],

    // 🧱 Migrations
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],

    // ⚙️ Logging — quieter in production
    logging: isProduction ? ['error', 'warn'] : ['error', 'query', 'warn'],
    logger: 'advanced-console',

    // ❌ Never auto-sync in production (use migrations)
    synchronize: false,

    namingStrategy: new SnakeNamingStrategy(),

    // 🛡️ SSL (DigitalOcean Managed PostgreSQL often requires this)
    // ssl: false,
    ssl: isProduction
        ? {
            rejectUnauthorized: false, // required for DO managed DBs
        }
        : false,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
