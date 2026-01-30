import { MigrationInterface, QueryRunner } from "typeorm";

export class AddVersioningToOfferingPriceTable1769108172778 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Remove the UNIQUE constraint on offering_id to allow multiple price versions
        await queryRunner.query(`
            ALTER TABLE "offering_price"
            DROP CONSTRAINT IF EXISTS "UQ_price_offering_id";
        `);

        // Add version column with default value of 1
        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (
                    SELECT 1 FROM information_schema.columns 
                    WHERE table_name = 'offering_price' 
                    AND column_name = 'version'
                ) THEN
                    ALTER TABLE "offering_price"
                    ADD COLUMN "version" INTEGER DEFAULT 1 NOT NULL;
                END IF;
            END $$;
        `);

        // Set version = 1 for all existing records (in case column already existed)
        await queryRunner.query(`
            UPDATE "offering_price"
            SET "version" = 1
            WHERE "version" IS NULL;
        `);

        // Add updated_by_user_id column
        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (
                    SELECT 1 FROM information_schema.columns 
                    WHERE table_name = 'offering_price' 
                    AND column_name = 'updated_by_user_id'
                ) THEN
                    ALTER TABLE "offering_price"
                    ADD COLUMN "updated_by_user_id" INTEGER;
                END IF;
            END $$;
        `);

        // Add index on offering_id and version for efficient queries
        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "IDX_offering_price_offering_version" 
            ON "offering_price" ("offering_id", "version" DESC);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop the index
        await queryRunner.query(`
            DROP INDEX IF EXISTS "IDX_offering_price_offering_version";
        `);

        // Remove the columns
        await queryRunner.query(`
            ALTER TABLE "offering_price"
            DROP COLUMN IF EXISTS "updated_by_user_id";
        `);

        await queryRunner.query(`
            ALTER TABLE "offering_price"
            DROP COLUMN IF EXISTS "version";
        `);

        // Note: We cannot safely re-add the UNIQUE constraint in the down migration
        // because there may be multiple price versions per offering.
        // If you need to rollback, you should manually clean up duplicate records first,
        // keeping only the latest version (highest version number) for each offering_id.
        // Then manually add the constraint back if needed.
    }

}
