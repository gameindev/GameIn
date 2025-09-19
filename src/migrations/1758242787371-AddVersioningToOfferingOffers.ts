import { MigrationInterface, QueryRunner } from "typeorm";

export class AddVersioningToOfferingOffers1758242787371 implements MigrationInterface {
    name = 'AddVersioningToOfferingOffers1758242787371'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "offering_offers"
            ADD COLUMN "version" INTEGER DEFAULT 1;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "offering_offers"
            DROP COLUMN "version";
        `);
    }

}
