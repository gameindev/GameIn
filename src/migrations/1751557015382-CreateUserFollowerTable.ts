import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserFollowerTable1751557015382 implements MigrationInterface {
    name = 'CreateUserFollowerTable1751557015382'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`

            CREATE TABLE "user_follow" (
                id SERIAL NOT NULL PRIMARY KEY,
                "follower_id" integer NOT NULL,
                "following_id" integer NOT NULL,
                "created_at" timestamp DEFAULT now() NOT NULL,
                "deleted_at" timestamp,
                
                CONSTRAINT "UQ_follower_following" UNIQUE ("follower_id", "following_id"),
                CONSTRAINT "FK_follower_user" FOREIGN KEY ("follower_id") REFERENCES "user"(id) ON DELETE CASCADE,
                CONSTRAINT "FK_following_user" FOREIGN KEY ("following_id") REFERENCES "user"(id) ON DELETE CASCADE
            );

            CREATE INDEX "IDX_follower_id" ON "user_follow" ("follower_id");
            CREATE INDEX "IDX_following_id" ON "user_follow" ("following_id");
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX "IDX_following_id";
            DROP INDEX "IDX_follower_id";
            DROP TABLE "user_follow";
        `);
    }

}
