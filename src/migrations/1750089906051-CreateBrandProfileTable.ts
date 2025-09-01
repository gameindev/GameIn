import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateBrandProfileTable1750089906051 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "brand_profile" (
                id SERIAL NOT NULL PRIMARY KEY,
                "brand_name" varchar(30),
                "head_office" text,
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
                CONSTRAINT "UQ_brand_name" UNIQUE ("brand_name"),
                CONSTRAINT "REL_3c5e458fc824b91dac08295b39" UNIQUE ("user_id"),
                CONSTRAINT "UQ_24398546860a568346e3dd04a8e" UNIQUE ("profile_image_id"),
                CONSTRAINT "UQ_ec9a002ef8cb11144a49be7631b" UNIQUE ("cover_image_id"),
                CONSTRAINT "FK_3c5e458fc824b91dac08295b393" FOREIGN KEY ("user_id") REFERENCES "user"(id) ON DELETE CASCADE,
                CONSTRAINT "FK_24398546860a568346e3dd04a8e" FOREIGN KEY ("profile_image_id") REFERENCES "upload_entity"(id),
                CONSTRAINT "FK_ec9a002ef8cb11144a49be7631b" FOREIGN KEY ("cover_image_id") REFERENCES "upload_entity"(id)
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS "brand_profile";
        `);
    }
}
