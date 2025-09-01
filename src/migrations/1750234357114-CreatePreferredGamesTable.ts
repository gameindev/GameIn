import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePreferredGamesTable1750234357114 implements MigrationInterface {
    name = 'CreatePreferredGamesTable1750234357114';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`

            CREATE TABLE IF NOT EXISTS "preferred_games" (
                id SERIAL NOT NULL PRIMARY KEY,
                "user_bio_id" integer NOT NULL,
                "game_url" varchar(100) NOT NULL,
                "sort_order" integer DEFAULT 0 NOT NULL,    
                "created_at" timestamp DEFAULT now() NOT NULL,
                "updated_at" timestamp DEFAULT now() NOT NULL,
                "deleted_at" timestamp,
                
                CONSTRAINT "FK_user_bio_preferred_games" FOREIGN KEY ("user_bio_id") REFERENCES "user_bio"(id) ON DELETE CASCADE ON UPDATE CASCADE,
                CONSTRAINT "UQ_user_bio_game_url" UNIQUE ("user_bio_id", "game_url")
            );

            CREATE INDEX IF NOT EXISTS "IDX_user_bio_preferred_games" ON "preferred_games" ("user_bio_id");
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX IF EXISTS "IDX_user_bio_preferred_games";
            DROP TABLE IF EXISTS "preferred_games";
        `);
    }
}
