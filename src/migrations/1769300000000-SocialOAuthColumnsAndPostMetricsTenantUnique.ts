import { MigrationInterface, QueryRunner } from "typeorm";

export class SocialOAuthColumnsAndPostMetricsTenantUnique1769300000000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE social_post_metrics DROP CONSTRAINT IF EXISTS UQ_social_post_metrics_platform_social_post;
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX UQ_social_post_metrics_integration_post ON social_post_metrics (integration_id, social_post_id);
        `);
        await queryRunner.query(`
            ALTER TABLE social_integration
            ADD COLUMN IF NOT EXISTS token_expires_at TIMESTAMPTZ,
            ADD COLUMN IF NOT EXISTS scope_granted TEXT;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX IF EXISTS UQ_social_post_metrics_integration_post;
        `);
        await queryRunner.query(`
            ALTER TABLE social_integration
            DROP COLUMN IF EXISTS token_expires_at,
            DROP COLUMN IF EXISTS scope_granted;
        `);
        await queryRunner.query(`
            ALTER TABLE social_post_metrics
            ADD CONSTRAINT UQ_social_post_metrics_platform_social_post UNIQUE (platform, social_post_id);
        `);
    }
}
