import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIsLoggedInColumnToUserTable1761762733788 implements MigrationInterface {
    name = 'AddIsLoggedInColumnToUserTable1761762733788'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "is_logged_in" boolean DEFAULT false;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN IF EXISTS "is_logged_in";
        `);
    }

}
