import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserFavouriteTable1764265286370 implements MigrationInterface {
    name = 'CreateUserFavouriteTable1764265286370'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "user_favourite" (
                id SERIAL NOT NULL PRIMARY KEY,
                "user_id" integer NOT NULL,
                "favourite_user_id" integer NOT NULL,
                "created_at" timestamp DEFAULT now() NOT NULL,
                
                CONSTRAINT "UQ_user_favourite_user" UNIQUE ("user_id", "favourite_user_id"),
                CONSTRAINT "FK_user_favourite_user" FOREIGN KEY ("user_id") REFERENCES "users"(id) ON DELETE CASCADE,
                CONSTRAINT "FK_favourite_user" FOREIGN KEY ("favourite_user_id") REFERENCES "users"(id) ON DELETE CASCADE
            );

            CREATE INDEX "IDX_user_favourite_user_id" ON "user_favourite" ("user_id");
            CREATE INDEX "IDX_user_favourite_favourite_user_id" ON "user_favourite" ("favourite_user_id");
            CREATE INDEX "IDX_user_favourite_user_favourite" ON "user_favourite" ("user_id", "favourite_user_id");
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX "IDX_user_favourite_user_favourite";
            DROP INDEX "IDX_user_favourite_favourite_user_id";
            DROP INDEX "IDX_user_favourite_user_id";
            DROP TABLE "user_favourite";
        `);
    }

}
