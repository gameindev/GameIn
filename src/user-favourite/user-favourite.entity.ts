import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, Unique, Index, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';


/**
 * UserFavourite entity.
 */
@Entity('user_favourite')
@Unique(['user', 'favourite_user'])
@Index('IDX_user_favourite_user_favourite', ['user', 'favourite_user'])
export class UserFavourite {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    @Index()
    user: User;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'favourite_user_id' })
    @Index()
    favourite_user: User;

    @CreateDateColumn()
    created_at: Date;
}