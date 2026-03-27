import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSocialStatsTables1769200000000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE social_post_metrics (
                id SERIAL PRIMARY KEY,
                integration_id integer NOT NULL,
                platform social_platform_enum NOT NULL,
                social_post_id text NOT NULL,
                posted_at TIMESTAMPTZ,
                like_count bigint,
                view_count bigint,
                raw_hash varchar(128),
                raw_payload jsonb,
                created_at TIMESTAMP DEFAULT now(),
                updated_at TIMESTAMP DEFAULT now(),
                CONSTRAINT FK_social_post_metrics_integration FOREIGN KEY (integration_id) REFERENCES social_integration(id) ON DELETE CASCADE ON UPDATE CASCADE,
                CONSTRAINT UQ_social_post_metrics_platform_social_post UNIQUE (platform, social_post_id)
            );

            CREATE INDEX IDX_social_post_metrics_integration_platform ON social_post_metrics (integration_id, platform);

            CREATE TABLE social_account_rollups (
                id SERIAL PRIMARY KEY,
                integration_id integer NOT NULL UNIQUE,
                followers_or_subscribers bigint,
                total_likes bigint,
                max_likes bigint,
                total_views bigint,
                max_views bigint,
                sampled_posts_count integer,
                aggregation_window varchar(50) NOT NULL DEFAULT 'all_fetched',
                views_definition varchar(120),
                last_synced_at TIMESTAMPTZ,
                created_at TIMESTAMP DEFAULT now(),
                updated_at TIMESTAMP DEFAULT now(),
                CONSTRAINT FK_social_account_rollup_integration FOREIGN KEY (integration_id) REFERENCES social_integration(id) ON DELETE CASCADE ON UPDATE CASCADE
            );

            CREATE TABLE social_sync_jobs (
                id SERIAL PRIMARY KEY,
                integration_id integer NOT NULL,
                platform social_platform_enum NOT NULL,
                status varchar(40) NOT NULL DEFAULT 'IDLE',
                cursor text,
                last_success_at TIMESTAMPTZ,
                last_error text,
                retry_count integer NOT NULL DEFAULT 0,
                created_at TIMESTAMP DEFAULT now(),
                updated_at TIMESTAMP DEFAULT now(),
                CONSTRAINT FK_social_sync_job_integration FOREIGN KEY (integration_id) REFERENCES social_integration(id) ON DELETE CASCADE ON UPDATE CASCADE
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS social_sync_jobs;
            DROP TABLE IF EXISTS social_account_rollups;
            DROP INDEX IF EXISTS IDX_social_post_metrics_integration_platform;
            DROP TABLE IF EXISTS social_post_metrics;
        `);
    }
}
