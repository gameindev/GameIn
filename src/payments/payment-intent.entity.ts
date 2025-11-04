import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { PaymentStatus } from './enums/payment-status.enum';
import { Payment } from './payment.entity';
import { OfferingOrder } from '../offerings-order/offering-order.entity';
import { Invoice } from '../invoices/invoice.entity';
import { PaymentProvider } from '../offerings/enums/payment-provider.enum';


@Entity({ name: 'payment_intent' })
export class PaymentIntent {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int', nullable: false })
    order_id: number;

    @ManyToOne(() => OfferingOrder, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'order_id' })
    order: OfferingOrder;

    @Column({ type: 'int', nullable: false })
    invoice_id: number;

    @ManyToOne(() => Invoice, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'invoice_id' })
    invoice: Invoice;

    @Column({ type: 'enum', enum: PaymentProvider, nullable: false })
    provider: PaymentProvider;

    @Column({ type: 'text', nullable: true, unique: true })
    provider_intent_id: string;

    @Column({ type: 'text', nullable: true })
    client_secret: string;

    @Column({ type: 'numeric', precision: 12, scale: 2, nullable: false })
    amount: number;

    @Column({ type: 'char', length: 3, nullable: false, default: 'USD' })
    currency: string;

    @Column({ type: 'enum', enum: PaymentStatus, nullable: false })
    status: PaymentStatus;

    @Column({ type: 'jsonb', nullable: true })
    meta_data: Record<string, any>;

    @Column({ type: 'text', nullable: true })
    pdf_url: string;

    @OneToMany(() => Payment, (payment) => payment.payment_intent, { cascade: true })
    payments: Payment[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}

