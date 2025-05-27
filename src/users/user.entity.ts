/* eslint-disable */

import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserType } from "./enums/user-type.enums";
import { CreatorProfile } from "src/creator-profiles/creator-profile.entity";
import { BrandProfile } from "src/brand-profiles/brand-profile.entity";

/**
 * User entity.
 */
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 30,
        unique: true,
        nullable: false,
    })
    username: string;

    @Column({
        length: 96,
        unique: true,
        nullable: false,
    })
    email: string;

    @Column({
        length: 96,
        nullable: false,
    })
    password: string;

    @Column({
        type: "enum",
        enum: UserType,
        default: UserType.USER,
        nullable: false,
    })
    userType: UserType;

    @Column({
        type: 'date',
        nullable: false,
    })
    dateOfBirth: string;

    @OneToOne(() => CreatorProfile, creatorProfile => creatorProfile.user, {
        cascade: true,
        nullable: true,
    })
    creatorProfile: CreatorProfile;

    @OneToOne(() => BrandProfile, brandProfile => brandProfile.user, {
        cascade: true,
        nullable: true,
    })
    brandProfile: BrandProfile;
    
    // faqs: UserFaq[];

    @Column({
        default: true,
        nullable: true,
    })
    isActive?: boolean;

    @Column({
        default: false,
        nullable: true,
    })
    isVerified?: boolean;


    
    // ratingReceived: UserRating[];
    // ratingGiven: UserRating[];

    @CreateDateColumn()
    createdAt: Date;
    
    @UpdateDateColumn()
    updatedAt: Date;
    
    @DeleteDateColumn()
    deletedAt: Date;
}