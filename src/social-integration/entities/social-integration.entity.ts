import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { SocialPlatform } from "../enums/social-platform.enums";
import { User } from "src/users/user.entity";

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

    @Column({ type: 'text', nullable: true })
    access_token?: string;

    @Column({ type: 'text', nullable: true })
    refresh_token?: string;

    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn()
    updated_at?: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}
