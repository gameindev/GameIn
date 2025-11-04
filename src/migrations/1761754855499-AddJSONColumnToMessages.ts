import { MigrationInterface, QueryRunner } from "typeorm";

export class AddJSONColumnToMessages1761754855499 implements MigrationInterface {
    name = 'AddJSONColumnToMessages1761754855499'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Add JSONB column for JSON messages
        await queryRunner.query(`
            ALTER TABLE "message" 
            ADD COLUMN IF NOT EXISTS "json_data" JSONB;
        `);

        // Add index on json_data for efficient querying (optional, but recommended)
        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "IDX_message_json_data" ON "message" USING GIN ("json_data");
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX IF EXISTS "IDX_message_json_data";
        `);
        await queryRunner.query(`
            ALTER TABLE "message" DROP COLUMN IF EXISTS "json_data";
        `);
    }

}
