import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnUpdateByUserToOfferingOffersTable1758345943317 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "offering_offers"
            ADD COLUMN "updated_by_user_id" INTEGER;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
         await queryRunner.query(`
            ALTER TABLE "offering_offers"
            DROP COLUMN "updated_by_user_id";
        `);
    }

}
