import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEnumUserType1758301871796 implements MigrationInterface {
    name = 'CreateEnumUserType1758301871796'

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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TYPE IF EXISTS "user_usertype_enum";`);
    }

}
