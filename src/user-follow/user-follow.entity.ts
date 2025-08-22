import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, DeleteDateColumn, Unique, Index, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity('user_follow')
@Unique(['follower', 'following'])
@Index('IDX_follower_following', ['follower', 'following'])
export class UserFollow {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'followerId' })
    @Index()
    follower: User;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'followingId' })
    @Index()
    following: User;

    @CreateDateColumn()
    createdAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
