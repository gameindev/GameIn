import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { OfferingOrder } from '../offerings-order/offering-order.entity';
import { Wallet } from './wallet.entity';
import { WalletReleaseStatus } from './enums/wallet-release-status.enum';

@Entity({ name: 'wallet_release' })
export class WalletRelease {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int', nullable: false, unique: true })
    order_id: number;

    @ManyToOne(() => OfferingOrder, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'order_id' })
    order: OfferingOrder;

    @Column({ type: 'int', nullable: false })
    creator_wallet_id: number;

    @ManyToOne(() => Wallet, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'creator_wallet_id' })
    creator_wallet: Wallet;

    @Column({ type: 'numeric', precision: 12, scale: 2, nullable: false })
    amount: number;

    @Column({ type: 'char', length: 3, nullable: false, default: 'USD' })
    currency: string;

    @Column({ type: 'timestamp', nullable: false })
    release_at: Date;

    @Column({ type: 'enum', enum: WalletReleaseStatus, nullable: false })
    status: WalletReleaseStatus;

    @Column({ type: 'text', nullable: true })
    stripe_transfer_id: string;

    @Column({ type: 'text', nullable: true })
    failure_reason: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}
