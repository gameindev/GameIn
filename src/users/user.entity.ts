/* eslint-disable */

import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserType } from "./enums/user-type.enums";
import { Exclude } from "class-transformer";
import { CreatorProfile } from "../creator-profiles/creator-profile.entity";
import { BrandProfile } from "../brand-profiles/brand-profile.entity";
import { UserBio } from "../users-bio/user-bio.entity";
import { SocialIntegration } from "../social-integration/entities/social-integration.entity";
import { UserFavourite } from "../user-favourite/user-favourite.entity";
import { UserFaq } from "../user-faqs/user-faq.entity";

/**
 * User entity.
 */
@Entity('users')
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
        unique: true
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

    @OneToMany(() => UserFaq, (faq) => faq.user, {
        cascade: true,
        eager: false,
    })
    faqs: UserFaq[];

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
        type: 'boolean',
        default: false,
        nullable: true,
    })
    is_logged_in?: boolean;

    @Column({
        default: null,
        nullable: true
    })
    @Exclude()
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

    @OneToMany(() => UserFavourite, userFavourite => userFavourite.user)
    favourites: UserFavourite[];

    @OneToMany(() => UserFavourite, userFavourite => userFavourite.favourite_user)
    favourited_by: UserFavourite[];

    @Column({
        type: 'varchar',
        length: 30,
        nullable: true,
    })
    timezone?: string;

    @Column({
        type: 'varchar',
        length: 10,
        nullable: true,
    })
    language?: string;
    


    // ratingReceived: UserRating[];
    // ratingGiven: UserRating[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}