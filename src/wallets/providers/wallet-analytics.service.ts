import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WalletLedgerEntry } from '../wallet-ledger-entry.entity';
import { WalletEntryType } from '../enums/wallet-entry-type.enum';
import { WalletEntryStatus } from '../enums/wallet-entry-status.enum';
import { WalletsService } from './wallets.service';
import { WalletLedgerService } from './wallet-ledger.service';
import { UserType } from '../../users/enums/user-type.enums';

function utcDateKey(d: Date): string {
    return d.toISOString().slice(0, 10);
}

interface DailyWalletRow {
    date: string;
    top_ups: number;
    order_payments: number;
    order_earnings: number;
    releases: number;
    withdrawals: number;
}

export interface WalletAnalyticsResult {
    wallet_id: number;
    currency: string;
    balances: Awaited<ReturnType<WalletLedgerService['getBalances']>>;
    totals: {
        top_ups: number;
        order_payments: number;
        order_earnings: number;
        releases: number;
        withdrawals: number;
        refunds: number;
    };
    series_daily: DailyWalletRow[];
    days: number;
}

@Injectable()
export class WalletAnalyticsService {
    constructor(
        @InjectRepository(WalletLedgerEntry)
        private readonly ledgerRepo: Repository<WalletLedgerEntry>,
        private readonly walletsService: WalletsService,
        private readonly ledgerService: WalletLedgerService,
    ) {}

    async getAnalytics(userId: number, userType: UserType, days = 30): Promise<WalletAnalyticsResult> {
        const wallet = await this.walletsService.getOrCreateForUser(userId, userType);
        const balances = await this.ledgerService.getBalances(wallet.id);

        const since = new Date();
        since.setUTCDate(since.getUTCDate() - Math.max(1, days));
        since.setUTCHours(0, 0, 0, 0);

        const entries = await this.ledgerRepo
            .createQueryBuilder('e')
            .where('e.wallet_id = :walletId', { walletId: wallet.id })
            .andWhere('e.created_at >= :since', { since })
            .andWhere('e.deleted_at IS NULL')
            .orderBy('e.created_at', 'ASC')
            .getMany();

        const dailyMap = new Map<string, DailyWalletRow>();
        const totals = {
            top_ups: 0,
            order_payments: 0,
            order_earnings: 0,
            releases: 0,
            withdrawals: 0,
            refunds: 0,
        };

        for (const entry of entries) {
            if (entry.status === WalletEntryStatus.REVERSED) {
                continue;
            }

            const amount = Number(entry.amount) || 0;
            const date = utcDateKey(entry.created_at);
            const row = dailyMap.get(date) ?? {
                date,
                top_ups: 0,
                order_payments: 0,
                order_earnings: 0,
                releases: 0,
                withdrawals: 0,
            };

            switch (entry.entry_type) {
                case WalletEntryType.TOP_UP:
                    row.top_ups += amount;
                    totals.top_ups += amount;
                    break;
                case WalletEntryType.ORDER_PAYMENT:
                    row.order_payments += amount;
                    totals.order_payments += amount;
                    break;
                case WalletEntryType.ORDER_EARNING:
                    row.order_earnings += amount;
                    totals.order_earnings += amount;
                    break;
                case WalletEntryType.RELEASE:
                    row.releases += amount;
                    totals.releases += amount;
                    break;
                case WalletEntryType.WITHDRAW:
                    row.withdrawals += amount;
                    totals.withdrawals += amount;
                    break;
                case WalletEntryType.REFUND:
                    totals.refunds += amount;
                    break;
                default:
                    break;
            }

            dailyMap.set(date, row);
        }

        const seriesDaily = [...dailyMap.values()].sort((a, b) => a.date.localeCompare(b.date));

        return {
            wallet_id: wallet.id,
            currency: wallet.currency ?? balances.currency,
            balances,
            totals,
            series_daily: seriesDaily,
            days,
        };
    }
}
