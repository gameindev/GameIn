import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { SocialIntegration } from './social-integration.entity';

@Entity('social_metric_snapshots')
export class SocialMetricSnapshot {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => SocialIntegration, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'integration_id' })
    integration: SocialIntegration;

    /** UTC calendar date */
    @Column({ type: 'date' })
    snapshotDate: Date;

    @Column({ type: 'bigint', nullable: true })
    followers_or_subscribers?: number;

    @Column({ type: 'bigint', nullable: true })
    total_views?: number;

    @Column({ type: 'bigint', nullable: true })
    total_likes?: number;

    @Column({ type: 'varchar', length: 40, default: 'scheduled_sync' })
    source: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
