import { Upload } from "src/uploads/upload.entity";
import { UserBio } from "src/users-bio/user-bio.entity";
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
    @OneToOne(() => User, user => user.creatorProfile, {
        onDelete: 'CASCADE',
    }) 
    @JoinColumn()
    user: User

    @Column({
        type: 'varchar',
        length: 30,
        nullable: true,
    })
    firstName: string;

    @Column({
        type: 'varchar',
        length: 30,
        nullable: true,
    })
    lastName: string;

    @Column({
        type: 'varchar',
        length: 10,
        nullable: true,
    })
    gender: string;


    @OneToOne(() => Upload, { nullable: true, eager: true, cascade: true })
    @JoinColumn()
    profileImage: Upload;


    @OneToOne(() => Upload, { nullable: true, eager: true, cascade: true })
    @JoinColumn()
    coverImage: Upload;

    @Column({
        type: 'varchar',
        length: 30,
        nullable: true,
    })
    country: string;

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


    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}