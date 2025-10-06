
import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UploadEntity } from "@/uploads/upload.entity";
import { User } from "@/users/user.entity";

/**
 * Creator Profile Entity
 */
@Entity()
export class CreatorProfile {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @OneToOne(() => User, user => user.creator_profile, {
        onDelete: 'CASCADE',
    }) 
    @JoinColumn({ name: 'user_id' })
    user: User

    @Column({
        type: 'varchar',
        length: 30,
        nullable: true,
    })
    first_name: string;

    @Column({
        type: 'varchar',
        length: 30,
        nullable: true,
    })
    last_name: string;

    @Column({
        type: 'varchar',
        length: 10,
        nullable: true,
    })
    gender: string;


    @OneToOne(() => UploadEntity, { nullable: true, eager: true, cascade: true })
    @JoinColumn({ name: 'profile_image_id' })
    profile_image: UploadEntity;


    @OneToOne(() => UploadEntity, { nullable: true, eager: true, cascade: true })
    @JoinColumn({ name: 'cover_image_id' })
    cover_image: UploadEntity;

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
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;   
}