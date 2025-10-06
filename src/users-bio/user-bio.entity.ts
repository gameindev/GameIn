import { PreferredGames } from "@/preferred-games/preferred-games.entity";
import { User } from "@/users/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


/**
 * UserBio entity.
 */
@Entity()
export class UserBio {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'text',
        nullable: true,
    })
    bio: string;

    @Column({
        type: 'text',
        nullable: true,
    })
    video_bio_url: string;


    @Index()
    @OneToOne(() => User, user => user.user_bio, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'user_id' })
    user: User


    @OneToMany(() => PreferredGames, preferredGame => preferredGame.user_bio, {
        cascade: true,
        eager: true,
        nullable: true,
    })
    preferred_games?: PreferredGames[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

}