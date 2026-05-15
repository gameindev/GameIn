import { MigrationInterface, QueryRunner } from 'typeorm';

export class Phase2AnalyticsSnapshotsAndPostEngagement1770100000000 implements MigrationInterface {
    name = 'Phase2AnalyticsSnapshotsAndPostEngagement1770100000000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE social_post_metrics
            ADD COLUMN IF NOT EXISTS comment_count bigint NULL,
            ADD COLUMN IF NOT EXISTS share_count bigint NULL,
            ADD COLUMN IF NOT EXISTS save_count bigint NULL,
            ADD COLUMN IF NOT EXISTS retweet_count bigint NULL,
            ADD COLUMN IF NOT EXISTS quote_count bigint NULL,
            ADD COLUMN IF NOT EXISTS impressions bigint NULL;
        `);

        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS social_metric_snapshots (
                id SERIAL PRIMARY KEY,
                integration_id integer NOT NULL,
                snapshot_date date NOT NULL,
                followers_or_subscribers bigint NULL,
                total_views bigint NULL,
                total_likes bigint NULL,
                source varchar(40) NOT NULL DEFAULT 'scheduled_sync',
                created_at TIMESTAMP DEFAULT now(),
                updated_at TIMESTAMP DEFAULT now(),
                CONSTRAINT FK_social_metric_snapshots_integration FOREIGN KEY (integration_id)
                    REFERENCES social_integration(id) ON DELETE CASCADE ON UPDATE CASCADE,
                CONSTRAINT UQ_social_metric_snapshots_integration_date UNIQUE (integration_id, snapshot_date)
            );
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS IDX_social_metric_snapshots_integration_date
            ON social_metric_snapshots (integration_id, snapshot_date DESC);
        `);

        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS social_audience_snapshots (
                id SERIAL PRIMARY KEY,
                integration_id integer NOT NULL,
                captured_at TIMESTAMPTZ NOT NULL DEFAULT now(),
                payload jsonb NOT NULL DEFAULT '{}',
                created_at TIMESTAMP DEFAULT now(),
                updated_at TIMESTAMP DEFAULT now(),
                CONSTRAINT FK_social_audience_snapshots_integration FOREIGN KEY (integration_id)
                    REFERENCES social_integration(id) ON DELETE CASCADE ON UPDATE CASCADE
            );
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS IDX_social_audience_snapshots_integration_captured
            ON social_audience_snapshots (integration_id, captured_at DESC);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS social_audience_snapshots;`);
        await queryRunner.query(`DROP TABLE IF EXISTS social_metric_snapshots;`);
        await queryRunner.query(`
            ALTER TABLE social_post_metrics DROP COLUMN IF EXISTS comment_count;
            ALTER TABLE social_post_metrics DROP COLUMN IF EXISTS share_count;
            ALTER TABLE social_post_metrics DROP COLUMN IF EXISTS save_count;
            ALTER TABLE social_post_metrics DROP COLUMN IF EXISTS retweet_count;
            ALTER TABLE social_post_metrics DROP COLUMN IF EXISTS quote_count;
            ALTER TABLE social_post_metrics DROP COLUMN IF EXISTS impressions;
        `);
    }
}
