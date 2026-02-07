import { Repository } from "typeorm";
import { OfferingOrder } from "../offering-order.entity";
import { OfferingsOrderService } from "./offerings-order.service";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateOfferingOrderDto } from "../dtos/post-offering-order.dto";
import { ForbiddenException, forwardRef, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { v4 as uuid } from 'uuid';
import { OrderStatus } from "../enums/order-status.enum";
import { OfferingsService } from "../../offerings/providers/offerings.service";
import { UsersService } from "../../users/providers/users.service";
import { ActiveUserData } from "../../auth/interfaces/active-user-data.interface";
import { UserType } from "../../users/enums/user-type.enums";
import { NotificationEventsService } from "../../notifications/providers/notification-events.service";
import { NotificationType } from "../../notifications/enums/notification-type.enum";
import { NotificationChannel } from "../../notifications/enums/notification-channel.enum";


@Injectable()
export class PostOfferingOrderProvider {
    constructor(
        @InjectRepository(OfferingOrder)
        private readonly repo: Repository<OfferingOrder>,

        @Inject(forwardRef(() => OfferingsService))
        private readonly offeringService: OfferingsService,
        private readonly userService: UsersService,
        private readonly notificationEvents: NotificationEventsService,
    ) { }
    

    async createOfferingOrder(dto: CreateOfferingOrderDto, user: ActiveUserData) {
        const offering = await this.offeringService.findOneById(dto.offering_id);
        if (!offering) {
            throw new NotFoundException('Offering not found');
        }

        const currentUser = await this.userService.getUserById(user.sub);
        const creator = await this.userService.getUserById(dto.creator_id);


        if (!creator) {
            throw new NotFoundException('Creator not found');
        }

        if (!currentUser) {
            throw new NotFoundException('User not found');
        }

        if (creator.user_type !== UserType.CREATOR) {
            throw new ForbiddenException('You are not authorized to create an offering order');
        }

        if (currentUser.user_type !== UserType.BRAND) {
            throw new ForbiddenException('You are not authorized to create an offering order for this user type');
        }

        const offeringOrder = this.repo.create({
            ...dto,
            order_id: `ORD-${uuid().slice(0, 18)}-${offering.id}`,
            offering,
            creator: creator,
            brand: currentUser,
            status: OrderStatus.PENDING_PAYMENT
        });
        const savedOrder = await this.repo.save(offeringOrder);

        // Notify creator about new order
        await this.sendOrderCreatedNotification(savedOrder, creator, currentUser, offering).catch((error) => {
            console.error('Failed to send order created notification:', error);
        });

        return savedOrder;
    }

    /**
     * Send notification when a new order is created
     */
    private async sendOrderCreatedNotification(
        order: OfferingOrder,
        creator: any,
        brand: any,
        offering: any,
    ) {
        const brandName = brand.username || brand.email || 'A brand';
        const dashboardUrl = process.env.FRONTEND_HOST || process.env.FRONTEND_URL || 'https://gamein.gg';

        await this.notificationEvents.publishNotification({
            userId: creator.id,
            type: NotificationType.ORDER_CREATED,
            channels: [NotificationChannel.IN_APP, NotificationChannel.EMAIL],
            title: 'New Order Received',
            message: `${brandName} has placed an order for "${order.title}"`,
            data: {
                orderId: order.id,
                orderIdString: order.order_id,
                brandId: brand.id,
                brandName: brandName,
                offeringId: offering.id,
                offeringTitle: order.title,
                total: order.total,
                currency: order.currency,
            },
            metadata: {
                email: creator.email,
                emailTemplate: 'order-created',
                emailSubject: `New Order: ${order.title}`,
                emailData: {
                    username: creator?.username || creator?.email || 'there',
                    orderTitle: order.title,
                    brandName,
                    total: String(order.total),
                    currency: order.currency,
                    dashboardUrl,
                },
            },
            priority: 'high',
        });
    }
}