import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCreatorProfileTable1750089846354 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
      DO $$ BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relname = 'creator_profile_id_seq') THEN
          CREATE SEQUENCE creator_profile_id_seq START 1;
        END IF;
      END $$;

      CREATE TABLE IF NOT EXISTS "creator_profile" (
        id integer NOT NULL DEFAULT nextval('creator_profile_id_seq'),
        "firstName" varchar(30),
        "lastName" varchar(30),
        gender varchar(10),
        country varchar(30),
        contact varchar(20),
        website text,
        followers bigint DEFAULT 0,
        views bigint DEFAULT 0,
        rank bigint DEFAULT 0,
        "createdAt" timestamp DEFAULT now() NOT NULL,
        "updatedAt" timestamp DEFAULT now() NOT NULL,
        "deletedAt" timestamp,
        "userId" integer,
        "profileImageId" integer,
        "coverImageId" integer,
        CONSTRAINT "PK_6a0e01b4d57f28332742467a356" PRIMARY KEY (id),
        CONSTRAINT "REL_861c4ae08503b30aa145ed0351" UNIQUE ("userId"),
        CONSTRAINT "UQ_5b8f9f6b1ce612c784b67079083" UNIQUE ("profileImageId"),
        CONSTRAINT "UQ_fa52bed05de548cff422d107a79" UNIQUE ("coverImageId"),
        CONSTRAINT "FK_861c4ae08503b30aa145ed03513" FOREIGN KEY ("userId") REFERENCES "user"(id) ON DELETE CASCADE,
        CONSTRAINT "FK_5b8f9f6b1ce612c784b67079083" FOREIGN KEY ("profileImageId") REFERENCES "upload"(id),
        CONSTRAINT "FK_fa52bed05de548cff422d107a79" FOREIGN KEY ("coverImageId") REFERENCES "upload"(id)
      );
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
      DROP TABLE IF EXISTS "creator_profile";
      DROP SEQUENCE IF EXISTS creator_profile_id_seq;
    `);
    }
}
