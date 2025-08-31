import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRefundStatusEnum1756618183116 implements MigrationInterface {
    name = 'CreateRefundStatusEnum1756618183116'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DO $$ BEGIN
                IF NOT EXISTS (
                    SELECT 1 FROM pg_type WHERE typname = 'refund_status_enum'
                ) THEN
                    CREATE TYPE "refund_status_enum" AS ENUM ('SUCCEEDED','FAILED','CANCELED','PROCESSING');
                END IF; 
            END $$;    
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TYPE IF EXISTS "refund_status_enum";`);
    }

}
