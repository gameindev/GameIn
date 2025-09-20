import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTeamsTable1758345589559 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "team_member_role_enum" AS ENUM ('ADMIN','COACH','MEMBER')`);
        await queryRunner.query(`CREATE TYPE "team_member_status_enum" AS ENUM ('INVITED','ACTIVE','REMOVED')`);
        await queryRunner.query(`CREATE TYPE "team_link_type_enum" AS ENUM ('SOCIAL','ACHIEVEMENT','STATS')`);

        // Teams
        await queryRunner.query(`
            CREATE TABLE "teams" (
                "id" SERIAL NOT NULL PRIMARY KEY,
                "display_name" VARCHAR(150) NOT NULL,
                "website" VARCHAR(255),
                "bio" TEXT,
                "profile_image_id" INTEGER,
                "cover_image_id" INTEGER,
                "admin_user_id" INTEGER NOT NULL,
                "payment_provider" "payment_provider_enum",
                "payment_provider_account" VARCHAR(128),
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP WITH TIME ZONE
            )
        `);


        // Team Members
        await queryRunner.query(`
            CREATE TABLE "team_members" (
                "id" SERIAL NOT NULL PRIMARY KEY,
                "team_id" INTEGER NOT NULL,
                "user_id" INTEGER NOT NULL,
                "role" "team_member_role_enum" NOT NULL DEFAULT 'MEMBER',
                "status" "team_member_status_enum" NOT NULL DEFAULT 'ACTIVE',
                "joined_at" TIMESTAMP WITH TIME ZONE DEFAULT now(),
                "added_by_user_id" INTEGER,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "uq_team_member_unique" UNIQUE ("team_id","user_id")
            )
        `);

        // Team Links (social/achievements/stats)
        await queryRunner.query(`
            CREATE TABLE "team_links" (
                "id" SERIAL NOT NULL PRIMARY KEY,
                "team_id" INTEGER NOT NULL,
                "type" "team_link_type_enum" NOT NULL,
                "platform" "social_platform_enum",                 
                "label" VARCHAR(120),
                "url" TEXT NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "uq_team_link_dedupe" UNIQUE ("team_id","type","url")
            )
        `);

        await queryRunner.query(`CREATE INDEX "idx_teams_admin" ON "teams" ("admin_user_id")`);
        await queryRunner.query(`CREATE INDEX "idx_team_members_team" ON "team_members" ("team_id")`);
        await queryRunner.query(`CREATE INDEX "idx_team_members_user" ON "team_members" ("user_id")`);
        await queryRunner.query(`CREATE INDEX "idx_team_links_team" ON "team_links" ("team_id")`);
        await queryRunner.query(`CREATE INDEX "idx_team_links_type" ON "team_links" ("type")`);


        // FKs (adjust table names if your project uses different ones)
        await queryRunner.query(`
            ALTER TABLE "teams"
            ADD CONSTRAINT "fk_teams_admin_user"
            FOREIGN KEY ("admin_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "teams"
            ADD CONSTRAINT "fk_teams_profile_image"
            FOREIGN KEY ("profile_image_id") REFERENCES "upload_entity"("id") ON DELETE SET NULL ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "teams"
            ADD CONSTRAINT "fk_teams_cover_image"
            FOREIGN KEY ("cover_image_id") REFERENCES "upload_entity"("id") ON DELETE SET NULL ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "team_members"
            ADD CONSTRAINT "fk_team_members_team"
            FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "team_members"
            ADD CONSTRAINT "fk_team_members_user"
            FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "team_members"
            ADD CONSTRAINT "fk_team_members_added_by"
            FOREIGN KEY ("added_by_user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "team_links"
            ADD CONSTRAINT "fk_team_links_team"
            FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "team_links" DROP CONSTRAINT "fk_team_links_team"`);
        await queryRunner.query(`ALTER TABLE "team_members" DROP CONSTRAINT "fk_team_members_added_by"`);
        await queryRunner.query(`ALTER TABLE "team_members" DROP CONSTRAINT "fk_team_members_user"`);
        await queryRunner.query(`ALTER TABLE "team_members" DROP CONSTRAINT "fk_team_members_team"`);
        await queryRunner.query(`ALTER TABLE "teams" DROP CONSTRAINT "fk_teams_cover_image"`);
        await queryRunner.query(`ALTER TABLE "teams" DROP CONSTRAINT "fk_teams_profile_image"`);
        await queryRunner.query(`ALTER TABLE "teams" DROP CONSTRAINT "fk_teams_admin_user"`);

        await queryRunner.query(`DROP INDEX IF EXISTS "idx_team_links_type"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_team_links_team"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_team_members_user"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_team_members_team"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_teams_admin"`);

        await queryRunner.query(`DROP TABLE "team_links"`);
        await queryRunner.query(`DROP TABLE "team_members"`);
        await queryRunner.query(`DROP TABLE "teams"`);

        await queryRunner.query(`DROP TYPE "team_link_type_enum"`);
        await queryRunner.query(`DROP TYPE "team_member_status_enum"`);
        await queryRunner.query(`DROP TYPE "team_member_role_enum"`);
    }

}
