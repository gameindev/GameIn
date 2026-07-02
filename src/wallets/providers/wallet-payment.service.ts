import { BadRequestException, ForbiddenException, Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OfferingsOrderService } from '../../offerings-order/providers/offerings-order.service';
import { InvoicesService } from '../../invoices/providers/invoices.service';
import { OrderStatus } from '../../offerings-order/enums/order-status.enum';
import { InvoiceStatus } from '../../invoices/enums/invoice-status.enum';
import { WalletsService } from './wallets.service';
import { WalletLedgerService } from './wallet-ledger.service';
import { UsersService } from '../../users/providers/users.service';
import { UserType } from '../../users/enums/user-type.enums';
import { OfferingsService } from '../../offerings/providers/offerings.service';
import { NotificationEventsService } from '../../notifications/providers/notification-events.service';
import { NotificationType } from '../../notifications/enums/notification-type.enum';
import { NotificationChannel } from '../../notifications/enums/notification-channel.enum';
import { PaymentIntent } from '../../payments/payment-intent.entity';
import { PaymentProvider } from '../../offerings/enums/payment-provider.enum';
import { PaymentStatus } from '../../payments/enums/payment-status.enum';
import { PaymentIntentService } from '../../payments/providers/payment-intent.service';
import { OfferingOrder } from '../../offerings-order/offering-order.entity';
import { Payment } from '../../payments/payment.entity';
import { PaymentInboxNotificationService } from './payment-inbox-notification.service';
import { In } from 'typeorm';

@Injectable()
export class WalletPaymentService {
    constructor(
        @Inject(forwardRef(() => OfferingsOrderService))
        private readonly offeringsOrderService: OfferingsOrderService,
        private readonly invoicesService: InvoicesService,
        private readonly walletsService: WalletsService,
        private readonly ledgerService: WalletLedgerService,
        private readonly usersService: UsersService,
        @Inject(forwardRef(() => OfferingsService))
        private readonly offeringsService: OfferingsService,
        private readonly notificationEvents: NotificationEventsService,
        private readonly paymentInboxNotifications: PaymentInboxNotificationService,
        @Inject(forwardRef(() => PaymentIntentService))
        private readonly paymentIntentService: PaymentIntentService,
        @InjectRepository(PaymentIntent)
        private readonly paymentIntentRepo: Repository<PaymentIntent>,
        @InjectRepository(OfferingOrder)
        private readonly orderRepo: Repository<OfferingOrder>,
        @InjectRepository(Payment)
        private readonly paymentRepo: Repository<Payment>,
    ) {}

    async payOrderFromWallet(orderId: number, brandUserId: number) {
        const order = await this.offeringsOrderService.findOne(orderId, ['creator', 'brand', 'offering']);
        if (!order) {
            throw new NotFoundException(`Order ${orderId} not found`);
        }

        if (order.brand_id !== brandUserId) {
            throw new ForbiddenException('You can only pay for your own orders');
        }

        if (order.status !== OrderStatus.PENDING_PAYMENT) {
            throw new BadRequestException('Order is not pending payment');
        }

        const brandWallet = await this.walletsService.getOrCreateForUser(brandUserId, UserType.BRAND);
        const creatorWallet = await this.walletsService.getOrCreateForUser(order.creator_id, UserType.CREATOR);

        const balances = await this.ledgerService.getBalances(brandWallet.id);
        const total = Number(order.total);

        if (balances.available < total) {
            throw new BadRequestException(
                `Insufficient wallet balance. Available: $${balances.available}, required: $${total}`,
            );
        }

        let invoice = await this.invoicesService.findByOrderId(orderId);
        if (!invoice) {
            invoice = await this.invoicesService.create({
                order_id: orderId,
                currency: order.currency,
                amount_due: total,
                tax_amount: Number(order.tax),
                platform_fee: Number(order.fee),
                status: InvoiceStatus.OPEN,
            });
        }

        const paymentIntent = await this.paymentIntentService.create({
            order_id: orderId,
            invoice_id: invoice.id,
            provider: PaymentProvider.STRIPE,
            amount: total,
            currency: order.currency,
        });

        await this.paymentIntentRepo.update(paymentIntent.id, {
            status: PaymentStatus.SUCCEEDED,
            provider_intent_id: `wallet_${orderId}`,
        });

        await this.ledgerService.recordOrderPayment({
            brandWalletId: brandWallet.id,
            creatorWalletId: creatorWallet.id,
            orderId: order.id,
            orderTitle: order.title,
            subTotal: Number(order.sub_total),
            fee: Number(order.fee),
            total,
            currency: order.currency,
            paymentMethod: 'wallet',
        });

        await this.invoicesService.markAsPaid(invoice.id);
        await this.offeringsOrderService.update(orderId, { status: OrderStatus.PAID });

        if (order.offering_id && order.brand) {
            await this.offeringsService.sponsoreOfferings(order.offering_id, order.brand).catch(() => undefined);
        }

        await this.sendPaymentSecuredNotification(order, total, 'wallet');

        return {
            orderId: order.id,
            paymentIntentId: paymentIntent.id,
            paidFromWallet: true,
        };
    }

    async syncBrandLedgerHistory(brandUserId: number, brandWalletId: number) {
        const orders = await this.orderRepo.find({
            where: {
                brand_id: brandUserId,
                status: In([
                    OrderStatus.PAID,
                    OrderStatus.IN_PROGRESS,
                    OrderStatus.DELIVERED,
                    OrderStatus.DISPUTED,
                ]),
            },
        });

        for (const order of orders) {
            const cardKey = `order:${order.id}:brand-card-payment`;
            const walletKey = `order:${order.id}:brand-debit`;
            const hasBrandEntry =
                (await this.ledgerService.findByIdempotencyKey(cardKey)) ||
                (await this.ledgerService.findByIdempotencyKey(walletKey));

            if (hasBrandEntry) {
                continue;
            }

            const creatorWallet = await this.walletsService.getOrCreateForUser(
                order.creator_id,
                UserType.CREATOR,
            );

            const paymentIntent = await this.paymentIntentRepo.findOne({
                where: { order_id: order.id },
                order: { created_at: 'DESC' },
            });

            const isWallet = paymentIntent?.provider_intent_id?.startsWith('wallet_') ?? false;
            const paymentMethod = isWallet ? 'wallet' : 'card';

            let stripeObjectId: string | undefined;
            if (!isWallet && paymentIntent) {
                const payment = await this.paymentRepo.findOne({
                    where: {
                        payment_intent_id: paymentIntent.id,
                        status: PaymentStatus.SUCCEEDED,
                    },
                    order: { created_at: 'DESC' },
                });
                stripeObjectId = payment?.provider_payment_id ?? undefined;
            }

            await this.ledgerService.recordOrderPayment({
                brandWalletId: brandWalletId,
                creatorWalletId: creatorWallet.id,
                orderId: order.id,
                orderTitle: order.title,
                subTotal: Number(order.sub_total),
                fee: Number(order.fee),
                total: Number(order.total),
                currency: order.currency,
                paymentMethod,
                stripeObjectId,
            });
        }
    }

    private async sendPaymentSecuredNotification(
        order: any,
        amount: number,
        paymentMethod: 'card' | 'wallet' = 'card',
    ) {
        const dashboardUrl = process.env.FRONTEND_HOST || process.env.FRONTEND_URL || 'https://gamein.gg';

        await this.notificationEvents.publishNotification({
            userId: order.creator.id,
            type: NotificationType.PAYMENT_SECURED,
            channels: [NotificationChannel.IN_APP, NotificationChannel.EMAIL],
            title: 'Payment Secured',
            message: `A payment of ${order.currency} ${amount} has been secured for order "${order.title}". Funds will be released after delivery.`,
            data: {
                orderId: order.id,
                amount,
                currency: order.currency,
            },
            metadata: {
                email: order.creator?.email,
                emailTemplate: 'payment-secured',
                emailSubject: `Payment secured for ${order.title}`,
                emailData: {
                    username: order.creator?.username ?? 'there',
                    orderTitle: order.title,
                    amount: String(amount),
                    currency: order.currency,
                    dashboardUrl,
                },
            },
            priority: 'high',
        }).catch(() => undefined);

        await this.paymentInboxNotifications.notifyOrderPaymentSecured({
            brandId: order.brand_id ?? order.brand?.id,
            creatorId: order.creator_id ?? order.creator?.id,
            orderId: order.id,
            orderTitle: order.title,
            amount,
            currency: order.currency,
            paymentMethod,
        }).catch(() => undefined);
    }
}
