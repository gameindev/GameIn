import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserBioTable1750089934420 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE SEQUENCE user_bio_id_seq START 1;
      
            CREATE TABLE "user_bio" (
              id integer NOT NULL DEFAULT nextval('user_bio_id_seq'),
              bio text,
              "videoBioUrl" text,
              "userId" integer,
              CONSTRAINT "PK_45b9aab90519ed3864cedf01fa8" PRIMARY KEY (id),
              CONSTRAINT "REL_bf15b8a3924b67ee83496255b4" UNIQUE ("userId"),
              CONSTRAINT "FK_bf15b8a3924b67ee83496255b42" FOREIGN KEY ("userId") REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE CASCADE
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "user_bio";
            DROP SEQUENCE user_bio_id_seq;
          `);
    }

}
