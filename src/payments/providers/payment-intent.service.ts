import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentIntent } from '../payment-intent.entity';
import { CreatePaymentIntentDto } from '../dtos/create-payment-intent.dto';
import { UpdatePaymentIntentDto } from '../dtos/update-payment-intent.dto';
import { PaymentStatus } from '../enums/payment-status.enum';
import { InvoicesService } from '@/invoices/providers/invoices.service';
import { OfferingsOrderService } from '@/offerings-order/providers/offerings-order.service';

@Injectable()
export class PaymentIntentService {
    constructor(
        @InjectRepository(PaymentIntent)
        private readonly paymentIntentRepository: Repository<PaymentIntent>,
        private readonly invoicesService: InvoicesService,
        private readonly offeringsOrderService: OfferingsOrderService,
    ) {}

    /**
     * Create a new payment intent
     */
    async create(createDto: CreatePaymentIntentDto): Promise<PaymentIntent> {
        // Verify invoice exists
        const invoice = await this.invoicesService.findOne(createDto.invoice_id);
        
        // Verify order exists
        const order = await this.offeringsOrderService.findOne(createDto.order_id);
        
        // Verify invoice belongs to order
        if (invoice.order_id !== createDto.order_id) {
            throw new BadRequestException('Invoice does not belong to the specified order');
        }

        const paymentIntent = this.paymentIntentRepository.create({
            ...createDto,
            currency: createDto.currency || 'USD',
            status: PaymentStatus.REQUIRES_PAYMENT_METHOD,
        });

        return await this.paymentIntentRepository.save(paymentIntent);
    }

    /**
     * Find payment intent by ID
     */
    async findOne(id: number, relations: string[] = []): Promise<PaymentIntent> {
        const paymentIntent = await this.paymentIntentRepository.findOne({
            where: { id },
            relations,
        });

        if (!paymentIntent) {
            throw new NotFoundException(`Payment intent with ID ${id} not found`);
        }

        return paymentIntent;
    }

    /**
     * Find payment intent by order ID
     */
    async findByOrderId(orderId: number): Promise<PaymentIntent[]> {
        return await this.paymentIntentRepository.find({
            where: { order_id: orderId },
            relations: ['order', 'invoice', 'payments'],
        });
    }

    /**
     * Find payment intent by provider intent ID
     */
    async findByProviderIntentId(providerIntentId: string): Promise<PaymentIntent | null> {
        return await this.paymentIntentRepository.findOne({
            where: { provider_intent_id: providerIntentId },
            relations: ['order', 'invoice', 'payments'],
        });
    }

    /**
     * Update payment intent
     */
    async update(id: number, updateDto: UpdatePaymentIntentDto): Promise<PaymentIntent> {
        const paymentIntent = await this.findOne(id);
        Object.assign(paymentIntent, updateDto);
        return await this.paymentIntentRepository.save(paymentIntent);
    }

    /**
     * Update payment intent status
     */
    async updateStatus(id: number, status: PaymentStatus): Promise<PaymentIntent> {
        const paymentIntent = await this.findOne(id);
        paymentIntent.status = status;
        return await this.paymentIntentRepository.save(paymentIntent);
    }

    /**
     * Mark payment intent as succeeded
     */
    async markAsSucceeded(id: number): Promise<PaymentIntent> {
        return await this.updateStatus(id, PaymentStatus.SUCCEEDED);
    }

    /**
     * Mark payment intent as failed
     */
    async markAsFailed(id: number): Promise<PaymentIntent> {
        return await this.updateStatus(id, PaymentStatus.FAILED);
    }

    /**
     * Delete payment intent (soft delete)
     */
    async remove(id: number): Promise<void> {
        const paymentIntent = await this.findOne(id);
        await this.paymentIntentRepository.softRemove(paymentIntent);
    }
}

