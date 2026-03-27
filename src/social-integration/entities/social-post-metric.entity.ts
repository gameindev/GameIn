import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { SocialIntegration } from "./social-integration.entity";
import { SocialPlatform } from "../enums/social-platform.enums";

@Entity('social_post_metrics')
@Index('IDX_social_post_metrics_integration_platform', ['integration', 'platform'])
@Index('IDX_social_post_metrics_integration_social_post_id', ['integration', 'social_post_id'], { unique: true })
export class SocialPostMetric {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => SocialIntegration, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'integration_id' })
    integration: SocialIntegration;

    @Column({ type: 'enum', enum: SocialPlatform })
    platform: SocialPlatform;

    @Column({ type: 'text' })
    social_post_id: string;

    @Column({ type: 'timestamptz', nullable: true })
    posted_at?: Date;

    @Column({ type: 'bigint', nullable: true })
    like_count?: number;

    @Column({ type: 'bigint', nullable: true })
    view_count?: number;

    @Column({ type: 'varchar', length: 128, nullable: true })
    raw_hash?: string;

    @Column({ type: 'jsonb', nullable: true })
    raw_payload?: Record<string, any>;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
