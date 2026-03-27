import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { SocialIntegration } from "./social-integration.entity";

@Entity('social_account_rollups')
export class SocialAccountRollup {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => SocialIntegration, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'integration_id' })
    integration: SocialIntegration;

    @Column({ type: 'bigint', nullable: true })
    followers_or_subscribers?: number;

    @Column({ type: 'bigint', nullable: true })
    total_likes?: number;

    @Column({ type: 'bigint', nullable: true })
    max_likes?: number;

    @Column({ type: 'bigint', nullable: true })
    total_views?: number;

    @Column({ type: 'bigint', nullable: true })
    max_views?: number;

    @Column({ type: 'integer', nullable: true })
    sampled_posts_count?: number;

    @Column({ type: 'varchar', length: 50, default: 'all_fetched' })
    aggregation_window: string;

    @Column({ type: 'varchar', length: 120, nullable: true })
    views_definition?: string;

    @Column({ type: 'timestamptz', nullable: true })
    last_synced_at?: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
