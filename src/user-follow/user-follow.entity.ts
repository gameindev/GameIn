import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, DeleteDateColumn, Unique, Index, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity('user_follow')
@Unique(['follower', 'following'])
@Index('IDX_follower_following', ['follower', 'following'])
export class UserFollow {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'follower_id' })
    @Index()
    follower: User;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'following_id' })
    @Index()
    following: User;

    @CreateDateColumn()
    created_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}
