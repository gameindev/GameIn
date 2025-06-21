import { UserBio } from "src/users-bio/user-bio.entity";
import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class PreferredGames {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @ManyToOne(() => UserBio, userBio => userBio.preferredGames, {
        onDelete: 'CASCADE'
    })
    @JoinColumn()
    userBio: UserBio;

    @Column({
        type: 'text',
        nullable: true,
    })
    gameUrl: string;

    @Column({ type: 'int', default: 0 })
    sortOrder: number;

    @CreateDateColumn()
    createdAt: Date;
    
    @UpdateDateColumn() 
    updatedAt: Date;
    
}