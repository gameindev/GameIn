import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOutboxEventTable1759001100000 implements MigrationInterface {
    name = 'CreateOutboxEventTable1759001100000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "outbox_event" (
                id SERIAL PRIMARY KEY,
                topic varchar(200) NOT NULL,
                payload text NOT NULL,
                status varchar(20) NOT NULL DEFAULT 'PENDING',
                created_at timestamp NOT NULL DEFAULT now(),
                processed_at timestamp NULL
            );
            CREATE INDEX IF NOT EXISTS "IDX_outbox_status_id" ON "outbox_event" (status, id);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX IF EXISTS "IDX_outbox_status_id";
            DROP TABLE IF EXISTS "outbox_event";
        `);
    }
}

