import { BadRequestException, Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WalletRelease } from '../wallet-release.entity';
import { WalletReleaseStatus } from '../enums/wallet-release-status.enum';
import { WalletsService } from './wallets.service';
import { WalletLedgerService } from './wallet-ledger.service';
import { StripeConnectService } from './stripe-connect.service';
import { OfferingsOrderService } from '../../offerings-order/providers/offerings-order.service';
import { OrderStatus } from '../../offerings-order/enums/order-status.enum';
import { NotificationEventsService } from '../../notifications/providers/notification-events.service';
import { NotificationType } from '../../notifications/enums/notification-type.enum';
import { NotificationChannel } from '../../notifications/enums/notification-channel.enum';
import { PaymentInboxNotificationService } from './payment-inbox-notification.service';
import { OfferingOrder } from '../../offerings-order/offering-order.entity';

@Injectable()
export class WalletReleaseService {
    constructor(
        @InjectRepository(WalletRelease)
        private readonly releaseRepo: Repository<WalletRelease>,
        private readonly walletsService: WalletsService,
        private readonly ledgerService: WalletLedgerService,
        private readonly stripeConnectService: StripeConnectService,
        @Inject(forwardRef(() => OfferingsOrderService))
        private readonly offeringsOrderService: OfferingsOrderService,
        private readonly configService: ConfigService,
        private readonly notificationEvents: NotificationEventsService,
        private readonly paymentInboxNotifications: PaymentInboxNotificationService,
    ) {}

    async scheduleReleaseForOrder(order: OfferingOrder) {
        const existing = await this.releaseRepo.findOne({ where: { order_id: order.id } });
        if (existing) {
            return existing;
        }

        const creatorWallet = await this.walletsService.getOrCreateForUser(order.creator_id);
        const walletConfig = this.configService.get('walletConfig');
        const holdDays = walletConfig?.releaseHoldDays ?? 7;
        const releaseAt = new Date();
        releaseAt.setDate(releaseAt.getDate() + holdDays);

        const release = this.releaseRepo.create({
            order_id: order.id,
            creator_wallet_id: creatorWallet.id,
            amount: Number(order.sub_total),
            currency: order.currency,
            release_at: releaseAt,
            status: WalletReleaseStatus.SCHEDULED,
        });

        return this.releaseRepo.save(release);
    }

    async freezeReleaseForOrder(orderId: number) {
        const release = await this.releaseRepo.findOne({ where: { order_id: orderId } });
        if (release && release.status === WalletReleaseStatus.SCHEDULED) {
            release.status = WalletReleaseStatus.FROZEN;
            await this.releaseRepo.save(release);
        }
        await this.ledgerService.freezeOrderEarnings(orderId);
    }

    async cancelReleaseForOrder(orderId: number) {
        const release = await this.releaseRepo.findOne({ where: { order_id: orderId } });
        if (release && release.status !== WalletReleaseStatus.COMPLETED) {
            release.status = WalletReleaseStatus.CANCELLED;
            await this.releaseRepo.save(release);
        }
        await this.ledgerService.reverseOrderEarning(orderId);
    }

    async makeScheduledReleasesDueNow(): Promise<{ updated: number }> {
        const now = new Date();
        const result = await this.releaseRepo
            .createQueryBuilder()
            .update(WalletRelease)
            .set({ release_at: now })
            .where('status = :status', { status: WalletReleaseStatus.SCHEDULED })
            .andWhere('release_at > :now', { now })
            .execute();

        return { updated: result.affected ?? 0 };
    }

    async processDueReleases(): Promise<{ processed: number; failed: number }> {
        const now = new Date();
        const due = await this.releaseRepo
            .createQueryBuilder('wr')
            .where('wr.status = :status', { status: WalletReleaseStatus.SCHEDULED })
            .andWhere('wr.release_at <= :now', { now })
            .getMany();

        let processed = 0;
        let failed = 0;

        for (const release of due) {
            try {
                await this.executeRelease(release.id);
                processed += 1;
            } catch {
                failed += 1;
            }
        }

        return { processed, failed };
    }

    async executeRelease(releaseId: number) {
        const release = await this.releaseRepo.findOne({
            where: { id: releaseId },
            relations: ['creator_wallet', 'order'],
        });

        if (!release) {
            throw new NotFoundException(`Release ${releaseId} not found`);
        }

        if (release.status !== WalletReleaseStatus.SCHEDULED) {
            return release;
        }

        const order = await this.offeringsOrderService.findOne(release.order_id, ['creator', 'brand']);
        if (!order) {
            throw new NotFoundException(`Order ${release.order_id} not found`);
        }

        if (order.status === OrderStatus.DISPUTED) {
            release.status = WalletReleaseStatus.FROZEN;
            await this.releaseRepo.save(release);
            await this.ledgerService.freezeOrderEarnings(order.id);
            return release;
        }

        const wallet = release.creator_wallet;
        if (!wallet.stripe_connect_account_id || !wallet.payouts_enabled) {
            release.failure_reason = 'Creator Connect onboarding incomplete';
            release.status = WalletReleaseStatus.FAILED;
            await this.releaseRepo.save(release);
            throw new BadRequestException(release.failure_reason);
        }

        release.status = WalletReleaseStatus.PROCESSING;
        await this.releaseRepo.save(release);

        try {
            const transfer = await this.stripeConnectService.transferToCreator({
                destinationAccountId: wallet.stripe_connect_account_id,
                amount: Number(release.amount),
                currency: release.currency,
                orderId: order.id,
            });

            release.stripe_transfer_id = transfer.id;
            release.status = WalletReleaseStatus.COMPLETED;
            await this.releaseRepo.save(release);

            await this.ledgerService.releaseOrderEarning(order.id, wallet.id, transfer.id);

            await this.notifyFundsReleased(order, release).catch(() => undefined);

            return release;
        } catch (err: any) {
            release.status = WalletReleaseStatus.FAILED;
            release.failure_reason = err?.message ?? 'Transfer failed';
            await this.releaseRepo.save(release);
            throw err;
        }
    }

    private async notifyFundsReleased(order: OfferingOrder, release: WalletRelease) {
        const dashboardUrl = process.env.FRONTEND_HOST || process.env.FRONTEND_URL || 'https://gamein.gg';

        await this.notificationEvents.publishNotification({
            userId: order.creator_id,
            type: NotificationType.FUNDS_RELEASED,
            channels: [NotificationChannel.IN_APP, NotificationChannel.EMAIL],
            title: 'Funds Released',
            message: `$${release.amount} from order "${order.title}" is now available in your wallet.`,
            data: {
                orderId: order.id,
                amount: release.amount,
                currency: release.currency,
            },
            metadata: {
                email: order.creator?.email,
                emailTemplate: 'funds-released',
                emailSubject: 'Your sponsorship earnings are available',
                emailData: {
                    username: order.creator?.username ?? 'there',
                    orderTitle: order.title,
                    amount: String(release.amount),
                    currency: release.currency,
                    dashboardUrl: `${dashboardUrl}/#/settings/payments`,
                },
            },
            priority: 'high',
        });

        await this.paymentInboxNotifications.notifyFundsReleased({
            brandId: order.brand_id,
            creatorId: order.creator_id,
            orderId: order.id,
            orderTitle: order.title,
            amount: Number(release.amount),
            currency: release.currency,
        }).catch(() => undefined);
    }
}
