import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { SocialIntegration } from "./social-integration.entity";
import { SocialPlatform } from "../enums/social-platform.enums";

@Entity('social_sync_jobs')
export class SocialSyncJob {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => SocialIntegration, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'integration_id' })
    integration: SocialIntegration;

    @Column({ type: 'enum', enum: SocialPlatform })
    platform: SocialPlatform;

    @Column({ type: 'varchar', length: 40, default: 'IDLE' })
    status: string;

    @Column({ type: 'text', nullable: true })
    cursor?: string;

    @Column({ type: 'timestamptz', nullable: true })
    last_success_at?: Date;

    @Column({ type: 'text', nullable: true })
    last_error?: string;

    @Column({ type: 'integer', default: 0 })
    retry_count: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
