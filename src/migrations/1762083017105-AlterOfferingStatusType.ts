import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterOfferingStatusType1762083017105 implements MigrationInterface {
    name = 'AlterOfferingStatusType1762083017105'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "offerings" ALTER COLUMN "status" DROP DEFAULT;
            ALTER TYPE "offering_status_enum" RENAME TO "offering_status_enum_old";
            CREATE TYPE "offering_status_enum" AS ENUM ('SPONSORED', 'DRAFT', 'OFFERED', 'PENDING', 'ACCEPTED', 'COMPLETED', 'DISMISSED', 'EXPIRED');
            ALTER TABLE "offerings" ALTER COLUMN "status" TYPE "offering_status_enum" USING "status"::text::"offering_status_enum";
            ALTER TABLE "offerings" ALTER COLUMN "status" SET DEFAULT 'DRAFT';
            DROP TYPE "offering_status_enum_old";
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "offerings" ALTER COLUMN "status" DROP DEFAULT;
            ALTER TYPE "offering_status_enum" RENAME TO "offering_status_enum_old";
            CREATE TYPE "offering_status_enum" AS ENUM ('DRAFT', 'OFFERED', 'PENDING', 'ACCEPTED', 'COMPLETED', 'DISMISSED', 'EXPIRED');
            ALTER TABLE "offerings" ALTER COLUMN "status" TYPE "offering_status_enum" USING "status"::text::"offering_status_enum";
            ALTER TABLE "offerings" ALTER COLUMN "status" SET DEFAULT 'DRAFT';
            DROP TYPE "offering_status_enum_old";
        `);
    }

}
