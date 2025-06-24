import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMetaDataColumnToPreferredGamesTable1750758874252 implements MigrationInterface {
    name = 'AddFaviconAndTitleColumnToPreferredGamesTable1750758874252'

    public async up(queryRunner: QueryRunner): Promise<void> {
       await queryRunner.query(`ALTER TABLE "preferred_games" ADD "metadata" JSONB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "preferred_games" DROP COLUMN "metadata"`);
    }

}
