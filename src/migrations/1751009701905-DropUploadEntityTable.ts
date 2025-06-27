import { MigrationInterface, QueryRunner } from "typeorm";

export class DropUploadEntityTable1751009701905 implements MigrationInterface {
    name = 'DropUploadEntityTable1751009701905'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "upload_entity";`);
        console.log(`Migration 'DropUploadEntityTable1719500000001' applied: Dropped "upload_entity" table if it existed.`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        console.log(`Migration 'DropUploadEntityTable1719500000001' reverted: "upload_entity" table was not recreated.`);
    }

}
