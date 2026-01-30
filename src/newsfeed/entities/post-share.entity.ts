import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
    Index,
} from 'typeorm';
import { Post } from './post.entity';
import { User } from '../../users/user.entity';

/**
 * PostShare entity for tracking shares of posts
 */
@Entity('post_shares')
@Index(['post_id', 'created_at'])
@Index(['user_id', 'created_at'])
export class PostShare {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'post_id' })
    @Index()
    post_id: number;

    @ManyToOne(() => Post, (post) => post.shares, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'post_id' })
    post: Post;

    @Column({ name: 'user_id' })
    @Index()
    user_id: number;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({
        type: 'text',
        nullable: true,
    })
    comment: string; // Optional comment when sharing

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;
}

