import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserBio } from "@/users-bio/user-bio.entity";


/**
 * PreferredGames entity.
 */
@Entity()
export class PreferredGames {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @ManyToOne(() => UserBio, userBio => userBio.preferred_games, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'user_bio_id' })
    user_bio: UserBio;

    @Column({
        type: 'varchar',
        nullable: true,
        length:100
    })
    game_url: string;

    @Column({ type: 'int', default: 0 })
    sort_order: number;

    @Column({ type: 'jsonb', nullable: true })
    meta_data: Record<string, any>;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}