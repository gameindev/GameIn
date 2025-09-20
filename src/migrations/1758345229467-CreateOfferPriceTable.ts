import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOfferPriceTable1758345229467 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "offering_price" (
                id SERIAL NOT NULL PRIMARY KEY,
                offering_id integer NOT NULL,
                price varchar(30),
                platform_fee varchar(30),
                tax varchar(30),
                total varchar(30),
                payment_provider payment_provider_enum,
                "created_at" timestamp DEFAULT now() NOT NULL,
                "updated_at" timestamp DEFAULT now() NOT NULL,
                "deleted_at" timestamp,
                
                CONSTRAINT "UQ_price_offering_id" UNIQUE ("offering_id"),
                CONSTRAINT "FK_861cr6e08503b30aa145ed06713" FOREIGN KEY ("offering_id") REFERENCES "offerings"(id) ON DELETE CASCADE
            );

            CREATE INDEX "IDX_offering_price_offer" ON "offering_price" ("offering_id");
        `);   
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX "IDX_offering_price_offer";
            DROP TABLE IF EXISTS "offering_price";
        `);
    }

}
