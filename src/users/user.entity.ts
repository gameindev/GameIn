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
    google_id?: string;

    @Column({
        type: "enum",
        enum: UserType,
        default: null,
        nullable: true,
    })
    user_type?: UserType;

    @Column({
        type: 'date',
        nullable: true,
    })
    date_of_birth?: string;

    @OneToOne(() => CreatorProfile, creatorProfile => creatorProfile.user, {
        cascade: true,
        nullable: true,
    })
    creator_profile: CreatorProfile;

    @OneToOne(() => BrandProfile, brandProfile => brandProfile.user, {
        cascade: true,
        nullable: true,
    })
    brand_profile: BrandProfile;
    
    // faqs: UserFaq[];

    @Column({
        default: true,
        nullable: true,
    })
    is_active?: boolean;

    @Column({
        default: false,
        nullable: true,
    })
    is_verified?: boolean;

    @Column({
        default: true,
        nullable: true,
    })
    is_first?: boolean;

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
    user_bio: UserBio;

    @OneToMany(() => SocialIntegration, socialIntegration => socialIntegration.user, {
        cascade: true,
        eager: true,
    })
    social_integrations: SocialIntegration[];

    
    
    // ratingReceived: UserRating[];
    // ratingGiven: UserRating[];

    @CreateDateColumn()
    created_at: Date;
    
    @UpdateDateColumn()
    updated_at: Date;   
    
    @DeleteDateColumn()
    deleted_at: Date;
}