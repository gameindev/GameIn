import { Query } from '@nestjs/common';
import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOfferPriceTable1756370268965 implements MigrationInterface {
    name = 'CreateOfferPriceTable1756370268965'

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
                
                CONSTRAINT "UQ_861c3er508503b30aa145e0245" UNIQUE ("offering_id"),
                CONSTRAINT "FK_861cr6e08503b30aa145ed06713" FOREIGN KEY ("offering_id") REFERENCES "offerings"(id) ON DELETE CASCADE
            );
        `);    
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS "offering_price";
        `)
    }

}
