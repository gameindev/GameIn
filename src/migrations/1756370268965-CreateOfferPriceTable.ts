import { Query } from '@nestjs/common';
import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOfferPriceTable1756370268965 implements MigrationInterface {
    name = 'CreateOfferPriceTable1756370268965'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DO $$ BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relname = 'offering_price_id_seq') THEN
                    CREATE SEQUENCE offering_price_id_seq START 1;
                END IF;
            END $$;

            CREATE TABLE IF NOT EXISTS "offering_price" (
                id integer NOT NULL DEFAULT nextval('offering_price_id_seq'),
                offering_id integer NOT NULL,
                price varchar(30),
                platform_fee varchar(30),
                tax varchar(30),
                total varchar(30),
                payment_provider payment_provider_enum,
                "createdAt" timestamp DEFAULT now() NOT NULL,
                "updatedAt" timestamp DEFAULT now() NOT NULL,

                CONSTRAINT "PK_6a0e01b4d57f28742348467a345" PRIMARY KEY (id),
                CONSTRAINT "REL_861c3er508503b30aa145e0245" UNIQUE ("offering_id"),
                CONSTRAINT "FK_861cr6e08503b30aa145ed06713" FOREIGN KEY ("offering_id") REFERENCES "offerings"(id) ON DELETE CASCADE
            );
        `);    
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS "offering_price";
            DROP SEQUENCE IF EXISTS offering_price_id_seq;
        `)
    }

}
