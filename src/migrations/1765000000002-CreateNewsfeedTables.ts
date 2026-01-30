import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateNewsfeedTables1765000000002 implements MigrationInterface {
    name = 'CreateNewsfeedTables1765000000002';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create post_type enum
        await queryRunner.query(`
            DO $$ BEGIN
                CREATE TYPE post_type_enum AS ENUM (
                    'text', 'image', 'video', 'audio', 'mixed'
                );
            EXCEPTION
                WHEN duplicate_object THEN null;
            END $$;
        `);

        // Create post_visibility enum
        await queryRunner.query(`
            DO $$ BEGIN
                CREATE TYPE post_visibility_enum AS ENUM (
                    'public', 'followers', 'private'
                );
            EXCEPTION
                WHEN duplicate_object THEN null;
            END $$;
        `);

        // Create media_type enum
        await queryRunner.query(`
            DO $$ BEGIN
                CREATE TYPE media_type_enum AS ENUM (
                    'image', 'video', 'audio', 'document'
                );
            EXCEPTION
                WHEN duplicate_object THEN null;
            END $$;
        `);

        // Create posts table
        await queryRunner.query(`
            CREATE TABLE "posts" (
                id SERIAL NOT NULL PRIMARY KEY,
                "user_id" integer NOT NULL,
                type post_type_enum DEFAULT 'text' NOT NULL,
                visibility post_visibility_enum DEFAULT 'public' NOT NULL,
                content text,
                location text,
                hashtags jsonb,
                mentions jsonb,
                metadata jsonb,
                like_count integer DEFAULT 0 NOT NULL,
                comment_count integer DEFAULT 0 NOT NULL,
                share_count integer DEFAULT 0 NOT NULL,
                "parent_post_id" integer,
                is_pinned boolean DEFAULT false NOT NULL,
                is_edited boolean DEFAULT false NOT NULL,
                "created_at" timestamp DEFAULT now() NOT NULL,
                "updated_at" timestamp DEFAULT now() NOT NULL,
                "deleted_at" timestamp,
                
                CONSTRAINT "FK_posts_user" FOREIGN KEY ("user_id") REFERENCES "users"(id) ON DELETE CASCADE,
                CONSTRAINT "FK_posts_parent_post" FOREIGN KEY ("parent_post_id") REFERENCES "posts"(id) ON DELETE SET NULL
            );

            CREATE INDEX "IDX_posts_user_id" ON "posts" ("user_id");
            CREATE INDEX "IDX_posts_user_created" ON "posts" ("user_id", "created_at");
            CREATE INDEX "IDX_posts_user_visibility_created" ON "posts" ("user_id", "visibility", "created_at");
            CREATE INDEX "IDX_posts_visibility_created" ON "posts" ("visibility", "created_at");
            CREATE INDEX "IDX_posts_type_created" ON "posts" ("type", "created_at");
            CREATE INDEX "IDX_posts_parent_post_id" ON "posts" ("parent_post_id");
        `);

        // Create post_media table
        await queryRunner.query(`
            CREATE TABLE "post_media" (
                id SERIAL NOT NULL PRIMARY KEY,
                "post_id" integer NOT NULL,
                "upload_id" integer NOT NULL,
                media_type media_type_enum NOT NULL,
                "order" integer DEFAULT 0 NOT NULL,
                caption varchar(500),
                metadata jsonb,
                "created_at" timestamp DEFAULT now() NOT NULL,
                
                CONSTRAINT "FK_post_media_post" FOREIGN KEY ("post_id") REFERENCES "posts"(id) ON DELETE CASCADE,
                CONSTRAINT "FK_post_media_upload" FOREIGN KEY ("upload_id") REFERENCES "upload_entity"(id) ON DELETE CASCADE
            );

            CREATE INDEX "IDX_post_media_post_id" ON "post_media" ("post_id");
            CREATE INDEX "IDX_post_media_upload_id" ON "post_media" ("upload_id");
            CREATE INDEX "IDX_post_media_post_order" ON "post_media" ("post_id", "order");
        `);

        // Create post_likes table
        await queryRunner.query(`
            CREATE TABLE "post_likes" (
                id SERIAL NOT NULL PRIMARY KEY,
                "post_id" integer NOT NULL,
                "user_id" integer NOT NULL,
                "created_at" timestamp DEFAULT now() NOT NULL,
                
                CONSTRAINT "UQ_post_likes_post_user" UNIQUE ("post_id", "user_id"),
                CONSTRAINT "FK_post_likes_post" FOREIGN KEY ("post_id") REFERENCES "posts"(id) ON DELETE CASCADE,
                CONSTRAINT "FK_post_likes_user" FOREIGN KEY ("user_id") REFERENCES "users"(id) ON DELETE CASCADE
            );

            CREATE INDEX "IDX_post_likes_post_id" ON "post_likes" ("post_id");
            CREATE INDEX "IDX_post_likes_user_id" ON "post_likes" ("user_id");
            CREATE INDEX "IDX_post_likes_post_created" ON "post_likes" ("post_id", "created_at");
            CREATE INDEX "IDX_post_likes_user_created" ON "post_likes" ("user_id", "created_at");
        `);

        // Create post_comments table
        await queryRunner.query(`
            CREATE TABLE "post_comments" (
                id SERIAL NOT NULL PRIMARY KEY,
                "post_id" integer NOT NULL,
                "user_id" integer NOT NULL,
                content text NOT NULL,
                "parent_comment_id" integer,
                like_count integer DEFAULT 0 NOT NULL,
                reply_count integer DEFAULT 0 NOT NULL,
                is_edited boolean DEFAULT false NOT NULL,
                "created_at" timestamp DEFAULT now() NOT NULL,
                "updated_at" timestamp DEFAULT now() NOT NULL,
                "deleted_at" timestamp,
                
                CONSTRAINT "FK_post_comments_post" FOREIGN KEY ("post_id") REFERENCES "posts"(id) ON DELETE CASCADE,
                CONSTRAINT "FK_post_comments_user" FOREIGN KEY ("user_id") REFERENCES "users"(id) ON DELETE CASCADE,
                CONSTRAINT "FK_post_comments_parent" FOREIGN KEY ("parent_comment_id") REFERENCES "post_comments"(id) ON DELETE CASCADE
            );

            CREATE INDEX "IDX_post_comments_post_id" ON "post_comments" ("post_id");
            CREATE INDEX "IDX_post_comments_user_id" ON "post_comments" ("user_id");
            CREATE INDEX "IDX_post_comments_parent_comment_id" ON "post_comments" ("parent_comment_id");
            CREATE INDEX "IDX_post_comments_post_created" ON "post_comments" ("post_id", "created_at");
            CREATE INDEX "IDX_post_comments_user_created" ON "post_comments" ("user_id", "created_at");
        `);

        // Create post_shares table
        await queryRunner.query(`
            CREATE TABLE "post_shares" (
                id SERIAL NOT NULL PRIMARY KEY,
                "post_id" integer NOT NULL,
                "user_id" integer NOT NULL,
                comment text,
                "created_at" timestamp DEFAULT now() NOT NULL,
                
                CONSTRAINT "FK_post_shares_post" FOREIGN KEY ("post_id") REFERENCES "posts"(id) ON DELETE CASCADE,
                CONSTRAINT "FK_post_shares_user" FOREIGN KEY ("user_id") REFERENCES "users"(id) ON DELETE CASCADE
            );

            CREATE INDEX "IDX_post_shares_post_id" ON "post_shares" ("post_id");
            CREATE INDEX "IDX_post_shares_user_id" ON "post_shares" ("user_id");
            CREATE INDEX "IDX_post_shares_post_created" ON "post_shares" ("post_id", "created_at");
            CREATE INDEX "IDX_post_shares_user_created" ON "post_shares" ("user_id", "created_at");
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "post_shares"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "post_comments"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "post_likes"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "post_media"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "posts"`);
        await queryRunner.query(`DROP TYPE IF EXISTS media_type_enum`);
        await queryRunner.query(`DROP TYPE IF EXISTS post_visibility_enum`);
        await queryRunner.query(`DROP TYPE IF EXISTS post_type_enum`);
    }
}

