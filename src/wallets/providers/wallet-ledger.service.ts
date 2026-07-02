import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WalletLedgerEntry } from '../wallet-ledger-entry.entity';
import { WalletEntryType } from '../enums/wallet-entry-type.enum';
import { WalletEntryStatus } from '../enums/wallet-entry-status.enum';
import { WalletReferenceType } from '../enums/wallet-reference-type.enum';

export interface WalletBalances {
    available: number;
    pending: number;
    inTransit: number;
    reserved: number;
    currency: string;
}

const CREDIT_TYPES = new Set<WalletEntryType>([
    WalletEntryType.TOP_UP,
    WalletEntryType.ORDER_EARNING,
    WalletEntryType.RELEASE,
    WalletEntryType.REFUND,
]);

const DEBIT_TYPES = new Set<WalletEntryType>([
    WalletEntryType.ORDER_PAYMENT,
    WalletEntryType.WITHDRAW,
]);

@Injectable()
export class WalletLedgerService {
    constructor(
        @InjectRepository(WalletLedgerEntry)
        private readonly ledgerRepo: Repository<WalletLedgerEntry>,
    ) {}

    async getBalances(walletId: number): Promise<WalletBalances> {
        const entries = await this.ledgerRepo.find({ where: { wallet_id: walletId } });
        let available = 0;
        let pending = 0;
        let inTransit = 0;
        let reserved = 0;
        let currency = 'USD';

        for (const entry of entries) {
            const amount = Number(entry.amount);
            currency = entry.currency || currency;

            if (entry.entry_type === WalletEntryType.ORDER_EARNING && entry.status === WalletEntryStatus.PENDING) {
                pending += amount;
                continue;
            }

            if (entry.entry_type === WalletEntryType.WITHDRAW && entry.status === WalletEntryStatus.PENDING) {
                inTransit += amount;
                continue;
            }

            // Card sponsorship payments are history-only; they do not debit wallet balance.
            if (
                entry.entry_type === WalletEntryType.ORDER_PAYMENT &&
                entry.meta_data?.paymentMethod === 'card'
            ) {
                continue;
            }

            if (entry.status === WalletEntryStatus.FROZEN) {
                reserved += amount;
                continue;
            }

            if (entry.status !== WalletEntryStatus.COMPLETED) {
                continue;
            }

            if (CREDIT_TYPES.has(entry.entry_type)) {
                available += amount;
            } else if (DEBIT_TYPES.has(entry.entry_type)) {
                available -= amount;
            }
        }

        return {
            available: Math.max(0, Math.round(available * 100) / 100),
            pending: Math.round(pending * 100) / 100,
            inTransit: Math.round(inTransit * 100) / 100,
            reserved: Math.round(reserved * 100) / 100,
            currency,
        };
    }

    async findByIdempotencyKey(key: string): Promise<WalletLedgerEntry | null> {
        return this.ledgerRepo.findOne({ where: { idempotency_key: key } });
    }

    async createEntry(params: {
        walletId: number;
        entryType: WalletEntryType;
        status: WalletEntryStatus;
        amount: number;
        currency: string;
        idempotencyKey: string;
        referenceType?: WalletReferenceType;
        referenceId?: number;
        stripeObjectId?: string;
        description?: string;
        metaData?: Record<string, any>;
    }): Promise<WalletLedgerEntry> {
        const existing = await this.findByIdempotencyKey(params.idempotencyKey);
        if (existing) {
            return existing;
        }

        const entry = this.ledgerRepo.create({
            wallet_id: params.walletId,
            entry_type: params.entryType,
            status: params.status,
            amount: params.amount,
            currency: params.currency,
            reference_type: params.referenceType,
            reference_id: params.referenceId,
            stripe_object_id: params.stripeObjectId,
            idempotency_key: params.idempotencyKey,
            description: params.description,
            meta_data: params.metaData,
        });

        return this.ledgerRepo.save(entry);
    }

    async updateEntryStatus(
        id: number,
        status: WalletEntryStatus,
        metaData?: Record<string, any>,
    ): Promise<WalletLedgerEntry> {
        const entry = await this.ledgerRepo.findOne({ where: { id } });
        if (!entry) {
            throw new Error(`Ledger entry ${id} not found`);
        }
        entry.status = status;
        if (metaData) {
            entry.meta_data = { ...(entry.meta_data ?? {}), ...metaData };
        }
        return this.ledgerRepo.save(entry);
    }

    async findByReference(
        referenceType: WalletReferenceType,
        referenceId: number,
        entryType?: WalletEntryType,
    ): Promise<WalletLedgerEntry[]> {
        const where: any = { reference_type: referenceType, reference_id: referenceId };
        if (entryType) {
            where.entry_type = entryType;
        }
        return this.ledgerRepo.find({ where });
    }

    async getLedgerPage(walletId: number, page = 1, limit = 20) {
        const [items, total] = await this.ledgerRepo.findAndCount({
            where: { wallet_id: walletId },
            order: { created_at: 'DESC' },
            skip: (page - 1) * limit,
            take: limit,
        });

        return {
            items,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }

    async recordOrderPayment(params: {
        brandWalletId?: number;
        creatorWalletId: number;
        orderId: number;
        orderTitle?: string;
        subTotal: number;
        fee: number;
        total: number;
        currency: string;
        paymentMethod: 'card' | 'wallet';
        stripeObjectId?: string;
    }) {
        const label = params.orderTitle
            ? `Sponsorship payment: ${params.orderTitle}`
            : `Sponsorship payment for order #${params.orderId}`;

        if (params.brandWalletId) {
            const brandKey =
                params.paymentMethod === 'wallet'
                    ? `order:${params.orderId}:brand-debit`
                    : `order:${params.orderId}:brand-card-payment`;

            await this.createEntry({
                walletId: params.brandWalletId,
                entryType: WalletEntryType.ORDER_PAYMENT,
                status: WalletEntryStatus.COMPLETED,
                amount: params.total,
                currency: params.currency,
                idempotencyKey: brandKey,
                referenceType: WalletReferenceType.ORDER,
                referenceId: params.orderId,
                stripeObjectId: params.stripeObjectId,
                description: label,
                metaData: { paymentMethod: params.paymentMethod },
            });
        }

        await this.createEntry({
            walletId: params.creatorWalletId,
            entryType: WalletEntryType.ORDER_EARNING,
            status: WalletEntryStatus.PENDING,
            amount: params.subTotal,
            currency: params.currency,
            idempotencyKey: `order:${params.orderId}:creator-credit`,
            referenceType: WalletReferenceType.ORDER,
            referenceId: params.orderId,
            stripeObjectId: params.stripeObjectId,
            description: `Earnings secured for order #${params.orderId}`,
            metaData: { paymentMethod: params.paymentMethod },
        });
    }

    async releaseOrderEarning(orderId: number, creatorWalletId: number, stripeTransferId?: string) {
        const entries = await this.findByReference(
            WalletReferenceType.ORDER,
            orderId,
            WalletEntryType.ORDER_EARNING,
        );
        const earning = entries.find((e) => e.status === WalletEntryStatus.PENDING);
        if (earning) {
            await this.updateEntryStatus(earning.id, WalletEntryStatus.COMPLETED, {
                releasedAt: new Date().toISOString(),
                stripeTransferId,
            });
        }

        return this.createEntry({
            walletId: creatorWalletId,
            entryType: WalletEntryType.RELEASE,
            status: WalletEntryStatus.COMPLETED,
            amount: earning ? Number(earning.amount) : 0,
            currency: earning?.currency ?? 'USD',
            idempotencyKey: `order:${orderId}:release`,
            referenceType: WalletReferenceType.ORDER,
            referenceId: orderId,
            stripeObjectId: stripeTransferId,
            description: `Funds released for order #${orderId}`,
        });
    }

    async reverseOrderEarning(orderId: number) {
        const entries = await this.findByReference(WalletReferenceType.ORDER, orderId);
        for (const entry of entries) {
            if (
                entry.status === WalletEntryStatus.PENDING ||
                entry.status === WalletEntryStatus.COMPLETED
            ) {
                await this.updateEntryStatus(entry.id, WalletEntryStatus.REVERSED);
            }
        }
    }

    async freezeOrderEarnings(orderId: number) {
        const entries = await this.findByReference(
            WalletReferenceType.ORDER,
            orderId,
            WalletEntryType.ORDER_EARNING,
        );
        for (const entry of entries) {
            if (entry.status === WalletEntryStatus.PENDING) {
                await this.updateEntryStatus(entry.id, WalletEntryStatus.FROZEN);
            }
        }
    }
}
