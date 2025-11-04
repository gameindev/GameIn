import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterSizeColumnInUploadEntityTable1761754826834 implements MigrationInterface {
    name = 'AlterSizeColumnInUploadEntityTable1761754826834'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "upload_entity" 
            ALTER COLUMN size TYPE bigint USING size::bigint;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "upload_entity" 
            ALTER COLUMN size TYPE character varying(1024);
        `);
    }

}
