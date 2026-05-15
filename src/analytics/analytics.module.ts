import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { SocialMetricSnapshot } from '../social-integration/entities/social-metric-snapshot.entity';
import { SocialPostMetric } from '../social-integration/entities/social-post-metric.entity';
import { SocialAccountRollup } from '../social-integration/entities/social-account-rollup.entity';
import { Invoice } from '../invoices/invoice.entity';
import { UserFollow } from '../user-follow/user-follow.entity';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, SocialMetricSnapshot, SocialPostMetric, SocialAccountRollup, Invoice, UserFollow]),
    ],
    controllers: [AnalyticsController],
    providers: [AnalyticsService],
    exports: [AnalyticsService],
})
export class AnalyticsModule {}
