import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { MessageEntity } from "./message.entity";
import { User } from "../users/user.entity";

@Entity('message_receipt')
export class MessageReceiptEntity { 
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => MessageEntity)
    @JoinColumn({ name: 'message_id' })
    message: MessageEntity;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({ type: 'timestamp', nullable: true })
    delivered_at?: Date;

    @Column({ type: 'timestamp', nullable: true })
    read_at?: Date;

    @CreateDateColumn()
    created_at: Date;
}