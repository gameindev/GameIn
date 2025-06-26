import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSocialPlatformEnum1750090379420 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
      DO $$ BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_type WHERE typname = 'social_platform_enum'
        ) THEN
          CREATE TYPE social_platform_enum AS ENUM (
            'TWITCH',
            'INSTAGRAM',
            'X',
            'YOUTUBE',
            'TIKTOK',
            'DISCORD',
            'FACEBOOK'
          );
        END IF;
      END $$;
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TYPE IF EXISTS social_platform_enum;`);
    }
}
