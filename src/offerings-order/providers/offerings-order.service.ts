import { forwardRef, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { OfferingOrder } from '../offering-order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOfferingOrderDto } from '../dtos/post-offering-order.dto';
import { PostOfferingOrderProvider } from './post-offering-order.provider';
import { GetOfferingOrderProvider } from './get-offering-order.provider';
import { FindOfferingOrdersQueryDto } from '../dtos/get-offering-order.dto';
import { OrderStatus } from '../enums/order-status.enum';
import { OfferingsService } from '../../offerings/providers/offerings.service';
import { ActiveUserData } from '../../auth/interfaces/active-user-data.interface';
import { NotificationEventsService } from '../../notifications/providers/notification-events.service';
import { NotificationType } from '../../notifications/enums/notification-type.enum';
import { NotificationChannel } from '../../notifications/enums/notification-channel.enum';
import { OrderDeliveredRatingPromptService } from '../../sponsorship-feedback/order-delivered-rating-prompt.service';

@Injectable()
export class OfferingsOrderService {
    private readonly logger = new Logger(OfferingsOrderService.name);

    constructor(
        
        private readonly postOfferingOrderProvider: PostOfferingOrderProvider,
        private readonly getOfferingOrderProvider: GetOfferingOrderProvider,

        @Inject(forwardRef(() => OfferingsService))
        private readonly offeringsService: OfferingsService,
        private readonly notificationEvents: NotificationEventsService,
        private readonly orderDeliveredRatingPrompt: OrderDeliveredRatingPromptService,
    ) { }


    async createOfferingOrder(dto: CreateOfferingOrderDto, user: ActiveUserData) { 
        return this.postOfferingOrderProvider.createOfferingOrder(dto, user);
    }


    async getAllOfferingOrders(user: ActiveUserData, query: FindOfferingOrdersQueryDto) {
        return this.getOfferingOrderProvider.getAllOfferingOrders(user, query);
    }

    async getOfferingOrderById(id: number, user: ActiveUserData) {
        return this.getOfferingOrderProvider.getOfferingOrderById(id, user);
    }

    async getOfferingOrderByOfferingId(offeringId: number, userId: number) {
        return this.getOfferingOrderProvider.getOfferingOrderByOfferingId(offeringId, userId);
    }

    async findOne(id: number, relations: string[] = []) {
        const repo = this.getOfferingOrderProvider['repo'] as Repository<OfferingOrder>;
        return await repo.findOne({
            where: { id },
            relations: relations.length > 0 ? relations : ['brand', 'offering', 'creator'],
        });
    }

    async update(id: number, updateData: Partial<OfferingOrder>) {
        const repo = this.postOfferingOrderProvider['repo'] as Repository<OfferingOrder>;
        const order = await repo.findOne({ 
            where: { id },
            relations: ['brand', 'creator', 'offering'],
        });
        if (!order) {
            throw new NotFoundException(`Order with ID ${id} not found`);
        }
        
        const previousStatus = order.status;
        Object.assign(order, updateData);

        if (updateData.status === OrderStatus.PAID) {
            // Update offering status
            await this.offeringsService.sponsoreOfferings(order.offering_id, order.brand);
        }

        const savedOrder = await repo.save(order);

        // Send notification if status changed
        if (updateData.status && updateData.status !== previousStatus) {
            await this.sendOrderStatusUpdateNotification(savedOrder, previousStatus, updateData.status).catch((error) => {
                console.error('Failed to send order status update notification:', error);
            });
        }

        return savedOrder;
    }

    /**
     * Send notification when order status is updated
     */
    private async sendOrderStatusUpdateNotification(
        order: OfferingOrder,
        previousStatus: OrderStatus,
        newStatus: OrderStatus,
    ) {
        const orderTitle = order.title || 'Your order';
        let notificationType: NotificationType;
        let title: string;
        let message: string;
        let notifyUser: any; // User to notify

        switch (newStatus) {
            case OrderStatus.PAID:
                notificationType = NotificationType.ORDER_COMPLETED;
                title = 'Order Payment Received';
                message = `Payment received for order "${orderTitle}"`;
                notifyUser = order.creator; // Notify creator
                break;
            case OrderStatus.CANCELLED:
                notificationType = NotificationType.ORDER_CANCELLED;
                title = 'Order Cancelled';
                message = `Order "${orderTitle}" has been cancelled`;
                notifyUser = order.creator; // Notify creator
                break;
            case OrderStatus.DELIVERED:
                await this.orderDeliveredRatingPrompt.notifyBrandOnDelivered(order, previousStatus).catch((error) => {
                    console.error('Failed to send post-delivery rating prompt:', error);
                });
                return;
            case OrderStatus.IN_PROGRESS:
                notificationType = NotificationType.ORDER_COMPLETED;
                title = 'Order In Progress';
                message = `Order "${orderTitle}" is now in progress`;
                notifyUser = order.brand; // Notify brand
                break;
            default:
                return; // Don't send notification for other status changes
        }

        const dashboardUrl = process.env.FRONTEND_HOST || process.env.FRONTEND_URL || 'https://gamein.gg';

        await this.notificationEvents.publishNotification({
            userId: notifyUser.id,
            type: notificationType,
            channels: [NotificationChannel.IN_APP, NotificationChannel.EMAIL],
            title,
            message,
            data: {
                orderId: order.id,
                orderIdString: order.order_id,
                previousStatus,
                newStatus,
                orderTitle: order.title,
                total: order.total,
                currency: order.currency,
            },
            metadata: {
                email: notifyUser.email,
                emailTemplate: 'order-status-update',
                emailSubject: title,
                emailData: {
                    username: notifyUser?.username || notifyUser?.email || 'there',
                    orderTitle: order.title,
                    newStatus: String(newStatus),
                    orderIdString: order.order_id,
                    dashboardUrl,
                },
            },
            priority: 'normal',
        });
    }

    /**
     * Find all pending orders for a specific offering
     * Used to update orders when offering price changes
     */
    async findPendingOrdersByOfferingId(offeringId: number): Promise<OfferingOrder[]> {
        const repo = this.getOfferingOrderProvider['repo'] as Repository<OfferingOrder>;
        return await repo.find({
            where: {
                offering_id: offeringId,
                status: OrderStatus.PENDING_PAYMENT,
            },
        });
    }

    /**
     * Paid / in-progress orders whose linked offering `end_date` is in the past
     * (sponsorship window ended → eligible for auto-delivered + brand rating flow).
     */
    async findOrderIdsEligibleForAutoDeliver(): Promise<number[]> {
        const repo = this.getOfferingOrderProvider['repo'] as Repository<OfferingOrder>;
        const now = new Date();
        const orders = await repo
            .createQueryBuilder('oo')
            .innerJoin('oo.offering', 'off')
            .where('oo.status IN (:...statuses)', {
                statuses: [OrderStatus.PAID, OrderStatus.IN_PROGRESS],
            })
            .andWhere('off.end_date < :now', { now })
            .select(['oo.id'])
            .getMany();

        return orders.map((o) => o.id);
    }

    /**
     * Mark eligible orders as DELIVERED (runs from scheduler). Idempotent per order.
     */
    async autoDeliverOrdersPastOfferingEnd(): Promise<{ updated: number; failed: number }> {
        if (process.env.AUTO_DELIVER_SPONSORSHIPS === 'false') {
            this.logger.log('AUTO_DELIVER_SPONSORSHIPS=false — skipping auto-deliver job');
            return { updated: 0, failed: 0 };
        }

        const ids = await this.findOrderIdsEligibleForAutoDeliver();
        let updated = 0;
        let failed = 0;

        for (const id of ids) {
            try {
                await this.update(id, { status: OrderStatus.DELIVERED });
                updated += 1;
            } catch (err) {
                failed += 1;
                this.logger.warn(
                    `Auto-deliver failed for offering_order id=${id}: ${(err as Error)?.message}`,
                );
            }
        }

        if (updated > 0 || failed > 0) {
            this.logger.log(`Auto-deliver job: updated=${updated}, failed=${failed}`);
        }

        return { updated, failed };
    }
}
