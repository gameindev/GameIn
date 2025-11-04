import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCountryToBrandProfileTable1761542673210 implements MigrationInterface {
    name = 'AddCountryToBrandProfileTable1761542673210'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "brand_profile" ADD COLUMN IF NOT EXISTS "country" varchar(30) DEFAULT NULL;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "brand_profile" DROP COLUMN IF EXISTS "country";
        `);
    }

}
