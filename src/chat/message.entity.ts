import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ConversationEntity } from "./chat.entity";
import { User } from "../users/user.entity";
import { MessageType } from "./enum/message-type.enum";
import { UploadEntity } from "../uploads/upload.entity";


@Entity('message')
@Index(['conversation', 'created_at'])
export class MessageEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => ConversationEntity)
    @JoinColumn({ name: 'conversation_id' })
    conversation: ConversationEntity;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'sender_id' })
    sender: User;

    @Column({ type: 'enum', enum: MessageType, default: MessageType.TEXT })
    type: MessageType;

    @Column({ type: 'text', nullable: true })
    content: string;

    @Column({ type: 'jsonb', nullable: true })
    json_data?: Record<string, any>;

    @ManyToOne(() => UploadEntity)
    @JoinColumn({ name: 'attachment_id' })
    attachment?: UploadEntity;

    @Column({ type: 'varchar', length: 64, unique: true, nullable: false })
    client_msg_id: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at?: Date;

}