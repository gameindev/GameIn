import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDateColumnsToOfferingOffers1758245151404 implements MigrationInterface {
    name = 'AddDateColumnsToOfferingOffers1758245151404'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "offering_offers"
            ADD COLUMN "created_at" TIMESTAMP DEFAULT now();
        `);
        await queryRunner.query(`
            ALTER TABLE "offering_offers"
            ADD COLUMN "updated_at" TIMESTAMP DEFAULT now();
        `); 
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "offering_offers"
            DROP COLUMN "created_at";   
        `);
        await queryRunner.query(`
            ALTER TABLE "offering_offers"
            DROP COLUMN "updated_at";
        `);
    }

}
