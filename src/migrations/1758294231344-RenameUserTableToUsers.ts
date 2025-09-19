import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameUserTableToUsers1758294231344 implements MigrationInterface {
    name = 'RenameUserTableToUsers1758294231344'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user" RENAME TO users;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE users RENAME TO "user";
        `);
    }

}
