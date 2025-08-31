import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSocialIntegrationTable1750092962804 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        DO $$ BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relname = 'social_integration_id_seq') THEN
          CREATE SEQUENCE social_integration_id_seq START 1;
        END IF;
      END $$;

      CREATE TABLE social_integration (
        id integer NOT NULL DEFAULT nextval('social_integration_id_seq'),
        "userId" integer,
        platform social_platform_enum,
        social_id text,
        access_token text,
        refresh_token text,
        createdAt TIMESTAMP DEFAULT now(),
        updatedAt TIMESTAMP DEFAULT now(),
        CONSTRAINT PK_social_integration_id PRIMARY KEY (id),
        CONSTRAINT FK_user_social_integration FOREIGN KEY ("userId") REFERENCES "user"(id) ON DELETE CASCADE ON UPDATE CASCADE
      );

      CREATE INDEX IDX_user_social_integration ON social_integration ("userId");
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
      DROP INDEX IF EXISTS IDX_user_social_integration;
      DROP TABLE IF EXISTS social_integration;
      DROP SEQUENCE IF EXISTS social_integration_id_seq;
    `);
    }
}
