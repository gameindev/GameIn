import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import * as dotenvFlow from 'dotenv-flow';
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
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

// This loads your .env files just like in your main app
dotenvFlow.config();

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    schema: "public",
    logging: ['error', 'query', 'warn'],
    logger: 'advanced-console',
    // You MUST list all your entities here for the CLI to find them
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
        TeamLinks
    ],
    // This tells TypeORM where to find and create migration files
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],

    // Set synchronize to false for migrations
    synchronize: false,
    namingStrategy: new SnakeNamingStrategy(),
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;

