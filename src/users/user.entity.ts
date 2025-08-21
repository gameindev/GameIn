/* eslint-disable */

import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserType } from "./enums/user-type.enums";
import { CreatorProfile } from "src/creator-profiles/creator-profile.entity";
import { BrandProfile } from "src/brand-profiles/brand-profile.entity";
import { Exclude } from "class-transformer";
import { UserBio } from "src/users-bio/user-bio.entity";
import { SocialIntegration } from "src/social-integration/entities/social-integration.entity";

/**
 * User entity.
 */
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 30,
        unique: true,
        nullable: false,
    })
    username: string;

    @Column({
        type: 'varchar',
        length: 96,
        unique: true,
        nullable: false,
    })
    email: string;

    @Column({
        type: 'varchar',
        length: 96,
        nullable: true,
    })
    @Exclude()
    password?: string;

    @Column({
        type: 'text',
        nullable: true,
    })
    @Exclude()
    googleId?: string;

    @Column({
        type: "enum",
        enum: UserType,
        default: null,
        nullable: true,
    })
    userType?: UserType;

    @Column({
        type: 'date',
        nullable: true,
    })
    dateOfBirth?: string;

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

    @Column({
        default: true,
        nullable: true,
    })
    isFirst?: boolean;

    @Column({
        default: null,
        nullable: true
    })
    token?: string;

    @OneToOne(() => UserBio, userBio => userBio.user, {
        cascade: true,
        eager: true,
        nullable: true,
    })
    userBio: UserBio;

    @OneToMany(() => SocialIntegration, socialIntegration => socialIntegration.user, {
        cascade: true,
        eager: true,
    })
    socialIntegrations: SocialIntegration[];
    
    // ratingReceived: UserRating[];
    // ratingGiven: UserRating[];

    @CreateDateColumn()
    createdAt: Date;
    
    @UpdateDateColumn()
    updatedAt: Date;
    
    @DeleteDateColumn()
    deletedAt: Date;
}