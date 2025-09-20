import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePofileViewTable1758344992743 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "profile_views" (
                id SERIAL NOT NULL PRIMARY KEY,
                "viewer_id" INTEGER,
                "ip_address" VARCHAR(64),
                "profile_type" VARCHAR(10) NOT NULL, -- 'creator' or 'brand'
                "profile_id" INTEGER NOT NULL,
                "viewed_at" TIMESTAMP DEFAULT now(),
                CONSTRAINT fk_viewer FOREIGN KEY ("viewer_id") REFERENCES "users"(id) ON DELETE SET NULL
            );
            CREATE INDEX "IDX_profile_unique_view" ON "profile_views" ("viewer_id", "profile_type", "profile_id");
            CREATE INDEX "IDX_profile_viewer_id" ON "profile_views" ("viewer_id");
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX IF EXISTS "IDX_profile_viewer_id";
            DROP INDEX IF EXISTS "IDX_profile_unique_view";
            DROP TABLE IF EXISTS "profile_views";
        `);
    }

}
