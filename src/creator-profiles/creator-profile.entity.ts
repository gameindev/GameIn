import { User } from "src/users/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

/**
 * Creator Profile Entity
 */
@Entity()
export class CreatorProfile {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @OneToOne(() => User, user => user.creatorProfile)
    @JoinColumn()
    user: User

    @Column({
        length: 30,
        nullable: true,
    })
    firstName: string;

    @Column({
        length: 30,
        nullable: true,
    })
    lastName: string;

    @Column({
        length: 10,
        nullable: true,
    })
    gender: string;

    @Column({
        type: 'text',
        nullable: true,
    })
    profileImage: string;

    @Column({
        type: 'text',
        nullable: true,
    })
    coverImage: string;

    @Column({
        length: 30,
        nullable: true,
    })
    country: string;

    @Column({
        length: 20,
        nullable: true,
    })
    contact: string;

    @Column({
        type: 'text',
        nullable: true,
    })
    website: string;

    @Column({
        type: 'bigint',
        nullable: true,
        default: 0,
    })
    followers: number;

    @Column({
        type: 'bigint',
        nullable: true,
        default: 0,
    })
    views: number;

    @Column({
        type: 'bigint',
        nullable: true,
        default: 0,
    })
    rank: number;

    // bio: UserBio
    // socialStats: UserSocialStats

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}