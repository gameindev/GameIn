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

        const currentUser = await this.userService.getUserById(user.sub);
        if (!currentUser) {
            throw new NotFoundException('User not found');
        }

        if (currentUser.user_type !== UserType.BRAND && currentUser.user_type !== UserType.CREATOR) {
            throw new ForbiddenException('Only brands and creators can fetch offering orders');
        }

        const userId = Number(user.sub);
        if (!Number.isInteger(userId) || userId < 1) {
            throw new ForbiddenException('Invalid user context');
        }

        // Base filter: BRAND sees orders where they are the brand; CREATOR sees orders where they are the creator
        const where: Record<string, unknown> = {};
        if (currentUser.user_type === UserType.BRAND) {
            where.brand_id = userId;
        } else {
            where.creator_id = userId;
        }

        // Optional filters: BRAND can filter by creator_id; CREATOR can filter by brand_id
        if (currentUser.user_type === UserType.BRAND && creator_id != null) where.creator_id = Number(creator_id);
        if (currentUser.user_type === UserType.CREATOR && brand_id != null) where.brand_id = Number(brand_id);
        if (offering_id != null) where.offering_id = Number(offering_id);
        if (status) where.status = status;
        if (created_at) where.created_at = created_at;
        if (updated_at) where.updated_at = updated_at;
        if (deleted_at) where.deleted_at = deleted_at;
        if (order_id) where.order_id = order_id;

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

        if (currentUser.user_type !== UserType.BRAND && currentUser.user_type !== UserType.CREATOR) {
            throw new ForbiddenException('Only brands and creators can fetch an offering order');
        }

        const offeringOrder = await this.repo.findOne({
            where: { id },
            relations: ['brand', 'offering', 'creator'],
        });
        if (!offeringOrder) {
            throw new NotFoundException('Offering order not found');
        }

        const isBrand = offeringOrder.brand_id === currentUser.id;
        const isCreator = offeringOrder.creator_id === currentUser.id;
        if (!isBrand && !isCreator) {
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