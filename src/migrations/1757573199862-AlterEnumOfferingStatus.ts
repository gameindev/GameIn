import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterEnumOfferingStatus1757573199862 implements MigrationInterface {
    name = 'AlterEnumOfferingStatus1757573199862'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Step 1: Rename the old enum
        await queryRunner.query(`ALTER TYPE "offering_status_enum" RENAME TO "offering_status_enum_old"`);

        // Step 2: Create the new enum with additional values
        await queryRunner.query(`
            CREATE TYPE "offering_status_enum" AS ENUM (
                'DRAFT',
                'OFFERED',
                'PENDING',
                'ACCEPTED',
                'COMPLETED',
                'DISMISSED'
            )
        `);

        // Step 3: Alter column to use new enum
        await queryRunner.query(`
            ALTER TABLE "offerings"
            ALTER COLUMN "status" TYPE "offering_status_enum"
            USING "status"::text::"offering_status_enum"
        `);

        // Step 4: Drop the old enum
        await queryRunner.query(`DROP TYPE "offering_status_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Rollback: recreate the old enum
        await queryRunner.query(`CREATE TYPE "offering_status_enum_old" AS ENUM ('DRAFT', 'OFFERED', 'PENDING', 'ACCEPTED', 'COMPLETED', 'DISMISSED', 'EXPIRED')`);

        await queryRunner.query(`
            ALTER TABLE "offerings"
            ALTER COLUMN "status" TYPE "offering_status_enum_old"
            USING "status"::text::"offering_status_enum_old"
        `);

        await queryRunner.query(`DROP TYPE "offering_status_enum_old"`);    

        await queryRunner.query(`ALTER TYPE "offering_status_enum_old" RENAME TO "offering_status_enum"`);
    }

}
