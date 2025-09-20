import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDateColumnsToOfferingOffersTable1758345893102 implements MigrationInterface {

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
