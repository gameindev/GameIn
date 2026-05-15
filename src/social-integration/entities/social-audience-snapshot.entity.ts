import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { SocialIntegration } from './social-integration.entity';

/** P1b: vendor audience breakdowns (Instagram / YouTube) — optional until populated */
@Entity('social_audience_snapshots')
export class SocialAudienceSnapshot {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => SocialIntegration, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'integration_id' })
    integration: SocialIntegration;

    @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    captured_at: Date;

    @Column({ type: 'jsonb', default: {} })
    payload: Record<string, unknown>;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
