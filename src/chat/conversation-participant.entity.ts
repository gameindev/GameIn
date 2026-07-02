import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ConversationEntity } from "./chat.entity";
import { User } from "../users/user.entity";


@Entity('conversation_participant')
export class ConversationParticipantEntity { 

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => ConversationEntity, conversation => conversation.participants)
    @JoinColumn({ name: 'conversation_id' })
    conversation: ConversationEntity;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({ type: 'boolean', default: false })
    is_admin: boolean;

    @Column({ type: 'timestamp', nullable: true })
    joined_at: Date;

    @Column({ type: 'timestamp', nullable: true })
    left_at: Date;

    @Column({ type: 'boolean', default: false })
    is_pinned: boolean;

    @Column({ type: 'timestamp', nullable: true })
    cleared_at: Date;

}