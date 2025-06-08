import { User } from "src/users/user.entity";
import { Column, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";


/**
 * UserBio entity.
 */
@Entity()
export class UserBio {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'text',
        nullable: true,
    })
    bio: string;

    @Column({
        type: 'text',
        nullable: true,
    })
    videoBioUrl: string;


    @Index()
    @OneToOne(() => User, user => user.userBio, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }) 
    @JoinColumn()
    user: User
    
}