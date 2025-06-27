import { MigrationInterface, QueryRunner, TableUnique } from "typeorm";

export class AdjustCreatorProfileImageFKs1751009741176 implements MigrationInterface {
    name = 'AdjustCreatorProfileImageFKs1751009741176'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Drop the UNIQUE constraint on "profileImageId"
        await queryRunner.query(`ALTER TABLE "creator_profile" DROP CONSTRAINT "UQ_5b8f9f6b1ce612c784b67079083";`);
        console.log(`Migration 'AdjustCreatorProfileImageFKs1719500000002' applied: Dropped UNIQUE constraint on "profileImageId".`);

        // Drop the UNIQUE constraint on "coverImageId"
        await queryRunner.query(`ALTER TABLE "creator_profile" DROP CONSTRAINT "UQ_fa52bed05de548cff422d107a79";`);
        console.log(`Migration 'AdjustCreatorProfileImageFKs1719500000002' applied: Dropped UNIQUE constraint on "coverImageId".`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createUniqueConstraint("creator_profile", new TableUnique({
            columnNames: ["coverImageId"],
            name: "UQ_fa52bed05de548cff422d107a79",
        }));
        console.log(`Migration 'AdjustCreatorProfileImageFKs1719500000002' reverted: Re-added UNIQUE constraint on "coverImageId".`);


        // Re-add the UNIQUE constraint on "profileImageId"
        await queryRunner.createUniqueConstraint("creator_profile", new TableUnique({
            columnNames: ["profileImageId"],
            name: "UQ_5b8f9f6b1ce612c784b67079083",
        }));
        console.log(`Migration 'AdjustCreatorProfileImageFKs1719500000002' reverted: Re-added UNIQUE constraint on "profileImageId".`);
    }

}
