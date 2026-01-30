import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    Index,
} from 'typeorm';
import { User } from '../../users/user.entity';
import { NotificationType } from '../enums/notification-type.enum';
import { NotificationChannel } from '../enums/notification-channel.enum';
import { NotificationStatus } from '../enums/notification-status.enum';

@Entity('notifications')
@Index(['user_id', 'status'])
@Index(['user_id', 'created_at'])
@Index(['channel', 'status'])
export class NotificationEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'user_id' })
    @Index()
    user_id: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({
        type: 'enum',
        enum: NotificationType,
        name: 'type',
    })
    type: NotificationType;

    @Column({
        type: 'enum',
        enum: NotificationChannel,
        name: 'channel',
    })
    channel: NotificationChannel;

    @Column({
        type: 'enum',
        enum: NotificationStatus,
        default: NotificationStatus.PENDING,
        name: 'status',
    })
    @Index()
    status: NotificationStatus;

    @Column({ type: 'varchar', length: 255, name: 'title' })
    title: string;

    @Column({ type: 'text', name: 'message' })
    message: string;

    @Column({ type: 'jsonb', nullable: true, name: 'data' })
    data: Record<string, any>;

    @Column({ type: 'jsonb', nullable: true, name: 'metadata' })
    metadata: Record<string, any>;

    @Column({ type: 'varchar', length: 255, nullable: true, name: 'external_id' })
    external_id: string; // ID from external service (email provider, SMS provider, etc.)

    @Column({ type: 'timestamp', nullable: true, name: 'sent_at' })
    sent_at: Date;

    @Column({ type: 'timestamp', nullable: true, name: 'delivered_at' })
    delivered_at: Date;

    @Column({ type: 'timestamp', nullable: true, name: 'read_at' })
    read_at: Date;

    @Column({ type: 'text', nullable: true, name: 'error_message' })
    error_message: string;

    @Column({ type: 'int', default: 0, name: 'retry_count' })
    retry_count: number;

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date;
}

