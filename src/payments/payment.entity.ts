import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { PaymentIntent } from './payment-intent.entity';
import { PaymentStatus } from './enums/payment-status.enum';
import { PaymentRefund } from './payment-refund.entity';


@Entity({ name: 'payment' })
export class Payment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int', nullable: false })
    payment_intent_id: number;

    @ManyToOne(() => PaymentIntent, (paymentIntent) => paymentIntent.payments, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'payment_intent_id' })
    payment_intent: PaymentIntent;

    @Column({ type: 'text', nullable: true, unique: true })
    provider_payment_id: string;

    @Column({ type: 'numeric', precision: 12, scale: 2, nullable: false })
    amount_captured: number;

    @Column({ type: 'char', length: 3, nullable: false, default: 'USD' })
    currency: string;

    @Column({ type: 'enum', enum: PaymentStatus, nullable: false })
    status: PaymentStatus;

    @Column({ type: 'text', nullable: true })
    receipt_url: string;

    @Column({ type: 'text', nullable: true })
    failure_code: string;

    @Column({ type: 'text', nullable: true })
    failure_message: string;

    @Column({ type: 'jsonb', nullable: true })
    meta_data: Record<string, any>;

    @Column({ type: 'timestamp', nullable: true })
    succeeded_at: Date;

    @OneToMany(() => PaymentRefund, (refund) => refund.payment, { cascade: true })
    refunds: PaymentRefund[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}

