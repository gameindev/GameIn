import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    OneToMany,
    JoinColumn,
    Index,
} from 'typeorm';
import { Post } from './post.entity';
import { User } from '../../users/user.entity';

/**
 * PostComment entity for comments on posts
 */
@Entity('post_comments')
@Index(['post_id', 'created_at'])
@Index(['user_id', 'created_at'])
@Index(['parent_comment_id'])
export class PostComment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'post_id' })
    @Index()
    post_id: number;

    @ManyToOne(() => Post, (post) => post.comments, { onDelete: 'CASCADE' })
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
        nullable: false,
    })
    content: string;

    @Column({
        type: 'int',
        nullable: true,
        name: 'parent_comment_id',
    })
    parent_comment_id: number; // For nested/reply comments

    @ManyToOne(() => PostComment, (comment) => comment.replies, { nullable: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'parent_comment_id' })
    parent_comment: PostComment;

    @OneToMany(() => PostComment, (comment) => comment.parent_comment)
    replies: PostComment[];

    @Column({
        type: 'int',
        default: 0,
        name: 'like_count',
    })
    like_count: number; // Cached count for performance

    @Column({
        type: 'int',
        default: 0,
        name: 'reply_count',
    })
    reply_count: number; // Cached count for performance

    @Column({
        type: 'boolean',
        default: false,
        name: 'is_edited',
    })
    is_edited: boolean; // Track if comment was edited

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date;

    @DeleteDateColumn({ name: 'deleted_at' })
    deleted_at: Date;
}

