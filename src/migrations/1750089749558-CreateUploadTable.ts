import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUploadTable1750089749558 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
      DO $$ BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relname = 'upload_id_seq') THEN
          CREATE SEQUENCE upload_id_seq START 1;
        END IF;
      END $$;

      CREATE TABLE IF NOT EXISTS "upload_entity" (
        id integer NOT NULL DEFAULT nextval('upload_id_seq'),
        name character varying(1024) NOT NULL,
        path character varying(1024) NOT NULL,
        type upload_type_enum DEFAULT 'image' NOT NULL,
        mime character varying(128) NOT NULL,
        size character varying(1024) NOT NULL,
        "createdAt" timestamp DEFAULT now() NOT NULL,
        "updatedAt" timestamp DEFAULT now() NOT NULL,
        CONSTRAINT "PK_1fe8db121b3de4ddfa677fc51f3" PRIMARY KEY (id)
      );
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
      DROP TABLE IF EXISTS "upload";
      DROP SEQUENCE IF EXISTS upload_id_seq;
    `);
    }

}
