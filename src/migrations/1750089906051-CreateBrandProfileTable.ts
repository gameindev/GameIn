import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateBrandProfileTable1750089906051 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
      DO $$ BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_class WHERE relname = 'brand_profile_id_seq'
        ) THEN
          CREATE SEQUENCE brand_profile_id_seq START 1;
        END IF;
      END $$;

      CREATE TABLE IF NOT EXISTS "brand_profile" (
        id integer NOT NULL DEFAULT nextval('brand_profile_id_seq'),
        "brandName" varchar(30),
        "headOffice" text,
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
        CONSTRAINT "PK_b293356a3488bdac7b90ed5e75c" PRIMARY KEY (id),
        CONSTRAINT "REL_3c5e458fc824b91dac08295b39" UNIQUE ("userId"),
        CONSTRAINT "UQ_24398546860a568346e3dd04a8e" UNIQUE ("profileImageId"),
        CONSTRAINT "UQ_ec9a002ef8cb11144a49be7631b" UNIQUE ("coverImageId"),
        CONSTRAINT "FK_3c5e458fc824b91dac08295b393" FOREIGN KEY ("userId") REFERENCES "user"(id) ON DELETE CASCADE,
        CONSTRAINT "FK_24398546860a568346e3dd04a8e" FOREIGN KEY ("profileImageId") REFERENCES "upload"(id),
        CONSTRAINT "FK_ec9a002ef8cb11144a49be7631b" FOREIGN KEY ("coverImageId") REFERENCES "upload"(id)
      );
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
      DROP TABLE IF EXISTS "brand_profile";
      DROP SEQUENCE IF EXISTS brand_profile_id_seq;
    `);
    }
}
