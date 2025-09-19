import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTokenFieldToUsersTable1755785462391 implements MigrationInterface {
    name = 'AddTokenFieldToUsersTable1755785462391'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "token" character varying DEFAULT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "token"`);
    }

}
