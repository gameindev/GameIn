import { Check, Column, CreateDateColumn, DeleteDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OfferingType } from "./enums/offering-type.enum";
import { EventType } from "./enums/event-type.enum";
import { OfferingStatus } from "./enums/offering-status.enum";
import { OfferingOffers } from "./offering-offers/offering-offers.entity";
import { OfferingPrice } from "./offering-price/offering-price.entity";
import { UploadEntity } from "src/uploads/upload.entity";
import { User } from "src/users/user.entity";


/**
 * Offerings entity.
 */
@Entity({ name: 'offerings' })
@Check(`"org_funds" >= 0`)
export class Offering {
    @PrimaryGeneratedColumn()
    id: number;

    @Index('idx_offering_user_id')
    @ManyToOne(() => User, { nullable: true, eager: false, cascade: ['insert', 'update'],  onDelete: 'SET NULL', })
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: User;

    @Index()
    @Column({
        type: 'enum',
        enum: OfferingType,
        enumName: 'offering_type_enum',
        nullable: false,
    })
    type: OfferingType;

    @Column({ type: 'varchar', length: 160, nullable: false })
    title: string;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @Column({ type: 'varchar', length: 30, nullable: true })
    stream_platform?: string;

    @Column({ type: 'timestamptz', nullable: false })
    start_date: Date;

    @Column({ type: 'timestamptz', nullable: false })
    end_date: Date;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: true,
    })
    event_type?: string;

    @Column({ type: 'varchar', length: 80, nullable: true })
    game?: string;

    @Column({ type: 'integer', nullable: true })
    estimated_views?: number;

    @Column({ type: 'integer', nullable: true })
    team_id?: number;

    @Column({
        type: 'numeric',
        precision: 12,
        scale: 2,
        default: 0,
        nullable: true,
    })
    org_funds?: string;

    @Column({ type: 'text', nullable: true })
    notes?: string;

    @Column({ type: 'text', nullable: true })
    terms_of_use?: string;

    @Column({ type: 'boolean', default: false, nullable: false })
    is_terms_signed: boolean;

    @Column({ type: 'boolean', default: false, nullable: false })
    can_edit: boolean;

    @OneToOne(() => UploadEntity, { nullable: true, eager: true, cascade: true })
    @JoinColumn({name: "upload_logo_id"})
    logo?: UploadEntity;

    @Index()
    @Column({
        type: 'enum',
        enum: OfferingStatus,
        enumName: 'offering_status_enum',
        nullable: false,
    })
    status: OfferingStatus;

    @Column({ type: 'jsonb', nullable: true })
    meta_data?: Record<string, any>;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;


    @OneToMany(() => OfferingOffers, (m) => m.offering)
    offering_offers!: OfferingOffers[];

    @OneToOne(() => OfferingPrice, (m) => m.offering)
    offering_price!: OfferingPrice;
}