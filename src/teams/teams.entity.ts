
import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TeamLinks } from "./team-links/team-links.entity";
import { TeamMembers } from "./team-members/team-members.entity";
import { UploadEntity } from "../uploads/upload.entity";
import { User } from "../users/user.entity";
import { PaymentProvider } from "../offerings/enums/payment-provider.enum";

/**
 * Team entity.
 */

@Entity({ name: "teams" })
export class Team {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 150,
        nullable: false
    })
    display_name: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: true
    })
    website: string;

    @Column({
        type: 'text',
        nullable: true
    })
    bio: string

    @OneToOne(() => UploadEntity, { nullable: true, eager: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'profile_image_id' })
    profile_image: UploadEntity;

    @OneToOne(() => UploadEntity, { nullable: true, eager: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'cover_image_id' })
    cover_image: UploadEntity;

    @Index("idx_teams_admin")
    @OneToOne(() => User, { nullable: false, eager: true, onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'admin_user_id' })
    admin: User;

    @Column({
        type: 'enum',
        enum: PaymentProvider,
        nullable: true,
        enumName: "payment_provider_enum"
    })
    payment_provider: PaymentProvider;

    @Column({
        type: 'varchar',
        length: 128,
        nullable: true
    })
    payment_provider_account: string

    @OneToMany(() => TeamMembers, m => m.team, { cascade: ['insert', 'update'] })
    members: TeamMembers[];

    @OneToMany(() => TeamLinks, l => l.team, { cascade: ['insert', 'update'] })
    links: TeamLinks[];

    @CreateDateColumn({
        type: 'timestamptz'
    })
    created_at: Date;

    @UpdateDateColumn({
        type: 'timestamptz'
    })
    updated_at: Date;

    @DeleteDateColumn({
        type: 'timestamptz',
        nullable: true
    })
    deleted_at: Date | null;

}