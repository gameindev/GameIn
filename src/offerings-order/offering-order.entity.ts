
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OrderStatus } from "./enums/order-status.enum";
import { Offering } from "../offerings/offerings.entity";
import { User } from "../users/user.entity";
import { OfferingType } from "../offerings/enums/offering-type.enum";


@Entity({ name: 'offering_order' })
export class OfferingOrder {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 30, nullable: false })
    order_id: string;

    @Column({ type: 'int', nullable: false })
    offering_id: number;

    @ManyToOne(() => Offering, { nullable: false, eager: false, cascade: ['insert', 'update'], onDelete: 'CASCADE', })
    @JoinColumn({ name: 'offering_id' })
    offering: Offering;

    @Column({ type: 'int', nullable: false })
    creator_id: number;

    @ManyToOne(() => User, { nullable: false, eager: false, cascade: ['insert', 'update'], onDelete: 'CASCADE', })
    @JoinColumn({ name: 'creator_id' })
    creator: User;

    @Column({ type: 'int', nullable: false })
    brand_id: number;

    @ManyToOne(() => User, { nullable: false, eager: false, cascade: ['insert', 'update'], onDelete: 'CASCADE', })
    @JoinColumn({ name: 'brand_id' })
    brand: User;

    @Column({ type: 'varchar', length: 195, nullable: false })
    title: string;

    @Column({ type: 'enum', enum: OfferingType, nullable: false })
    type: OfferingType;

    @Column({ type: 'varchar', length: 3, nullable: false })
    currency: string;

    @Column({ type: 'numeric', precision: 12, scale: 2, nullable: false })
    sub_total: number;

    @Column({ type: 'numeric', precision: 12, scale: 2, nullable: false })
    fee: number;

    @Column({ type: 'numeric', precision: 12, scale: 2, nullable: false })
    tax: number;

    @Column({ type: 'numeric', precision: 12, scale: 2, nullable: false })
    total: number;

    @Column({ type: 'text', nullable: true })
    notes: string;

    @Column({ type: 'enum', enum: OrderStatus, nullable: false })
    status: OrderStatus;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}