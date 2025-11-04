import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentRefund } from '../payment-refund.entity';
import { CreateRefundDto } from '../dtos/create-refund.dto';
import { RefundStatus } from '../enums/refund-status.enum';
import { PaymentService } from './payment.service';

@Injectable()
export class PaymentRefundService {
    constructor(
        @InjectRepository(PaymentRefund)
        private readonly refundRepository: Repository<PaymentRefund>,
        private readonly paymentService: PaymentService,
    ) {}

    /**
     * Create a new refund
     */
    async create(createDto: CreateRefundDto): Promise<PaymentRefund> {
        // Verify payment exists
        const payment = await this.paymentService.findOne(createDto.payment_id);

        // Calculate total refunded amount
        const existingRefunds = await this.refundRepository.find({
            where: { payment_id: createDto.payment_id },
        });

        const totalRefunded = existingRefunds.reduce(
            (sum, refund) => sum + Number(refund.amount),
            0
        );

        // Verify refund amount doesn't exceed payment amount
        if (totalRefunded + createDto.amount > Number(payment.amount_captured)) {
            throw new BadRequestException(
                `Refund amount exceeds payment amount. Already refunded: ${totalRefunded}, Payment: ${payment.amount_captured}`
            );
        }

        const refund = this.refundRepository.create({
            ...createDto,
            status: createDto.status || RefundStatus.PENDING,
        });

        return await this.refundRepository.save(refund);
    }

    /**
     * Find refund by ID
     */
    async findOne(id: number, relations: string[] = []): Promise<PaymentRefund> {
        const refund = await this.refundRepository.findOne({
            where: { id },
            relations,
        });

        if (!refund) {
            throw new NotFoundException(`Refund with ID ${id} not found`);
        }

        return refund;
    }

    /**
     * Find refund by provider refund ID
     */
    async findByProviderRefundId(providerRefundId: string): Promise<PaymentRefund | null> {
        return await this.refundRepository.findOne({
            where: { provider_refund_id: providerRefundId },
            relations: ['payment'],
        });
    }

    /**
     * Find refunds by payment ID
     */
    async findByPaymentId(paymentId: number): Promise<PaymentRefund[]> {
        return await this.refundRepository.find({
            where: { payment_id: paymentId },
            relations: ['payment'],
            order: { created_at: 'DESC' },
        });
    }

    /**
     * Update refund status
     */
    async updateStatus(id: number, status: RefundStatus): Promise<PaymentRefund> {
        const refund = await this.findOne(id);
        refund.status = status;
        return await this.refundRepository.save(refund);
    }

    /**
     * Mark refund as succeeded
     */
    async markAsSucceeded(id: number): Promise<PaymentRefund> {
        return await this.updateStatus(id, RefundStatus.SUCCEEDED);
    }

    /**
     * Mark refund as failed
     */
    async markAsFailed(id: number): Promise<PaymentRefund> {
        return await this.updateStatus(id, RefundStatus.FAILED);
    }

    /**
     * Delete refund (soft delete)
     */
    async remove(id: number): Promise<void> {
        const refund = await this.findOne(id);
        await this.refundRepository.softRemove(refund);
    }
}

