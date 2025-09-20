import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCreatorProfileTable1758344707445 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "creator_profile" (
                id SERIAL NOT NULL PRIMARY KEY,
                "first_name" varchar(30),
                "last_name" varchar(30),
                gender varchar(10),
                country varchar(30),
                contact varchar(20),
                website text,
                followers bigint DEFAULT 0,
                views bigint DEFAULT 0,
                rank bigint DEFAULT 0,
                "created_at" timestamp DEFAULT now() NOT NULL,
                "updated_at" timestamp DEFAULT now() NOT NULL,
                "deleted_at" timestamp,
                "user_id" integer,
                "profile_image_id" integer,
                "cover_image_id" integer,
                
                CONSTRAINT "REL_861c4ae08503b30aa145ed0351" UNIQUE ("user_id"),
                CONSTRAINT "UQ_5b8f9f6b1ce612c784b67079083" UNIQUE ("profile_image_id"),
                CONSTRAINT "UQ_fa52bed05de548cff422d107a79" UNIQUE ("cover_image_id"),
                CONSTRAINT "FK_861c4ae08503b30aa145ed03513" FOREIGN KEY ("user_id") REFERENCES "users"(id) ON DELETE CASCADE,
                CONSTRAINT "FK_5b8f9f6b1ce612c784b67079083" FOREIGN KEY ("profile_image_id") REFERENCES "upload_entity"(id),
                CONSTRAINT "FK_fa52bed05de548cff422d107a79" FOREIGN KEY ("cover_image_id") REFERENCES "upload_entity"(id)
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS "creator_profile";
        `);
    }

}
