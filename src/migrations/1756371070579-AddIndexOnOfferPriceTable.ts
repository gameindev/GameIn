import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIndexOnOfferPriceTable1756371070579 implements MigrationInterface {
    name = 'AddIndexOnOfferPriceTable1756371070579'

    public async up(queryRunner: QueryRunner): Promise<void> {          

        await queryRunner.query(`
            CREATE INDEX "IDX_offering_price_offer" ON "offering_price" ("offering_id");
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {       

        await queryRunner.query(`
            DROP INDEX "IDX_offering_price_offer";
        `);
    }

}
