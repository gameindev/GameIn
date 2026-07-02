import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wallet } from '../wallet.entity';
import { ConfigService } from '@nestjs/config';
import { ConnectOnboardingStatus } from '../enums/connect-onboarding-status.enum';
import { WalletLedgerService } from './wallet-ledger.service';
import { UserType } from '../../users/enums/user-type.enums';

@Injectable()
export class WalletsService {
    constructor(
        @InjectRepository(Wallet)
        private readonly walletRepo: Repository<Wallet>,
        private readonly configService: ConfigService,
        private readonly ledgerService: WalletLedgerService,
    ) {}

    async getOrCreateForUser(userId: number, userType?: UserType): Promise<Wallet> {
        let wallet = await this.walletRepo.findOne({ where: { user_id: userId } });
        if (!wallet) {
            const walletConfig = this.configService.get('walletConfig');
            wallet = this.walletRepo.create({
                user_id: userId,
                currency: walletConfig?.defaultCurrency ?? 'USD',
                connect_status:
                    userType === UserType.CREATOR
                        ? ConnectOnboardingStatus.NOT_STARTED
                        : ConnectOnboardingStatus.NOT_STARTED,
                payouts_enabled: false,
            });
            wallet = await this.walletRepo.save(wallet);
        }
        return wallet;
    }

    async findByUserId(userId: number): Promise<Wallet | null> {
        return this.walletRepo.findOne({ where: { user_id: userId } });
    }

    async findByConnectAccountId(accountId: string): Promise<Wallet | null> {
        return this.walletRepo.findOne({ where: { stripe_connect_account_id: accountId } });
    }

    async findById(id: number): Promise<Wallet> {
        const wallet = await this.walletRepo.findOne({ where: { id } });
        if (!wallet) {
            throw new NotFoundException(`Wallet ${id} not found`);
        }
        return wallet;
    }

    async updateWallet(id: number, data: Partial<Wallet>): Promise<Wallet> {
        await this.walletRepo.update(id, data);
        return this.findById(id);
    }

    async getWalletSummary(userId: number, userType: UserType) {
        const wallet = await this.getOrCreateForUser(userId, userType);
        const balances = await this.ledgerService.getBalances(wallet.id);

        return {
            wallet,
            balances,
        };
    }
}
