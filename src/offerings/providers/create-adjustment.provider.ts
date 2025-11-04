
import { BadRequestException, ConflictException, ForbiddenException, forwardRef, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Offering } from '../offerings.entity';
import { Repository } from 'typeorm';
import { PatchOfferingBundleDto } from '../dtos/patch-offering-bundle.dto';
import { OfferingOffersService } from '../offering-offers/providers/offering-offers.service';
import { UploadsService } from '../../uploads/providers/uploads.service';
import { ActiveUserData } from '../../auth/interfaces/active-user-data.interface';
import { UserType } from '../../users/enums/user-type.enums';
import { ChatService } from '@/chat/providers/chat.service';
import { MessageType } from '@/chat/enum/message-type.enum';
import { OfferingsOrderService } from '@/offerings-order/providers/offerings-order.service';
import { OrderStatus } from '@/offerings-order/enums/order-status.enum';
import { UploadEntity } from '../../uploads/upload.entity';

@Injectable()
export class CreateAdjustmentProvider {
    constructor(
        @InjectRepository(Offering)
        private readonly repo: Repository<Offering>,
        private readonly offeringOffersService: OfferingOffersService,
        private readonly uploadService: UploadsService,
        private readonly chatService: ChatService,
        private readonly offeringsOrderService: OfferingsOrderService,
    ) { }

    async createAdjustment(dto: PatchOfferingBundleDto, logo?: Express.Multer.File, user?: ActiveUserData) {
        const offeringId = dto.offering.id;
        const offering = await this.findExistingOffering(offeringId);

        const isOwner = user?.sub === offering.user?.id;
        const isBrand = user?.user_type === UserType.BRAND;

        if (!user) {
            throw new ForbiddenException('Authentication required');
        }

        if (!isOwner && !isBrand) {
            throw new ForbiddenException('You are not authorized to adjust this offering');
        }

        let newLogoUpload: UploadEntity | null = null;
        const oldLogoUpload = offering.logo;

        if (logo) {
            try {
                newLogoUpload = await this.uploadService.uploadNew(logo);
                offering.logo = newLogoUpload;
            } catch (uploadErr) {
                throw new InternalServerErrorException(`Failed to upload logo: ${uploadErr.message}`);
            }
        }

        if (dto.offering.notes !== undefined) {
            offering.notes = dto.offering.notes;
        }

        if (dto.offering.status) {
            offering.status = dto.offering.status;
        }

        await this.repo.save(offering);

        if (dto.offering.offers?.length) {
            await this.offeringOffersService.adjustOffers(offering, dto.offering.offers, user);
        }

        // Reload offering with latest price after any updates
        const updatedOffering = await this.repo.findOne({
            where: { id: offering.id },
            relations: ['offering_offers', 'offering_price'],
        });

        let updated = null;
        let brandOrderCreated = false;
        if (isBrand) {
            const existingOrder = await this.offeringsOrderService.getOfferingOrderByOfferingId(offering.id, user.sub);
            if (existingOrder) {
                // If order exists, check if price has changed and update order if needed
                // Only update order if it's still pending payment (can't change paid orders)
                if (existingOrder.status === OrderStatus.PENDING_PAYMENT && updatedOffering?.offering_price) {
                    const newSubTotal = updatedOffering.offering_price?.price ? parseFloat(updatedOffering.offering_price.price) : 0;
                    const newFee = updatedOffering.offering_price?.platform_fee ? parseFloat(updatedOffering.offering_price.platform_fee) : 0;
                    const newTax = updatedOffering.offering_price?.tax ? parseFloat(updatedOffering.offering_price.tax) : 0;
                    const newTotal = updatedOffering.offering_price?.total ? parseFloat(updatedOffering.offering_price.total) : 0;

                    // Check if any price field has changed
                    const priceChanged = 
                        Number(existingOrder.sub_total) !== newSubTotal ||
                        Number(existingOrder.fee) !== newFee ||
                        Number(existingOrder.tax) !== newTax ||
                        Number(existingOrder.total) !== newTotal;

                    if (priceChanged) {
                        // Update order with new price values
                        await this.offeringsOrderService.update(existingOrder.id, {
                            sub_total: newSubTotal,
                            fee: newFee,
                            tax: newTax,
                            total: newTotal,
                        });
                    }
                }

                // Return the latest offering state
                updated = await this.repo.findOne({
                    where: { id: offering.id },
                    relations: ['offering_offers'],
                });

                // Proceed with non-critical cleanup and chat handling, but skip order creation
            } else {
                
                await this.offeringsOrderService.createOfferingOrder({
                    offering_id: offering.id,
                    title: offering.title,
                    type: offering.type, 
                    currency: 'USD',
                    sub_total: offering.offering_price?.price ? parseFloat(offering.offering_price.price) : 0,
                    fee: offering.offering_price?.platform_fee ? parseFloat(offering.offering_price.platform_fee) : 0,
                    tax: offering.offering_price?.tax ? parseFloat(offering.offering_price.tax) : 0,
                    total: offering.offering_price?.total ? parseFloat(offering.offering_price.total)  : 0,
                    notes: offering.notes,
                    creator_id: offering.user.id,
                    brand_id: user.sub,
                    status: OrderStatus.PENDING_PAYMENT,
                }, user); 

                brandOrderCreated = true;
                updated = await this.repo.findOne({
                    where: { id: offering.id },
                    relations: ['offering_offers'],
                });

                if (!updated) {
                    throw new InternalServerErrorException('Failed to reload updated offering');
                }
            }

            if (oldLogoUpload && newLogoUpload) {
                setImmediate(async () => {
                    try {
                        await this.uploadService.deleteUpload(oldLogoUpload);
                    } catch (deleteErr) {
                        console.error('Failed to delete old logo (non-critical):', deleteErr);
                    }
                });
            }

            try {
                const finalOffering = await this.repo.findOne({
                    where: { id: offering.id },
                    relations: ['user'],
                });

                if (finalOffering) {
                    await this.chatService.sendMessageToUserDirect(
                        user.sub,
                        finalOffering.user.id,
                        `Offer ${finalOffering.title} has been adjusted by ${user.user_type}`,
                        {
                            type: MessageType.DOCUMENT,
                            json_data: {
                                offering_id: finalOffering.id,
                                offering_title: finalOffering.title,
                                offering_status: finalOffering.status,
                            }
                        }
                    );
                }
            } catch (msgErr) {
                console.error('Failed to send chat message after adjustment:', msgErr);
            }

            // Always return updated even if order already exists
            return updated;
        } 

        // For non-brand adjustments, still return the most recent offering
        return await this.repo.findOne({
            where: { id: offering.id },
            relations: ['offering_offers'],
        });
    }

    private async findExistingOffering(id: number): Promise<Offering> {
        const offering = await this.repo.findOne({ where: { id }, relations: ['user', 'offering_price'] });
        if (!offering) throw new NotFoundException(`Offering with ID ${id} not found`);
        return offering;
    }

}
