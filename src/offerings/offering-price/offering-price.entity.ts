import { maxLength } from 'class-validator';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Offering } from "../offerings.entity";
import { PaymentProvider } from "../enums/payment-provider.enum";

/**
 * OfferingPrice entity.
 */
@Entity({ name: 'offering_price' })
@Index('IDX_offering_price_offer', ['offering_id'])
export class OfferingPrice {
    @PrimaryGeneratedColumn('increment', { type: 'int' })
    id: Number;

    /** FK → offering.id (parent offering) */
    @Column({ type: 'int', name: 'offering_id' })
    offering_id!: Number;

    @ManyToOne(() => Offering, (o) => o.offering_prices, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'offering_id' })
    offering!: Offering;


    @Column({
        type: 'varchar',
        nullable: true,
        length: 30
    })
    price?: string;

    @Column({
        type: 'varchar',
        nullable: true,
        length: 30
    })
    platform_fee?: string;


    @Column({
        type: 'varchar',
        nullable: true,
        length: 30
    })
    tax?: string;

    @Column({
        type: 'varchar',
        nullable: true,
        length: 30
    })
    total?: string;

    @Column({
        type: 'enum',
        enum: PaymentProvider,
        enumName: 'payment_provider_enum',
        nullable: true,
    })
    payment_provider?: PaymentProvider;

    @Column({ default: 1 })
    version: number;

    @Column({ type: 'int', name: 'updated_by_user_id', nullable: true })
    updated_by_user_id?: number;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;

    @DeleteDateColumn()
    deleted_at?: Date;


}