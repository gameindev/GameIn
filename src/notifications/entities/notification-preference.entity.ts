import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    Unique,
    Index,
} from 'typeorm';
import { User } from '../../users/user.entity';
import { NotificationType } from '../enums/notification-type.enum';
import { NotificationChannel } from '../enums/notification-channel.enum';

@Entity('notification_preferences')
@Unique(['user_id', 'type', 'channel'])
@Index(['user_id'])
export class NotificationPreferenceEntity {
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

    @Column({ type: 'boolean', default: true, name: 'enabled' })
    enabled: boolean;

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date;
}

