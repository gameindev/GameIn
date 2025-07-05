import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserFollowerTable1751557015382 implements MigrationInterface {
    name = 'CreateUserFollowerTable1751557015382'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE SEQUENCE user_follow_id_seq START 1;

            CREATE TABLE "user_follow" (
                id integer NOT NULL DEFAULT nextval('user_follow_id_seq'),
                "followerId" integer NOT NULL,
                "followingId" integer NOT NULL,
                "createdAt" timestamp DEFAULT now() NOT NULL,
                "deletedAt" timestamp,

                CONSTRAINT "PK_user_follow_id" PRIMARY KEY (id),
                CONSTRAINT "UQ_follower_following" UNIQUE ("followerId", "followingId"),
                CONSTRAINT "FK_follower_user" FOREIGN KEY ("followerId") REFERENCES "user"(id) ON DELETE CASCADE,
                CONSTRAINT "FK_following_user" FOREIGN KEY ("followingId") REFERENCES "user"(id) ON DELETE CASCADE
            );

            CREATE INDEX "IDX_follower_id" ON "user_follow" ("followerId");
            CREATE INDEX "IDX_following_id" ON "user_follow" ("followingId");
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX "IDX_following_id";
            DROP INDEX "IDX_follower_id";
            DROP TABLE "user_follow";
            DROP SEQUENCE user_follow_id_seq;
        `);
    }

}
