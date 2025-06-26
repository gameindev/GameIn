import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEnums1750089383202 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
      DO $$ BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_type WHERE typname = 'user_usertype_enum'
        ) THEN
          CREATE TYPE "user_usertype_enum" AS ENUM ('ADMIN', 'CREATOR', 'BRAND', 'COMMUNITY');
        END IF;
      END $$;
    `);

        await queryRunner.query(`
      DO $$ BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_type WHERE typname = 'upload_type_enum'
        ) THEN
          CREATE TYPE "upload_type_enum" AS ENUM ('image', 'video');
        END IF;
      END $$;
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TYPE IF EXISTS "upload_type_enum";`);
        await queryRunner.query(`DROP TYPE IF EXISTS "user_usertype_enum";`);
    }
}
