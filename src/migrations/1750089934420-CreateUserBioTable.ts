import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserBioTable1750089934420 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "user_bio" (
                id SERIAL NOT NULL PRIMARY KEY,
                bio text,
                "video_bio_url" text,
                "user_id" integer,
                "created_at" timestamp DEFAULT now() NOT NULL,
                "updated_at" timestamp DEFAULT now() NOT NULL,
                "deleted_at" timestamp,
                CONSTRAINT "REL_bf15b8a3924b67ee83496255b4" UNIQUE ("user_id"), 
                CONSTRAINT "FK_bf15b8a3924b67ee83496255b42" FOREIGN KEY ("user_id") REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE CASCADE
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS "user_bio";
        `);
    }
}
