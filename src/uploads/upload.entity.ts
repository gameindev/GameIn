import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { FileType } from "./enums/file-types.enum";

@Entity('upload_entity')
export class UploadEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
        length: 1024,
        nullable: false,        
    })
    name: string;

    @Column({
        type: "varchar",
        length: 1024,
        nullable: false,        
    })
    path: string;

    @Column({
        type: "enum",
        enum: FileType,
        default: FileType.IMAGE,
        nullable: false,
    })
    type: string;

    @Column({
        type: "varchar",
        length: 128,
        nullable: false,        
    })
    mime: string;

    @Column({
        type: 'bigint',
        nullable: false,        
    })
    size: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}