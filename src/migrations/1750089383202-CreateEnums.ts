import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEnums1750089383202 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "user_usertype_enum" AS ENUM ('ADMIN', 'CREATOR', 'BRAND', 'COMMUNITY');
          `);
        await queryRunner.query(`
            CREATE TYPE "upload_type_enum" AS ENUM ('image', 'video');
          `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TYPE "upload_type_enum";`);
        await queryRunner.query(`DROP TYPE "user_usertype_enum";`);
    }

}
