import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMoreParametersToUserTable1761541679465 implements MigrationInterface {
    name = 'AddMoreParametersToUserTable1761541679465'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "timezone" character varying DEFAULT NULL;
            ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "language" varchar(10) DEFAULT 'en';

        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN IF EXISTS "timezone";
            ALTER TABLE "users" DROP COLUMN IF EXISTS "language";
        `);
    }

}
