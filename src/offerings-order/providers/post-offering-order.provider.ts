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


@Injectable()
export class PostOfferingOrderProvider {
    constructor(
        @InjectRepository(OfferingOrder)
        private readonly repo: Repository<OfferingOrder>,

        @Inject(forwardRef(() => OfferingsService))
        private readonly offeringService: OfferingsService,
        private readonly userService: UsersService
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
        return this.repo.save(offeringOrder);
    }
}