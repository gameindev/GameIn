import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterEnumSocialPlatform1756711325352 implements MigrationInterface {
    name = 'AlterEnumSocialPlatform1756711325352'

    public async up(queryRunner: QueryRunner): Promise<void> {      
        // Step 1: Rename the old enum
        await queryRunner.query(`ALTER TYPE "social_platform_enum" RENAME TO "social_platform_enum_old"`);

        // Step 2: Create the new enum with additional values
        await queryRunner.query(`
            CREATE TYPE "social_platform_enum" AS ENUM (
                'TWITCH',
                'INSTAGRAM',
                'X',
                'YOUTUBE',
                'KICK'
                'TIKTOK',
                'DISCORD',
                'FACEBOOK',
                'SNAPCHAT',
                'PINTEREST',
                'LINKEDIN',
                'THREADS',
                'OTHER' 
            )
        `);

        // Step 3: Alter column to use new enum
        await queryRunner.query(`
            ALTER TABLE "offering_offers"
            ALTER COLUMN "platform" TYPE "social_platform_enum"
            USING "platform"::text::"social_platform_enum"
        `);

        await queryRunner.query(`
            ALTER TABLE "social_integration"
            ALTER COLUMN "platform" TYPE "social_platform_enum"
            USING "platform"::text::"social_platform_enum"
        `);

        await queryRunner.query(`
            ALTER TABLE "team_links"
            ALTER COLUMN "platform" TYPE "social_platform_enum"
            USING "platform"::text::"social_platform_enum"
        `);

        // Step 4: Drop the old enum
        await queryRunner.query(`DROP TYPE "social_platform_enum_old"`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Rollback: recreate the old enum
        await queryRunner.query(`CREATE TYPE "social_platform_enum_old" AS ENUM ('TWITCH', 'INSTAGRAM', 'X', 'YOUTUBE', 'TIKTOK', 'DISCORD', 'FACEBOOK')`);

        await queryRunner.query(`
            ALTER TABLE "offering_offers"
            ALTER COLUMN "platform" TYPE "social_platform_enum_old"
            USING "platform"::text::"social_platform_enum_old"
        `);

        await queryRunner.query(`
            ALTER TABLE "social_integration"
            ALTER COLUMN "platform" TYPE "social_platform_enum_old"
            USING "platform"::text::"social_platform_enum_old"
        `);

        await queryRunner.query(`
            ALTER TABLE "team_links"
            ALTER COLUMN "platform" TYPE "social_platform_enum_old"
            USING "platform"::text::"social_platform_enum_old"
        `);

        await queryRunner.query(`DROP TYPE "social_platform_enum"`);

        await queryRunner.query(`ALTER TYPE "social_platform_enum_old" RENAME TO "social_platform_enum"`);
    }

}
