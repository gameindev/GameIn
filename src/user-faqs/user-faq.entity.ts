import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

/**
 * User FAQ Entity
 * Stores frequently asked questions for user profiles
 */
@Entity('user_faqs')
export class UserFaq {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @ManyToOne(() => User, (user) => user.faqs, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({
        type: 'varchar',
        length: 500,
        nullable: false,
    })
    question: string;

    @Column({
        type: 'text',
        nullable: false,
    })
    answer: string;

    @Column({
        type: 'int',
        default: 0,
        nullable: false,
    })
    order: number; // For ordering FAQs (lower number appears first)

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}

