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
import { User } from '../../users/user.entity';
import { PostType } from '../enums/post-type.enum';
import { PostVisibility } from '../enums/post-visibility.enum';
import { PostSource } from '../enums/post-source.enum';
import { PostMedia } from './post-media.entity';
import { PostLike } from './post-like.entity';
import { PostComment } from './post-comment.entity';
import { PostShare } from './post-share.entity';

/**
 * Post entity for newsfeed system
 * Supports text, images, videos, audio, and mixed content
 */
@Entity('posts')
@Index(['user_id', 'created_at'])
@Index(['user_id', 'visibility', 'created_at'])
@Index(['visibility', 'created_at'])
@Index(['type', 'created_at'])
@Index(['source', 'created_at'])
@Index(['source', 'system_category', 'created_at'])
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'user_id', nullable: true })
    @Index()
    user_id: number | null; // Null for system posts

    @ManyToOne(() => User, { onDelete: 'CASCADE', nullable: true })
    @JoinColumn({ name: 'user_id' })
    user: User | null; // Null for system posts

    @Column({
        type: 'enum',
        enum: PostType,
        default: PostType.TEXT,
        name: 'type',
    })
    type: PostType;

    @Column({
        type: 'enum',
        enum: PostVisibility,
        default: PostVisibility.PUBLIC,
        name: 'visibility',
    })
    visibility: PostVisibility;

    @Column({
        type: 'enum',
        enum: PostSource,
        default: PostSource.USER,
        name: 'source',
    })
    source: PostSource; // user or system

    @Column({
        type: 'varchar',
        length: 255,
        nullable: true,
        name: 'system_category',
    })
    system_category: string; // e.g., 'announcement', 'update', 'maintenance', 'feature'

    @Column({
        type: 'text',
        nullable: true,
    })
    content: string; // Text content of the post

    @Column({
        type: 'text',
        nullable: true,
        name: 'location',
    })
    location: string; // Optional location tag

    @Column({
        type: 'jsonb',
        nullable: true,
        name: 'hashtags',
    })
    hashtags: string[]; // Array of hashtags

    @Column({
        type: 'jsonb',
        nullable: true,
        name: 'mentions',
    })
    mentions: number[]; // Array of user IDs mentioned in the post

    @Column({
        type: 'jsonb',
        nullable: true,
        name: 'metadata',
    })
    metadata: Record<string, any>; // Additional metadata (e.g., video duration, image dimensions)

    @Column({
        type: 'int',
        default: 0,
        name: 'like_count',
    })
    like_count: number; // Cached count for performance

    @Column({
        type: 'int',
        default: 0,
        name: 'comment_count',
    })
    comment_count: number; // Cached count for performance

    @Column({
        type: 'int',
        default: 0,
        name: 'share_count',
    })
    share_count: number; // Cached count for performance

    @Column({
        type: 'int',
        nullable: true,
        name: 'parent_post_id',
    })
    parent_post_id: number; // For reply posts or thread posts

    @ManyToOne(() => Post, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'parent_post_id' })
    parent_post: Post;

    @OneToMany(() => Post, (post) => post.parent_post)
    child_posts: Post[];

    @OneToMany(() => PostMedia, (media) => media.post, { cascade: true })
    media: PostMedia[];

    @OneToMany(() => PostLike, (like) => like.post, { cascade: true })
    likes: PostLike[];

    @OneToMany(() => PostComment, (comment) => comment.post, { cascade: true })
    comments: PostComment[];

    @OneToMany(() => PostShare, (share) => share.post, { cascade: true })
    shares: PostShare[];

    @Column({
        type: 'boolean',
        default: false,
        name: 'is_pinned',
    })
    is_pinned: boolean; // For pinning posts to top of profile

    @Column({
        type: 'boolean',
        default: false,
        name: 'is_edited',
    })
    is_edited: boolean; // Track if post was edited

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date;

    @DeleteDateColumn({ name: 'deleted_at' })
    deleted_at: Date;
}

