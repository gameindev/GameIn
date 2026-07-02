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
import { Wallet } from './wallet.entity';
import { WalletEntryType } from './enums/wallet-entry-type.enum';
import { WalletEntryStatus } from './enums/wallet-entry-status.enum';
import { WalletReferenceType } from './enums/wallet-reference-type.enum';

@Entity({ name: 'wallet_ledger_entry' })
export class WalletLedgerEntry {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int', nullable: false })
    wallet_id: number;

    @ManyToOne(() => Wallet, (wallet) => wallet.ledger_entries, {
        nullable: false,
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'wallet_id' })
    wallet: Wallet;

    @Column({ type: 'enum', enum: WalletEntryType, nullable: false })
    entry_type: WalletEntryType;

    @Column({ type: 'enum', enum: WalletEntryStatus, nullable: false })
    status: WalletEntryStatus;

    @Column({ type: 'numeric', precision: 12, scale: 2, nullable: false })
    amount: number;

    @Column({ type: 'char', length: 3, nullable: false, default: 'USD' })
    currency: string;

    @Column({ type: 'enum', enum: WalletReferenceType, nullable: true })
    reference_type: WalletReferenceType;

    @Column({ type: 'int', nullable: true })
    reference_id: number;

    @Column({ type: 'text', nullable: true })
    stripe_object_id: string;

    @Column({ type: 'varchar', length: 120, nullable: false, unique: true })
    idempotency_key: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'jsonb', nullable: true })
    meta_data: Record<string, any>;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}
