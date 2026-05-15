import { Injectable, Logger } from '@nestjs/common';
import { OfferingOrder } from '../offerings-order/offering-order.entity';
import { OrderStatus } from '../offerings-order/enums/order-status.enum';
import { NotificationEventsService } from '../notifications/providers/notification-events.service';
import { NotificationType } from '../notifications/enums/notification-type.enum';
import { NotificationChannel } from '../notifications/enums/notification-channel.enum';
import { ChatService } from '../chat/providers/chat.service';
import { MessageType } from '../chat/enum/message-type.enum';

/**
 * When an offering order moves to DELIVERED, prompts the brand to rate the creator
 * via in-app notification (with deep link) and an inbox message sent as the creator.
 */
@Injectable()
export class OrderDeliveredRatingPromptService {
    private readonly logger = new Logger(OrderDeliveredRatingPromptService.name);

    constructor(
        private readonly notificationEvents: NotificationEventsService,
        private readonly chatService: ChatService,
    ) {}

    private frontendBase(): string {
        const raw = process.env.FRONTEND_HOST || process.env.FRONTEND_URL || 'https://gamein.gg';
        return raw.replace(/\/+$/, '');
    }

    /**
     * Fire rating prompt when order becomes DELIVERED (terminal sponsorship completion from the brand's perspective).
     */
    async notifyBrandOnDelivered(order: OfferingOrder, previousStatus: OrderStatus): Promise<void> {
        if (order.status !== OrderStatus.DELIVERED || previousStatus === OrderStatus.DELIVERED) {
            return;
        }
        const brand = order.brand;
        const creator = order.creator;
        if (!brand?.id || !creator?.id) {
            this.logger.warn(`Order ${order.id} missing brand or creator; skip rating prompt`);
            return;
        }

        const base = this.frontendBase();
        const actionUrl = `${base}/#/feedback?orderId=${order.id}`;
        const orderTitle = order.title || 'Your order';

        await this.notificationEvents.publishNotification({
            userId: brand.id,
            type: NotificationType.CREATOR_RATING_REQUEST,
            channels: [NotificationChannel.IN_APP, NotificationChannel.EMAIL],
            title: 'Sponsorship completed — rate this creator',
            message: `Your order "${orderTitle}" has been delivered. Please rate your experience with the creator for this opportunity.`,
            data: {
                orderId: order.id,
                orderIdString: order.order_id,
                offeringId: order.offering_id,
                creatorId: order.creator_id,
                actionUrl,
            },
            metadata: {
                email: brand.email,
                emailTemplate: 'order-status-update',
                emailSubject: 'Sponsorship completed',
                emailData: {
                    username: brand?.username || brand?.email || 'there',
                    orderTitle,
                    newStatus: String(OrderStatus.DELIVERED),
                    orderIdString: order.order_id,
                    dashboardUrl: base,
                },
            },
            priority: 'normal',
        });

        const msgText = `Thanks for sponsoring "${orderTitle}" — this collaboration is marked as delivered on GameIn. When you have a moment, please rate how things went from your side (it only takes a minute).`;
        try {
            await this.chatService.sendMessageToUserDirect(
                creator.id,
                brand.id,
                msgText,
                {
                    type: MessageType.TEXT,
                    json_data: {
                        kind: 'creator_rating_prompt',
                        orderId: order.id,
                        offeringId: order.offering_id,
                        offeringTitle: orderTitle,
                        feedbackPath: `/feedback?orderId=${order.id}`,
                    },
                    client_msg_id: `rating-prompt-order-${order.id}`,
                },
            );
        } catch (e) {
            this.logger.error(`Failed to send rating prompt inbox message for order ${order.id}`, e as any);
        }
    }
}
