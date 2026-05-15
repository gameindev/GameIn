import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { OfferingOrder } from '../offerings-order/offering-order.entity';
import { User } from '../users/user.entity';

@Entity({ name: 'sponsorship_feedback' })
export class SponsorshipFeedback {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int', name: 'offering_order_id', unique: true })
    offering_order_id: number;

    @ManyToOne(() => OfferingOrder, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'offering_order_id' })
    offering_order: OfferingOrder;

    @Column({ type: 'int', name: 'offering_id' })
    offering_id: number;

    @Column({ type: 'int', name: 'brand_user_id' })
    brand_user_id: number;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'brand_user_id' })
    brand: User;

    @Column({ type: 'int', name: 'creator_user_id' })
    creator_user_id: number;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'creator_user_id' })
    creator: User;

    @Column({ type: 'jsonb' })
    scores: Record<string, number>;

    @Column({ type: 'numeric', precision: 5, scale: 2, name: 'average_score' })
    average_score: string;

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;
}
