import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { ConnectOnboardingStatus } from './enums/connect-onboarding-status.enum';
import { WalletLedgerEntry } from './wallet-ledger-entry.entity';

@Entity({ name: 'wallet' })
export class Wallet {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int', nullable: false, unique: true })
    user_id: number;

    @OneToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({ type: 'char', length: 3, nullable: false, default: 'USD' })
    currency: string;

    @Column({ type: 'text', nullable: true })
    stripe_connect_account_id: string;

    @Column({ type: 'text', nullable: true })
    stripe_customer_id: string;

    @Column({
        type: 'enum',
        enum: ConnectOnboardingStatus,
        default: ConnectOnboardingStatus.NOT_STARTED,
    })
    connect_status: ConnectOnboardingStatus;

    @Column({ type: 'boolean', default: false })
    payouts_enabled: boolean;

    @OneToMany(() => WalletLedgerEntry, (entry) => entry.wallet)
    ledger_entries: WalletLedgerEntry[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}
