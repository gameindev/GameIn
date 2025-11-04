import { BadRequestException, ConflictException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OfferingPrice } from '../offering-price.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateOfferingPriceDto } from '../dtos/post-offer-price.dto';
import { OfferingsService } from '../../providers/offerings.service';
import { OfferingStatus } from '../../enums/offering-status.enum';
import { OfferingsOrderService } from '@/offerings-order/providers/offerings-order.service';
import { OrderStatus } from '@/offerings-order/enums/order-status.enum';
import { PaymentProvider } from '../../enums/payment-provider.enum';

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
        const entity = repository.create({ ...dto, offering_id, total: total.toString() });

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



    async updatePrice(offeringId: number, dto: CreateOfferingPriceDto) {
        const offering = await this.offeringsService.findOne(offeringId);
        if (!offering || offering.adjustment_count >= 8 || offering.status === OfferingStatus.ACCEPTED) {
            throw new BadRequestException('Price adjustment not allowed');
        }

        // Get old price values before update for comparison
        const oldPrice = await this.repo.findOne({ where: { offering: { id: offeringId } } });
        const oldSubTotal = oldPrice?.price ? parseFloat(oldPrice.price) : 0;
        const oldFee = oldPrice?.platform_fee ? parseFloat(oldPrice.platform_fee) : 0;
        const oldTax = oldPrice?.tax ? parseFloat(oldPrice.tax) : 0;
        const oldTotal = oldPrice?.total ? parseFloat(oldPrice.total) : 0;

        let price = await this.repo.findOne({ where: { offering: { id: offeringId } } });
        if (price) {
            Object.assign(price, dto);
        } else {
            price = this.repo.create({ ...dto, offering });
        }
        await this.repo.save(price);

        // Reload to get updated values
        const updatedPrice = await this.repo.findOne({ where: { offering: { id: offeringId } } });
        const newSubTotal = updatedPrice?.price ? parseFloat(updatedPrice.price) : 0;
        const newFee = updatedPrice?.platform_fee ? parseFloat(updatedPrice.platform_fee) : 0;
        const newTax = updatedPrice?.tax ? parseFloat(updatedPrice.tax) : 0;
        const newTotal = updatedPrice?.total ? parseFloat(updatedPrice.total) : 0;

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

        offering.adjustment_count++;
        offering.last_adjusted_at = new Date();
        await this.offeringsService.saveOne(offering);

        return price;
    }

    /**
     * Get price by offering ID
     */
    async getPriceByOfferingId(offeringId: number): Promise<OfferingPrice | null> {
        return await this.repo.findOne({
            where: { offering: { id: offeringId } },
            relations: ['offering'],
        });
    }

    /**
     * Update payment provider for an offering
     */
    async updatePaymentProvider(offeringId: number, provider: PaymentProvider): Promise<OfferingPrice> {
        let price = await this.repo.findOne({ where: { offering: { id: offeringId } } });
        
        if (!price) {
            throw new BadRequestException(`No price found for offering ${offeringId}`);
        }

        price.payment_provider = provider;
        return await this.repo.save(price);
    }
}
