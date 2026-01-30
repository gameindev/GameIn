import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
    Index,
    Unique,
} from 'typeorm';
import { Post } from './post.entity';
import { User } from '../../users/user.entity';

/**
 * PostLike entity for tracking likes on posts
 */
@Entity('post_likes')
@Unique(['post_id', 'user_id'])
@Index(['post_id', 'created_at'])
@Index(['user_id', 'created_at'])
export class PostLike {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'post_id' })
    @Index()
    post_id: number;

    @ManyToOne(() => Post, (post) => post.likes, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'post_id' })
    post: Post;

    @Column({ name: 'user_id' })
    @Index()
    user_id: number;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;
}

