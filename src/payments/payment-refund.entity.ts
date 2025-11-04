import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Payment } from './payment.entity';
import { RefundStatus } from './enums/refund-status.enum';

@Entity({ name: 'payment_refund' })
export class PaymentRefund {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int', nullable: false })
    payment_id: number;

    @ManyToOne(() => Payment, (payment) => payment.refunds, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'payment_id' })
    payment: Payment;

    @Column({ type: 'text', nullable: true, unique: true })
    provider_refund_id: string;

    @Column({ type: 'numeric', precision: 12, scale: 2, nullable: false })
    amount: number;

    @Column({ type: 'enum', enum: RefundStatus, nullable: false })
    status: RefundStatus;

    @Column({ type: 'text', nullable: true })
    reason: string;

    @Column({ type: 'jsonb', nullable: true })
    meta_data: Record<string, any>;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}

