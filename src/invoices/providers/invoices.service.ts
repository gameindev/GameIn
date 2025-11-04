import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from '../invoice.entity';
import { CreateInvoiceDto } from '../dtos/create-invoice.dto';
import { UpdateInvoiceDto } from '../dtos/update-invoice.dto';
import { InvoiceStatus } from '../enums/invoice-status.enum';

@Injectable()
export class InvoicesService {
    constructor(
        @InjectRepository(Invoice)
        private readonly invoiceRepository: Repository<Invoice>,
    ) {}

    /**
     * Generate unique invoice number
     */
    private generateInvoiceNumber(): string {
        const prefix = 'INV';
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        return `${prefix}-${timestamp}-${random}`;
    }

    /**
     * Create a new invoice
     */
    async create(createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
        let invoiceNumber: string;
        let isUnique = false;
        
        // Generate unique invoice number
        while (!isUnique) {
            invoiceNumber = this.generateInvoiceNumber();
            const existing = await this.invoiceRepository.findOne({
                where: { invoice_number: invoiceNumber },
            });
            if (!existing) {
                isUnique = true;
            }
        }

        const invoice = this.invoiceRepository.create({
            ...createInvoiceDto,
            invoice_number: invoiceNumber,
            status: createInvoiceDto.status || InvoiceStatus.DRAFT,
            currency: createInvoiceDto.currency || 'USD',
            tax_amount: createInvoiceDto.tax_amount ?? 0,
            platform_fee: createInvoiceDto.platform_fee ?? 0,
            issued_at: new Date(),
            due_at: createInvoiceDto.due_at ? new Date(createInvoiceDto.due_at) : null,
        });

        return await this.invoiceRepository.save(invoice);
    }

    /**
     * Find invoice by ID
     */
    async findOne(id: number, relations: string[] = []): Promise<Invoice> {
        const invoice = await this.invoiceRepository.findOne({
            where: { id },
            relations,
        });

        if (!invoice) {
            throw new NotFoundException(`Invoice with ID ${id} not found`);
        }

        return invoice;
    }

    /**
     * Find invoice by order ID
     */
    async findByOrderId(orderId: number): Promise<Invoice | null> {
        return await this.invoiceRepository.findOne({
            where: { order_id: orderId },
            relations: ['order'],
        });
    }

    /**
     * Find invoice by invoice number
     */
    async findByInvoiceNumber(invoiceNumber: string): Promise<Invoice | null> {
        return await this.invoiceRepository.findOne({
            where: { invoice_number: invoiceNumber },
            relations: ['order'],
        });
    }

    /**
     * Update invoice
     */
    async update(id: number, updateInvoiceDto: UpdateInvoiceDto): Promise<Invoice> {
        const invoice = await this.findOne(id);

        if (updateInvoiceDto.due_at) {
            updateInvoiceDto.due_at = new Date(updateInvoiceDto.due_at).toISOString();
        }

        Object.assign(invoice, updateInvoiceDto);
        return await this.invoiceRepository.save(invoice);
    }

    /**
     * Mark invoice as paid
     */
    async markAsPaid(id: number): Promise<Invoice> {
        const invoice = await this.findOne(id);

        if (invoice.status === InvoiceStatus.PAID) {
            throw new BadRequestException('Invoice is already marked as paid');
        }

        invoice.status = InvoiceStatus.PAID;
        return await this.invoiceRepository.save(invoice);
    }

    /**
     * Mark invoice as refunded
     */
    async markAsRefunded(id: number): Promise<Invoice> {
        const invoice = await this.findOne(id);

        invoice.status = InvoiceStatus.REFUNDED;
        return await this.invoiceRepository.save(invoice);
    }

    /**
     * Delete invoice (soft delete)
     */
    async remove(id: number): Promise<void> {
        const invoice = await this.findOne(id);
        await this.invoiceRepository.softRemove(invoice);
    }
}

