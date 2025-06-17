import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUploadTable1750089749558 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE SEQUENCE upload_id_seq START 1;
      
            CREATE TABLE "upload" (
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
            DROP TABLE "upload";
            DROP SEQUENCE upload_id_seq;
        `);
    }

}
