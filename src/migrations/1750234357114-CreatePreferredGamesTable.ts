import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePreferredGamesTable1750234357114 implements MigrationInterface {
    name = 'CreatePreferredGamesTable1750234357114'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE SEQUENCE preferred_games_id_seq START 1;

            CREATE TABLE "preferred_games" (
              id integer NOT NULL DEFAULT nextval('preferred_games_id_seq'),
              "userBioId" integer NOT NULL,
              "gameUrl" varchar(100) NOT NULL,
              "sortOrder" integer DEFAULT 0,
              "createdAt" timestamp DEFAULT now() NOT NULL,
              "updatedAt" timestamp DEFAULT now() NOT NULL,
              CONSTRAINT "PK_preferred_games_id" PRIMARY KEY (id),
              CONSTRAINT "FK_user_bio_preferred_games" FOREIGN KEY ("userBioId") REFERENCES "user_bio"(id) ON DELETE CASCADE ON UPDATE CASCADE
            );

            CREATE INDEX "IDX_user_bio_preferred_games" ON "preferred_games" ("userBioId");
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX "IDX_user_bio_preferred_games";
            DROP TABLE "preferred_games";
            DROP SEQUENCE preferred_games_id_seq;
        `);
    }

}
