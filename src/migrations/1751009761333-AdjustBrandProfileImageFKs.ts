import { MigrationInterface, QueryRunner, TableUnique } from "typeorm";

export class AdjustBrandProfileImageFKs1751009761333 implements MigrationInterface {
    name = 'AdjustBrandProfileImageFKs1751009761333'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Drop the UNIQUE constraint on "profileImageId" for brand_profile
        await queryRunner.query(`ALTER TABLE "brand_profile" DROP CONSTRAINT "UQ_24398546860a568346e3dd04a8e";`);
        console.log(`Migration 'AdjustBrandProfileImageFKs1719500000003' applied: Dropped UNIQUE constraint on "profileImageId" in "brand_profile".`);

        // Drop the UNIQUE constraint on "coverImageId" for brand_profile
        await queryRunner.query(`ALTER TABLE "brand_profile" DROP CONSTRAINT "UQ_ec9a002ef8cb11144a49be7631b";`);
        console.log(`Migration 'AdjustBrandProfileImageFKs1719500000003' applied: Dropped UNIQUE constraint on "coverImageId" in "brand_profile".`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Re-add the UNIQUE constraint on "coverImageId" for brand_profile
        await queryRunner.createUniqueConstraint("brand_profile", new TableUnique({
            columnNames: ["coverImageId"],
            name: "UQ_ec9a002ef8cb11144a49be7631b",
        }));
        console.log(`Migration 'AdjustBrandProfileImageFKs1719500000003' reverted: Re-added UNIQUE constraint on "coverImageId" in "brand_profile".`);

        // Re-add the UNIQUE constraint on "profileImageId" for brand_profile
        await queryRunner.createUniqueConstraint("brand_profile", new TableUnique({
            columnNames: ["profileImageId"],
            name: "UQ_24398546860a568346e3dd04a8e",
        }));
        console.log(`Migration 'AdjustBrandProfileImageFKs1719500000003' reverted: Re-added UNIQUE constraint on "profileImageId" in "brand_profile".`);
    }

}
