import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOfferingOffersTable1758345439313 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
         await queryRunner.query(`
     
            CREATE TABLE IF NOT EXISTS "offering_offers" (
                id SERIAL NOT NULL PRIMARY KEY,
                offering_id integer NOT NULL,
                offer_type offering_category_enum,
                platform social_platform_enum,
                time_mode varchar(50),
                schedule varchar(30),
                repetition varchar(30),
                duration varchar(30),
                size varchar(30),
                sub_type varchar(30),               
    
                
                CONSTRAINT "FK_86cr6e08503b30aa1jki8ed0613" FOREIGN KEY ("offering_id") REFERENCES "offerings"(id) ON DELETE CASCADE
            );

            CREATE INDEX "IDX_offerings_offers" ON "offering_offers" ("offering_id", "offer_type");
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX "IDX_offerings_offers";
            DROP TABLE IF EXISTS "offering_offers";
        `);
    }

}
