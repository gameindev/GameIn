import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from '../payment.entity';
import { CreatePaymentDto } from '../dtos/create-payment.dto';
import { PaymentStatus } from '../enums/payment-status.enum';
import { PaymentIntentService } from './payment-intent.service';

@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(Payment)
        private readonly paymentRepository: Repository<Payment>,
        private readonly paymentIntentService: PaymentIntentService,
    ) {}

    /**
     * Create a new payment record
     */
    async create(createDto: CreatePaymentDto): Promise<Payment> {
        // Verify payment intent exists
        const paymentIntent = await this.paymentIntentService.findOne(createDto.payment_intent_id);

        // Verify amount doesn't exceed payment intent amount
        if (createDto.amount_captured > Number(paymentIntent.amount)) {
            throw new BadRequestException('Payment amount cannot exceed payment intent amount');
        }

        const payment = this.paymentRepository.create({
            ...createDto,
            currency: createDto.currency || paymentIntent.currency,
            status: createDto.status || PaymentStatus.PROCESSING,
            succeeded_at: createDto.succeeded_at ? new Date(createDto.succeeded_at) : null,
        });

        const savedPayment = await this.paymentRepository.save(payment);

        // Update payment intent status if payment succeeded
        if (savedPayment.status === PaymentStatus.SUCCEEDED) {
            await this.paymentIntentService.markAsSucceeded(paymentIntent.id);
        } else if (savedPayment.status === PaymentStatus.FAILED) {
            await this.paymentIntentService.markAsFailed(paymentIntent.id);
        }

        return savedPayment;
    }

    /**
     * Find payment by ID
     */
    async findOne(id: number, relations: string[] = []): Promise<Payment> {
        const payment = await this.paymentRepository.findOne({
            where: { id },
            relations,
        });

        if (!payment) {
            throw new NotFoundException(`Payment with ID ${id} not found`);
        }

        return payment;
    }

    /**
     * Find payment by provider payment ID
     */
    async findByProviderPaymentId(providerPaymentId: string): Promise<Payment | null> {
        return await this.paymentRepository.findOne({
            where: { provider_payment_id: providerPaymentId },
            relations: ['payment_intent', 'refunds'],
        });
    }

    /**
     * Find payments by payment intent ID
     */
    async findByPaymentIntentId(paymentIntentId: number): Promise<Payment[]> {
        return await this.paymentRepository.find({
            where: { payment_intent_id: paymentIntentId },
            relations: ['payment_intent', 'refunds'],
            order: { created_at: 'DESC' },
        });
    }

    /**
     * Update payment status
     */
    async updateStatus(id: number, status: PaymentStatus): Promise<Payment> {
        const payment = await this.findOne(id);
        payment.status = status;

        if (status === PaymentStatus.SUCCEEDED && !payment.succeeded_at) {
            payment.succeeded_at = new Date();
        }

        return await this.paymentRepository.save(payment);
    }

    /**
     * Mark payment as succeeded
     */
    async markAsSucceeded(id: number, receiptUrl?: string): Promise<Payment> {
        const payment = await this.findOne(id);
        payment.status = PaymentStatus.SUCCEEDED;
        payment.succeeded_at = new Date();
        
        if (receiptUrl) {
            payment.receipt_url = receiptUrl;
        }

        const savedPayment = await this.paymentRepository.save(payment);

        // Update payment intent status
        await this.paymentIntentService.markAsSucceeded(payment.payment_intent_id);

        return savedPayment;
    }

    /**
     * Mark payment as failed
     */
    async markAsFailed(id: number, failureCode?: string, failureMessage?: string): Promise<Payment> {
        const payment = await this.findOne(id);
        payment.status = PaymentStatus.FAILED;
        
        if (failureCode) {
            payment.failure_code = failureCode;
        }
        
        if (failureMessage) {
            payment.failure_message = failureMessage;
        }

        const savedPayment = await this.paymentRepository.save(payment);

        // Update payment intent status
        await this.paymentIntentService.markAsFailed(payment.payment_intent_id);

        return savedPayment;
    }

    /**
     * Delete payment (soft delete)
     */
    async remove(id: number): Promise<void> {
        const payment = await this.findOne(id);
        await this.paymentRepository.softRemove(payment);
    }
}

