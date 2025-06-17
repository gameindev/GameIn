import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSocialIntegrationTable1750092962804 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE SEQUENCE social_integration_id_seq START 1;
      
            CREATE TABLE "social_integration" (
              id integer NOT NULL DEFAULT nextval('social_integration_id_seq'),
              "userId" integer,
              platform "social_platform_enum",
              social_id text,
              access_token text,
              refresh_token text,
              created_at TIMESTAMP DEFAULT now(),
              updated_at TIMESTAMP DEFAULT now(),
              CONSTRAINT "PK_social_integration_id" PRIMARY KEY (id),
              CONSTRAINT "FK_user_social_integration" FOREIGN KEY ("userId") REFERENCES "user"(id) ON DELETE CASCADE ON UPDATE CASCADE
            );
      
            CREATE INDEX "IDX_user_social_integration" ON "social_integration" ("userId");
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX "IDX_user_social_integration";
            DROP TABLE "social_integration";
            DROP SEQUENCE social_integration_id_seq;
        `);
    }

}
