import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { SocialPlatform } from "../enums/social-platform.enums";
import { User } from "../../users/user.entity";
import { Exclude } from "class-transformer";
import { tokenEncryptionTransformer } from "../utils/token-encryption.transformer";



/**
 * SocialMediaIntegration entity.
 */
@Entity()
export class SocialIntegration {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @ManyToOne(() => User, user => user.social_integrations, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }) 
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({
        type: 'enum',
        enum: SocialPlatform,
        nullable: true,
    })
    platform?: SocialPlatform; 

    @Column({ type: 'text', nullable: true })
    social_id?: string;

    @Exclude()
    @Column({ type: 'text', nullable: true, transformer: tokenEncryptionTransformer })
    access_token?: string;

    @Exclude()
    @Column({ type: 'text', nullable: true, transformer: tokenEncryptionTransformer })
    refresh_token?: string;

    @Column({ type: 'timestamptz', nullable: true })
    token_expires_at?: Date;

    @Column({ type: 'text', nullable: true })
    scope_granted?: string;

    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn()
    updated_at?: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}
