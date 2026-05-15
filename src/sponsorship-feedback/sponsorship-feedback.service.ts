import {
    BadRequestException,
    ConflictException,
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SponsorshipFeedback } from './sponsorship-feedback.entity';
import { OfferingOrder } from '../offerings-order/offering-order.entity';
import { OrderStatus } from '../offerings-order/enums/order-status.enum';
import { SubmitSponsorshipFeedbackDto } from './dto/submit-sponsorship-feedback.dto';
import { SPONSORSHIP_FEEDBACK_CRITERIA } from './sponsorship-feedback.constants';
import { UserType } from '../users/enums/user-type.enums';
import { ChatService } from '../chat/providers/chat.service';
import { NotificationEventsService } from '../notifications/providers/notification-events.service';
import { NotificationType } from '../notifications/enums/notification-type.enum';
import { NotificationChannel } from '../notifications/enums/notification-channel.enum';
import { MessageType } from '../chat/enum/message-type.enum';
import { CreatorProfile } from '../creator-profiles/creator-profile.entity';
import {
    aggregateCanonicalCriterionAverages,
    certificationPointsFromScoresJson,
    computeCertificationLevel,
} from './creator-certification.util';

@Injectable()
export class SponsorshipFeedbackService {
    constructor(
        @InjectRepository(SponsorshipFeedback)
        private readonly feedbackRepo: Repository<SponsorshipFeedback>,
        @InjectRepository(OfferingOrder)
        private readonly orderRepo: Repository<OfferingOrder>,
        @InjectRepository(CreatorProfile)
        private readonly creatorProfileRepo: Repository<CreatorProfile>,
        private readonly chatService: ChatService,
        private readonly notificationEvents: NotificationEventsService,
    ) {}

    private validateScores(scores: Record<string, number>): Record<string, number> {
        const out: Record<string, number> = {};
        for (const key of SPONSORSHIP_FEEDBACK_CRITERIA) {
            const v = scores[key];
            if (typeof v !== 'number' || Number.isNaN(v) || v < 1 || v > 5 || !Number.isInteger(v)) {
                throw new BadRequestException(`Invalid score for "${key}" (expected integer 1–5)`);
            }
            out[key] = v;
        }
        for (const k of Object.keys(scores)) {
            if (!SPONSORSHIP_FEEDBACK_CRITERIA.includes(k as any)) {
                throw new BadRequestException(`Unknown criterion: ${k}`);
            }
        }
        return out;
    }

    private computeAverage(scores: Record<string, number>): number {
        const vals = SPONSORSHIP_FEEDBACK_CRITERIA.map((c) => scores[c]);
        const sum = vals.reduce((a, b) => a + b, 0);
        return Math.round((sum / vals.length) * 100) / 100;
    }

    async getOrderContextForBrand(orderId: number, brandUserId: number) {
        const order = await this.orderRepo.findOne({
            where: { id: orderId },
            relations: ['creator', 'offering'],
        });
        if (!order) {
            throw new NotFoundException('Order not found');
        }
        if (order.brand_id !== brandUserId) {
            throw new ForbiddenException('You cannot view feedback for this order');
        }
        if (order.status !== OrderStatus.DELIVERED) {
            throw new BadRequestException(
                'Feedback is only available after the sponsorship has been marked as delivered',
            );
        }
        const existing = await this.feedbackRepo.findOne({
            where: { offering_order_id: orderId },
        });
        return {
            offering_order_id: order.id,
            order_title: order.title,
            creator_username: order.creator?.username ?? null,
            offering_id: order.offering_id,
            already_submitted: !!existing,
        };
    }

    async submit(dto: SubmitSponsorshipFeedbackDto, brandUserId: number) {
        const order = await this.orderRepo.findOne({
            where: { id: dto.offering_order_id },
            relations: ['brand', 'creator'],
        });
        if (!order) {
            throw new NotFoundException('Order not found');
        }
        if (order.brand_id !== brandUserId) {
            throw new ForbiddenException('Only the sponsoring brand can submit this feedback');
        }
        if (order.status !== OrderStatus.DELIVERED) {
            throw new BadRequestException('Feedback can only be submitted for delivered orders');
        }
        if (!order.brand || order.brand.user_type !== UserType.BRAND) {
            throw new ForbiddenException('Only brand accounts can submit sponsorship feedback');
        }

        const dup = await this.feedbackRepo.findOne({
            where: { offering_order_id: dto.offering_order_id },
        });
        if (dup) {
            throw new ConflictException('Feedback has already been submitted for this order');
        }

        const scores = this.validateScores(dto.scores);
        const average = this.computeAverage(scores);

        const row = this.feedbackRepo.create({
            offering_order_id: order.id,
            offering_id: order.offering_id,
            brand_user_id: brandUserId,
            creator_user_id: order.creator_id,
            scores,
            average_score: average as any,
        });
        await this.feedbackRepo.save(row);

        await this.refreshCreatorCertification(order.creator_id).catch((err) => {
            console.error('refreshCreatorCertification failed:', err);
        });

        await this.afterBrandRatingSubmitted(order, average).catch((err) => {
            console.error('afterBrandRatingSubmitted failed:', err);
        });

        return {
            id: row.id,
            offering_order_id: row.offering_order_id,
            average_score: average,
        };
    }

    /**
     * Mark inbox rating CTA complete, notify creator in-app, and send them a chat line from the brand.
     */
    private async afterBrandRatingSubmitted(order: OfferingOrder, averageScore: number): Promise<void> {
        await this.chatService.markRatingPromptSubmitted(order.id);

        const orderTitle = order.title || 'Sponsorship';
        const brandName = order.brand?.username || order.brand?.email || 'A brand';

        await this.notificationEvents.publishNotification({
            userId: order.creator_id,
            type: NotificationType.CUSTOM,
            channels: [NotificationChannel.IN_APP],
            title: 'Sponsorship feedback received',
            message: `${brandName} submitted ratings for "${orderTitle}" (overall ${averageScore}/5).`,
            data: {
                orderId: order.id,
                offeringTitle: orderTitle,
                brandUsername: order.brand?.username,
                averageScore: averageScore,
            },
            metadata: {},
            priority: 'normal',
        });

        const inboxLine = `${brandName} has submitted sponsorship feedback for "${orderTitle}" (overall ${averageScore}/5). Thank you for the collaboration.`;
        await this.chatService.sendMessageToUserDirect(order.brand_id, order.creator_id, inboxLine, {
            type: MessageType.TEXT,
            json_data: {
                kind: 'brand_rating_complete',
                orderId: order.id,
                offeringTitle: orderTitle,
                average_rating: averageScore,
            },
            client_msg_id: `rating-complete-order-${order.id}`,
        });
    }

    /**
     * Aggregated ratings from all brands who submitted sponsorship feedback for this creator.
     */
    async getCreatorRatingAggregate(creatorUserId: number) {
        const rows = await this.feedbackRepo.find({
            where: { creator_user_id: creatorUserId },
            select: ['id', 'scores', 'average_score'],
        });

        if (!rows.length) {
            return {
                review_count: 0,
                overall_average: null as number | null,
                by_criterion: null as Record<string, number> | null,
            };
        }

        const byCriterion = aggregateCanonicalCriterionAverages(rows);

        const overallSum = rows.reduce((acc, r) => acc + Number(r.average_score), 0);
        const overall_average = Math.round((overallSum / rows.length) * 100) / 100;

        return {
            review_count: rows.length,
            overall_average,
            by_criterion: byCriterion,
        };
    }

    /**
     * Recompute cumulative certification points and certification level (creator_profile.rank) from DB.
     */
    async refreshCreatorCertification(creatorUserId: number): Promise<void> {
        const rows = await this.feedbackRepo.find({
            where: { creator_user_id: creatorUserId },
            select: ['scores'],
        });

        let totalPoints = 0;
        for (const r of rows) {
            totalPoints += certificationPointsFromScoresJson(r.scores || {});
        }
        totalPoints = Math.round(totalPoints * 100) / 100;

        const deliveredDeals = await this.orderRepo.count({
            where: { creator_id: creatorUserId, status: OrderStatus.DELIVERED },
        });

        const byCriterion = rows.length
            ? aggregateCanonicalCriterionAverages(rows)
            : ({} as ReturnType<typeof aggregateCanonicalCriterionAverages>);

        const level = computeCertificationLevel(totalPoints, deliveredDeals, byCriterion);

        const profile = await this.creatorProfileRepo.findOne({
            where: { user: { id: creatorUserId } },
        });
        if (!profile) {
            return;
        }

        await this.creatorProfileRepo.update(
            { id: profile.id },
            {
                certification_points: totalPoints,
                rank: level,
            },
        );
    }
}
