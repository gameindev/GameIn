import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { InvoiceStatus } from './enums/invoice-status.enum';
import { OfferingOrder } from '../offerings-order/offering-order.entity';

@Entity({ name: 'invoice' })
export class Invoice {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int', nullable: false })
    order_id: number;

    @ManyToOne(() => OfferingOrder, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'order_id' })
    order: OfferingOrder;

    @Column({ type: 'varchar', length: 30, nullable: false, unique: true })
    invoice_number: string;

    @Column({ type: 'enum', enum: InvoiceStatus, nullable: false })
    status: InvoiceStatus;

    @Column({ type: 'char', length: 3, nullable: false, default: 'USD' })
    currency: string;

    @Column({ type: 'numeric', precision: 12, scale: 2, nullable: false })
    amount_due: number;

    @Column({ type: 'numeric', precision: 12, scale: 2, nullable: false, default: 0 })
    tax_amount: number;

    @Column({ type: 'numeric', precision: 12, scale: 2, nullable: false, default: 0 })
    platform_fee: number;

    @Column({ type: 'timestamp', nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    issued_at: Date;

    @Column({ type: 'timestamp', nullable: true })
    due_at: Date;

    @Column({ type: 'text', nullable: true })
    pdf_url: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}

