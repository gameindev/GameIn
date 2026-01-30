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
import { UploadEntity } from '../../uploads/upload.entity';
import { MediaType } from '../enums/media-type.enum';

/**
 * PostMedia entity for storing media attachments to posts
 */
@Entity('post_media')
@Index(['post_id', 'order'])
export class PostMedia {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'post_id' })
    @Index()
    post_id: number;

    @ManyToOne(() => Post, (post) => post.media, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'post_id' })
    post: Post;

    @Column({ name: 'upload_id' })
    @Index()
    upload_id: number;

    @ManyToOne(() => UploadEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'upload_id' })
    upload: UploadEntity;

    @Column({
        type: 'enum',
        enum: MediaType,
        name: 'media_type',
    })
    media_type: MediaType;

    @Column({
        type: 'int',
        default: 0,
        name: 'order',
    })
    order: number; // Order of media in the post (for multiple media)

    @Column({
        type: 'varchar',
        length: 500,
        nullable: true,
        name: 'caption',
    })
    caption: string; // Optional caption for individual media

    @Column({
        type: 'jsonb',
        nullable: true,
        name: 'metadata',
    })
    metadata: Record<string, any>; // Additional metadata (e.g., thumbnail URL, duration)

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;
}

