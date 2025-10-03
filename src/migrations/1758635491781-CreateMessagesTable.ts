import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMessagesTable1758635491781 implements MigrationInterface {
    name = 'CreateMessagesTable1758635491781'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "message_type_enum" AS ENUM ('TEXT','IMAGE','VIDEO','SYSTEM');

            CREATE TABLE "message" (
                "id" SERIAL NOT NULL PRIMARY KEY,
                "conversation_id" integer NOT NULL,
                "sender_id" integer NOT NULL,
                type "message_type_enum" DEFAULT 'TEXT' NOT NULL,
                content text,                       -- TEXT messages: body here
                "attachment_id" integer,             -- optional FK to your "upload" table
                "created_at" timestamp DEFAULT now() NOT NULL,
                "updated_at" timestamp DEFAULT now() NOT NULL,
                "deleted_at" timestamp,
                CONSTRAINT "FK_message_conversation" FOREIGN KEY ("conversation_id")
                REFERENCES "conversation"(id) ON DELETE CASCADE ON UPDATE CASCADE,
                CONSTRAINT "FK_message_sender_user" FOREIGN KEY ("sender_id")
                REFERENCES "users"(id) ON DELETE CASCADE ON UPDATE CASCADE,
                CONSTRAINT "FK_message_attachment_upload" FOREIGN KEY ("attachment_id")
                REFERENCES "upload_entity"(id) ON DELETE SET NULL ON UPDATE CASCADE
            );

            CREATE INDEX "IDX_message_conversation_createdAt" ON "message" ("conversation_id","created_at");
            CREATE INDEX "IDX_message_sender" ON "message" ("sender_id");
            CREATE INDEX "IDX_message_type" ON "message" (type);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX IF EXISTS "IDX_message_type";
            DROP INDEX IF EXISTS "IDX_message_sender";
            DROP INDEX IF EXISTS "IDX_message_conversation_createdAt";
            DROP TABLE "message";
            DROP TYPE "message_type_enum";
        `);
    }

}
