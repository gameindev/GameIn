import { InjectRepository } from "@nestjs/typeorm";
import { OfferingOrder } from "../offering-order.entity";
import { Repository } from "typeorm";
import { ForbiddenException, forwardRef, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { FindOfferingOrdersQueryDto } from "../dtos/get-offering-order.dto";
import { OfferingsService } from "../../offerings/providers/offerings.service";
import { UsersService } from "../../users/providers/users.service";
import { ActiveUserData } from "../../auth/interfaces/active-user-data.interface";
import { UserType } from "../../users/enums/user-type.enums";


@Injectable()
export class GetOfferingOrderProvider {
    constructor(
        @InjectRepository(OfferingOrder)
        private readonly repo: Repository<OfferingOrder>,

        @Inject(forwardRef(() => OfferingsService))
        private readonly offeringService: OfferingsService,
        private readonly userService: UsersService
    ) { }

    async getAllOfferingOrders(user: ActiveUserData, query: FindOfferingOrdersQueryDto) {
        const {
            page = 1,
            limit = 20,
            creator_id,
            brand_id,
            offering_id,
            status,
            created_at,
            updated_at,
            deleted_at,
            order_id,
            relations = [],
        } = query;

        // Always get the latest user info
        const currentUser = await this.userService.getUserById(user.sub);
        if (!currentUser) {
            throw new NotFoundException('User not found');
        }

        if (currentUser.user_type !== UserType.BRAND) {
            throw new ForbiddenException('You are not authorized to get all offering orders for this user type');
        }

        // Build query
        const where: any = {
            brand: { id: user.sub }
        };

        if (creator_id)  where.creator = { id: creator_id };
        if (brand_id)    where.brand = { id: brand_id };
        if (offering_id) where.offering = { id: offering_id };
        if (status)      where.status = status;
        if (created_at)  where.created_at = created_at;
        if (updated_at)  where.updated_at = updated_at;
        if (deleted_at)  where.deleted_at = deleted_at;
        if (order_id)    where.order_id = order_id;

        // Merge default and requested relations
        const baseRelations = ['brand', 'offering', 'creator'];
        let finalRelations = baseRelations;
        if (Array.isArray(relations) && relations.length > 0) {
            finalRelations = Array.from(new Set([...baseRelations, ...relations]));
        }

        const [offeringOrders, total] = await this.repo.findAndCount({
            where,
            relations: finalRelations,
            skip: (page - 1) * limit,
            take: limit,
            order: { created_at: 'DESC' }
        });

        return {
            data: offeringOrders,
            total: total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }

    

    async getOfferingOrderById(id: number, user: ActiveUserData) {
        const currentUser = await this.userService.getUserById(user.sub);

        if (!currentUser) {
            throw new NotFoundException('User not found');
        }

        if (currentUser.user_type !== UserType.BRAND) {
            throw new ForbiddenException('You are not authorized to get an offering order for this user type');
        }

        const offeringOrder = await this.repo.findOne({ where: { id }, relations: ['brand', 'offering'] });
        if (!offeringOrder) {
            throw new NotFoundException('Offering order not found');
        }
        if (offeringOrder.brand.id !== currentUser.id) {
            throw new ForbiddenException('You are not authorized to get this offering order');
        }
        return offeringOrder;
    }



    async getOfferingOrderByOfferingId(offeringId: number, userId: number) {
        const currentUser = await this.userService.getUserById(userId);
        if (!currentUser) {
            throw new NotFoundException('User not found');
        }
        if (currentUser.user_type !== UserType.BRAND) {
            throw new ForbiddenException('You are not authorized to get an offering order for this user type');
        }
        const offeringOrder = await this.repo.findOne({ where: { offering: { id: offeringId }, brand: { id: currentUser.id } } });
        return offeringOrder;
    }
}