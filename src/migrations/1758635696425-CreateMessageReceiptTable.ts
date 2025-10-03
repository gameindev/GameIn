import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMessageReceiptTable1758635696425 implements MigrationInterface {
    name = 'CreateMessageReceiptTable1758635696425'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "message_receipt" (
                "id" SERIAL NOT NULL PRIMARY KEY,
                "message_id" integer NOT NULL,
                "user_id" integer NOT NULL,             -- recipient
                "delivered_at" timestamp,
                "read_at" timestamp,
                "created_at" timestamp DEFAULT now() NOT NULL,
                CONSTRAINT "UQ_message_receipt_unique" UNIQUE ("message_id","user_id"),
                CONSTRAINT "FK_receipt_message" FOREIGN KEY ("message_id")
                REFERENCES "message"(id) ON DELETE CASCADE ON UPDATE CASCADE,
                CONSTRAINT "FK_receipt_user" FOREIGN KEY ("user_id")
                REFERENCES "users"(id) ON DELETE CASCADE ON UPDATE CASCADE
            );

            CREATE INDEX "IDX_receipt_message" ON "message_receipt" ("message_id");
            CREATE INDEX "IDX_receipt_users" ON "message_receipt" ("user_id");
            CREATE INDEX "IDX_receipt_readAt" ON "message_receipt" ("read_at");
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX IF EXISTS "IDX_receipt_readAt";
            DROP INDEX IF EXISTS "IDX_receipt_users";
            DROP INDEX IF EXISTS "IDX_receipt_message";
            DROP TABLE "message_receipt";
        `);
    }

}
