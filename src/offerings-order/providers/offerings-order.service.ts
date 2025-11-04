import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { OfferingOrder } from '../offering-order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOfferingOrderDto } from '../dtos/post-offering-order.dto';
import { ActiveUserData } from '@/auth/interfaces/active-user-data.interface';
import { PostOfferingOrderProvider } from './post-offering-order.provider';
import { GetOfferingOrderProvider } from './get-offering-order.provider';
import { FindOfferingOrdersQueryDto } from '../dtos/get-offering-order.dto';
import { OrderStatus } from '../enums/order-status.enum';
import { OfferingsService } from '@/offerings/providers/offerings.service';

@Injectable()
export class OfferingsOrderService {
    constructor(
        
        private readonly postOfferingOrderProvider: PostOfferingOrderProvider,
        private readonly getOfferingOrderProvider: GetOfferingOrderProvider,

        @Inject(forwardRef(() => OfferingsService))
        private readonly offeringsService: OfferingsService,

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
        const order = await repo.findOne({ where: { id } });
        if (!order) {
            throw new NotFoundException(`Order with ID ${id} not found`);
        }
        Object.assign(order, updateData);


        if (updateData.status === OrderStatus.PAID) {
            // Update offering status
            await this.offeringsService.sponsoreOfferings(order.offering_id, order.brand);
        }


        return await repo.save(order);
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
