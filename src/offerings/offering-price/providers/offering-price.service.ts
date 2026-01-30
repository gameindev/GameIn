import { BadRequestException, ConflictException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OfferingPrice } from '../offering-price.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateOfferingPriceDto } from '../dtos/post-offer-price.dto';
import { OfferingsService } from '../../providers/offerings.service';
import { OfferingStatus } from '../../enums/offering-status.enum';
import { PaymentProvider } from '../../enums/payment-provider.enum';
import { OfferingsOrderService } from '../../../offerings-order/providers/offerings-order.service';
import { isEqual } from 'lodash';
import { ActiveUserData } from '../../../auth/interfaces/active-user-data.interface';

@Injectable()
export class OfferingPriceService {
    constructor(
        @InjectRepository(OfferingPrice)
        private readonly repo: Repository<OfferingPrice>,

        @Inject(forwardRef(() => OfferingsService))
        private readonly offeringsService: OfferingsService,

        @Inject(forwardRef(() => OfferingsOrderService))
        private readonly offeringsOrderService: OfferingsOrderService,
    ) { }

    async create(offering_id: number, dto: CreateOfferingPriceDto, manager?: EntityManager): Promise<OfferingPrice> {
        if (!offering_id) {
            throw new BadRequestException('offering_id is required');
        }

        const repository = manager ? manager.getRepository(OfferingPrice) : this.repo;

        // Normalize types
        if (Number.isNaN(offering_id)) {
            throw new BadRequestException('offering_id must be a number');
        }


        // Calculate total as sum of price, platform_fee, and tax
        const price = dto.price ? Number(dto.price) : 0;
        const platform_fee = dto.platform_fee ? Number(dto.platform_fee) : 0;
        const tax = dto.tax ? Number(dto.tax) : 0;
        const total = tax;
        const entity = repository.create({ ...dto, offering_id, total: total.toString(), version: 1 });

        try {
            return await repository.save(entity);
        } catch (err: any) {
            // Postgres 23505; MySQL 1062/ER_DUP_ENTRY
            if (err?.code === '23505' || err?.code === 'ER_DUP_ENTRY' || err?.errno === 1062) {
                throw new ConflictException('Duplicate price detected (unique constraint violated).');
            }
            throw err;
        }
    }



    async updatePrice(offeringId: number, dto: CreateOfferingPriceDto, user?: ActiveUserData) {
        const offering = await this.offeringsService.findOne(offeringId);
        if (!offering || offering.adjustment_count >= 8 || offering.status === OfferingStatus.ACCEPTED) {
            throw new BadRequestException('Price adjustment not allowed');
        }

        // Get the latest version of price for comparison
        const existing = await this.repo.findOne({
            where: { offering_id: offeringId },
            order: {
                version: 'DESC',
                created_at: 'DESC',
            }
        });

        // Check if any price fields have changed
        const fieldsToCheck = ['price', 'platform_fee', 'tax', 'total', 'payment_provider'];
        const isChanged = fieldsToCheck.some(key => {
            const existingValue = existing?.[key];
            const newValue = dto[key];
            return !isEqual(existingValue, newValue);
        });

        // Only create a new version if there are actual changes
        if (existing && isChanged) {
            // Create a new version
            const newPrice = this.repo.create({
                ...existing,
                ...dto,
                id: undefined,
                version: existing.version + 1,
                updated_by_user_id: user?.sub,
            });
            await this.repo.save(newPrice);

            // Get old price values for order comparison
            const oldSubTotal = existing.price ? parseFloat(existing.price) : 0;
            const oldFee = existing.platform_fee ? parseFloat(existing.platform_fee) : 0;
            const oldTax = existing.tax ? parseFloat(existing.tax) : 0;
            const oldTotal = existing.total ? parseFloat(existing.total) : 0;

            // Get new price values
            const newSubTotal = newPrice.price ? parseFloat(newPrice.price) : 0;
            const newFee = newPrice.platform_fee ? parseFloat(newPrice.platform_fee) : 0;
            const newTax = newPrice.tax ? parseFloat(newPrice.tax) : 0;
            const newTotal = newPrice.total ? parseFloat(newPrice.total) : 0;

            // Check if price changed
            const priceChanged = 
                oldSubTotal !== newSubTotal ||
                oldFee !== newFee ||
                oldTax !== newTax ||
                oldTotal !== newTotal;

            // Update all pending orders for this offering when price changes
            if (priceChanged) {
                try {
                    // Get all pending orders for this offering
                    const pendingOrders = await this.offeringsOrderService.findPendingOrdersByOfferingId(offeringId);
                    
                    // Update each pending order with new price values
                    for (const order of pendingOrders) {
                        await this.offeringsOrderService.update(order.id, {
                            sub_total: newSubTotal,
                            fee: newFee,
                            tax: newTax,
                            total: newTotal,
                        });
                    }
                } catch (orderUpdateErr) {
                    // Non-critical: log but don't fail price update
                    console.error('Failed to update orders after price change:', orderUpdateErr);
                }
            }

            return newPrice;
        } else if (!existing) {
            // Create first version if no price exists
            const newPrice = this.repo.create({
                ...dto,
                offering_id: offeringId,
                version: 1,
                updated_by_user_id: user?.sub,
            });
            return await this.repo.save(newPrice);
        }

        // No changes detected, return existing price
        return existing;
    }

    /**
     * Get price by offering ID (returns latest version)
     */
    async getPriceByOfferingId(offeringId: number): Promise<OfferingPrice | null> {
        return await this.repo.findOne({
            where: { offering_id: offeringId },
            relations: ['offering'],
            order: {
                version: 'DESC',
                created_at: 'DESC',
            }
        });
    }

    /**
     * Update payment provider for an offering (creates new version)
     */
    async updatePaymentProvider(offeringId: number, provider: PaymentProvider, user?: ActiveUserData): Promise<OfferingPrice> {
        const existing = await this.repo.findOne({
            where: { offering_id: offeringId },
            order: {
                version: 'DESC',
                created_at: 'DESC',
            }
        });
        
        if (!existing) {
            throw new BadRequestException(`No price found for offering ${offeringId}`);
        }

        // Create new version with updated payment provider
        const newPrice = this.repo.create({
            ...existing,
            payment_provider: provider,
            id: undefined,
            version: existing.version + 1,
            updated_by_user_id: user?.sub,
        });
        return await this.repo.save(newPrice);
    }
}
