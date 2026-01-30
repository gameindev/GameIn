import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
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

@Injectable()
export class OfferingsOrderService {
    constructor(
        
        private readonly postOfferingOrderProvider: PostOfferingOrderProvider,
        private readonly getOfferingOrderProvider: GetOfferingOrderProvider,

        @Inject(forwardRef(() => OfferingsService))
        private readonly offeringsService: OfferingsService,
        private readonly notificationEvents: NotificationEventsService,
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
                notificationType = NotificationType.ORDER_COMPLETED;
                title = 'Order Delivered';
                message = `Order "${orderTitle}" has been delivered`;
                notifyUser = order.brand; // Notify brand
                break;
            case OrderStatus.IN_PROGRESS:
                notificationType = NotificationType.ORDER_COMPLETED;
                title = 'Order In Progress';
                message = `Order "${orderTitle}" is now in progress`;
                notifyUser = order.brand; // Notify brand
                break;
            default:
                return; // Don't send notification for other status changes
        }

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
}
