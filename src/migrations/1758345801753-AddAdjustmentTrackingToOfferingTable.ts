import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAdjustmentTrackingToOfferingTable1758345801753 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
         await queryRunner.query(`
            ALTER TABLE "offerings"
            ADD COLUMN "adjustment_count" INTEGER DEFAULT 0 NOT NULL,
            ADD COLUMN "last_adjusted_at" TIMESTAMP,
            ADD COLUMN "last_adjusted_by" INTEGER;
        `);

        await queryRunner.query(`
            ALTER TABLE "offerings"
            ADD CONSTRAINT "fk_offerings_last_adjusted_by"
            FOREIGN KEY ("last_adjusted_by")
            REFERENCES "users"("id")
            ON DELETE SET NULL
            ON UPDATE CASCADE;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
         await queryRunner.query(`
            ALTER TABLE "offerings"
            DROP CONSTRAINT "fk_offerings_last_adjusted_by";
        `);

        await queryRunner.query(`
            ALTER TABLE "offerings"
            DROP COLUMN "adjustment_count",
            DROP COLUMN "last_adjusted_at",
            DROP COLUMN "last_adjusted_by";
        `);
    }

}
