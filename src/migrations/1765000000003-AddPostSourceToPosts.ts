import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPostSourceToPosts1765000000003 implements MigrationInterface {
    name = 'AddPostSourceToPosts1765000000003';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create post_source enum
        await queryRunner.query(`
            DO $$ BEGIN
                CREATE TYPE post_source_enum AS ENUM (
                    'user', 'system'
                );
            EXCEPTION
                WHEN duplicate_object THEN null;
            END $$;
        `);

        // Add source column
        await queryRunner.query(`
            ALTER TABLE "posts"
            ADD COLUMN IF NOT EXISTS "source" post_source_enum DEFAULT 'user' NOT NULL;
        `);

        // Add system_category column
        await queryRunner.query(`
            ALTER TABLE "posts"
            ADD COLUMN IF NOT EXISTS "system_category" varchar(255);
        `);

        // Make user_id nullable for system posts
        await queryRunner.query(`
            ALTER TABLE "posts"
            ALTER COLUMN "user_id" DROP NOT NULL;
        `);

        // Create indexes
        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "IDX_posts_source_created" ON "posts" ("source", "created_at");
            CREATE INDEX IF NOT EXISTS "IDX_posts_source_category_created" ON "posts" ("source", "system_category", "created_at");
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX IF EXISTS "IDX_posts_source_category_created"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "IDX_posts_source_created"`);
        await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "user_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN IF EXISTS "system_category"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN IF EXISTS "source"`);
        await queryRunner.query(`DROP TYPE IF EXISTS post_source_enum`);
    }
}

