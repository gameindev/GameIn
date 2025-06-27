import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProfileViewTable1751045070851 implements MigrationInterface {
    name = 'CreateProfileViewTable1751045070851'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "profile_views" (
                id SERIAL PRIMARY KEY,
                "viewerId" INTEGER,
                "ipAddress" VARCHAR(64),
                "profileType" VARCHAR(10) NOT NULL, -- 'creator' or 'brand'
                "profileId" INTEGER NOT NULL,
                "viewedAt" TIMESTAMP DEFAULT now(),
                CONSTRAINT fk_viewer FOREIGN KEY ("viewerId") REFERENCES "user"(id) ON DELETE SET NULL
            );
            CREATE INDEX "IDX_profile_unique_view" ON "profile_views" ("viewerId", "profileType", "profileId");
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX IF EXISTS "IDX_profile_unique_view";
            DROP TABLE IF EXISTS "profile_views";
        `);
    }

}
