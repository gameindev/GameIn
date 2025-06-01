import { User } from "src/users/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

/**
 * Brand Profile Entity
 */
@Entity()
export class BrandProfile {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @OneToOne(() => User, user => user.brandProfile, {
        onDelete: 'CASCADE',
    })
    @JoinColumn()
    user: User;

    @Column({
        type: 'varchar',
        length: 30,
        nullable: true,
    })
    brandName: string;

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
        type: 'text',
        nullable: true,
    })
    headOffice: string;

    @Column({
        type: 'varchar',
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

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

}