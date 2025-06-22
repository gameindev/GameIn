import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { SocialPlatform } from "../enums/social-platform.enums";
import { User } from "src/users/user.entity";

@Entity()
export class SocialIntegration {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @ManyToOne(() => User, user => user.socialIntegrations, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }) 
    @JoinColumn({ name: 'userId' })
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
}
