import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUploadTable1750089749558 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "upload_entity" (
                id SERIAL NOT NULL PRIMARY KEY,
                name character varying(1024) NOT NULL,
                path character varying(1024) NOT NULL,
                type upload_type_enum DEFAULT 'image' NOT NULL,
                mime character varying(128) NOT NULL,
                size character varying(1024) NOT NULL,
                "created_at" timestamp DEFAULT now() NOT NULL,
                "updated_at" timestamp DEFAULT now() NOT NULL
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS "upload_entity";
        `);
    }

}
