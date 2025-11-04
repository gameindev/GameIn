import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ConversationType } from "./enum/conversation-type.enum";
import { ConversationParticipantEntity } from "./conversation-participant.entity";


@Entity('conversation')
export class ConversationEntity { 
    @PrimaryGeneratedColumn()
    id: number;


    @Column({ type: 'varchar', length: 120, nullable: true, default: null })
    title?: string;

    @Column({ type: 'enum', enum: ConversationType, default: ConversationType.DIRECT })
    type: ConversationType;

    @OneToMany(() => ConversationParticipantEntity, participant => participant.conversation)
    participants: ConversationParticipantEntity[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}