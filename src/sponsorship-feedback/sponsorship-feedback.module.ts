import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SponsorshipFeedback } from './sponsorship-feedback.entity';
import { OfferingOrder } from '../offerings-order/offering-order.entity';
import { CreatorProfile } from '../creator-profiles/creator-profile.entity';
import { SponsorshipFeedbackService } from './sponsorship-feedback.service';
import { SponsorshipFeedbackController } from './sponsorship-feedback.controller';
import { OrderDeliveredRatingPromptService } from './order-delivered-rating-prompt.service';
import { ChatModule } from '../chat/chat.module';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([SponsorshipFeedback, OfferingOrder, CreatorProfile]),
        ChatModule,
        NotificationsModule,
    ],
    controllers: [SponsorshipFeedbackController],
    providers: [SponsorshipFeedbackService, OrderDeliveredRatingPromptService],
    exports: [SponsorshipFeedbackService, OrderDeliveredRatingPromptService],
})
export class SponsorshipFeedbackModule {}
