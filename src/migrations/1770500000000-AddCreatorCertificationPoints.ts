import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCreatorCertificationPoints1770500000000 implements MigrationInterface {
    name = 'AddCreatorCertificationPoints1770500000000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "creator_profile"
            ADD "certification_points" bigint NOT NULL DEFAULT 0
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "creator_profile" DROP COLUMN "certification_points"
        `);
    }
}
