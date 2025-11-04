import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterColumnTitleInConversationTableToNullable1760925638468 implements MigrationInterface {
    name = 'AlterColumnTitleInConversationTableToNullable1760925638468'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "conversation" ALTER COLUMN "title" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "conversation" ALTER COLUMN "title" SET NOT NULL`);
    }

}
