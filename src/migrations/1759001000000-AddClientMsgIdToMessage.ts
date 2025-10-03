import { MigrationInterface, QueryRunner } from "typeorm";

export class AddClientMsgIdToMessage1759001000000 implements MigrationInterface {
    name = 'AddClientMsgIdToMessage1759001000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "message"
            ADD COLUMN IF NOT EXISTS "client_msg_id" varchar(64);
        `);
        // Unique index but allow multiple NULLs via partial index
        await queryRunner.query(`
            DO $$ BEGIN
                IF NOT EXISTS (
                    SELECT 1 FROM pg_indexes WHERE indexname = 'UQ_message_client_msg_id'
                ) THEN
                    CREATE UNIQUE INDEX "UQ_message_client_msg_id" ON "message" (client_msg_id) WHERE client_msg_id IS NOT NULL;
                END IF;
            END $$;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX IF EXISTS "UQ_message_client_msg_id";
        `);
        await queryRunner.query(`
            ALTER TABLE "message" DROP COLUMN IF EXISTS "client_msg_id";
        `);
    }
}

