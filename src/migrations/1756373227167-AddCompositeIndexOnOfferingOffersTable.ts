import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCompositeIndexOnOfferingOffersTable1756373227167 implements MigrationInterface {
    name = 'AddCompositeIndexOnOfferingOffersTable1756373227167'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE INDEX "IDX_offerings_offers" ON "offering_offers" ("offering_id", "offer_type");
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            DROP INDEX "IDX_offerings_offers";
        `);
    }

}
