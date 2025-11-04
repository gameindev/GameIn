import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterMessageTypeEnum1761842746895 implements MigrationInterface {
    name = 'AlterMessageTypeEnum1761842746895'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "message" ALTER COLUMN "type" DROP DEFAULT;
            ALTER TYPE "message_type_enum" RENAME TO "message_type_enum_old";
            CREATE TYPE "message_type_enum" AS ENUM ('TEXT','IMAGE','VIDEO','SYSTEM','DOCUMENT','AUDIO','FILE','LOCATION','CONTACT','EVENT','TASK','ALARM','OTHER');
            ALTER TABLE "message" ALTER COLUMN "type" TYPE "message_type_enum" USING "type"::text::"message_type_enum";
            ALTER TABLE "message" ALTER COLUMN "type" SET DEFAULT 'TEXT';
            DROP TYPE "message_type_enum_old";
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "message" ALTER COLUMN "type" DROP DEFAULT;
            ALTER TYPE "message_type_enum" RENAME TO "message_type_enum_old";
            -- Recreate the enum type as it existed prior to this migration. If unchanged, the list matches above.
            CREATE TYPE "message_type_enum" AS ENUM ('TEXT','IMAGE','VIDEO','SYSTEM','DOCUMENT','AUDIO','FILE','LOCATION','CONTACT','EVENT','TASK','ALARM','OTHER');
            ALTER TABLE "message" ALTER COLUMN "type" TYPE "message_type_enum" USING "type"::text::"message_type_enum";
            ALTER TABLE "message" ALTER COLUMN "type" SET DEFAULT 'TEXT';
            DROP TYPE "message_type_enum_old";
        `);
    }

}
