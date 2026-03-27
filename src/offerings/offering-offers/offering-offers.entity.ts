import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { Offering } from "../offerings.entity";
import { OfferingCategory } from "../enums/offering-category.enum";
import { SocialPlatform } from "../../social-integration/enums/social-platform.enums";



/**
 * OfferingOffers entity.
 */
@Entity({ name: 'offering_offers' })
@Index('IDX_offerings_offers', ['offering_id', 'offer_type'])
// @Unique('UQ_offering_offer_type', ['offering_id', 'offer_type'])
export class OfferingOffers {
    @PrimaryGeneratedColumn('increment', { type: 'int' })
    id: Number;

    /** FK → offering.id (parent offering) */
    @Column({ type: 'int', name: 'offering_id' })
    offering_id!: Number;

    @ManyToOne(() => Offering, (o) => o.offering_offers, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'offering_id' })
    offering!: Offering;

    /** Media type: LOGO_STREAM | VIDEO_COMMERCIAL | SOCIAL_POST | MERCHANDISE */
    @Column({ type: 'enum', enum: OfferingCategory, name: 'offer_type' })
    offer_type!: OfferingCategory;

    /** SocialPlatform enum value */
    @Column({
        type: 'enum',
        enum: SocialPlatform,
        nullable: true,
    })
    platform?: SocialPlatform;

    /** Time mode: LIVE | VOD | SCHEDULED */
    @Column({
        type: 'varchar',
        length: 50,
        name: 'time_mode',
        nullable: true,
    })
    time_mode?: string;

    /** RRULE/slots/timezone payload (string or JSON string) */
    @Column({ type: 'varchar', nullable: true, length: 30 })
    schedule?: string;

    /** For video commercials: number of repeats */
    @Column({ type: 'varchar', nullable: true, length: 30 })
    repetition?: string;

    /** For video commercials: duration in seconds */
    @Column({ type: 'varchar', nullable: true, length: 30 })
    duration?: string;

    /** Size preset: SMALL | MEDIUM | LARGE | CUSTOM */
    @Column({
        type: 'varchar',
        length: 30,
        nullable: true,
    })
    size?: string;

    /** Optional subtype (e.g., merchandise: t-shirt, cap) */
    @Column({ type: 'varchar', length: 30, name: 'sub_type', nullable: true })
    sub_type?: string;

    @Column({ default: 1 })
    version: number;

    @Column({ type: 'int', name: 'updated_by_user_id', nullable: true })
    updated_by_user_id?: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}