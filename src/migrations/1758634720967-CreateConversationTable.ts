import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateConversationTable1758634720967 implements MigrationInterface {
    name = 'CreateConversationTable1758634720967'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "conversation" (
                "id" SERIAL NOT NULL PRIMARY KEY,
                "created_at" timestamp DEFAULT now() NOT NULL,
                "updated_at" timestamp DEFAULT now() NOT NULL,
                "deleted_at" timestamp,
                -- optional: type, title for group chats later
                type varchar(20) DEFAULT 'DIRECT',
                title varchar(120)
            );

            CREATE INDEX "IDX_conversation_createdAt" ON "conversation" ("created_at");
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX IF EXISTS "IDX_conversation_createdAt";
            DROP TABLE "conversation";
        `);
    }

}
