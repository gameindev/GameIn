import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserFaqsTable1765000000001 implements MigrationInterface {
    name = 'CreateUserFaqsTable1765000000001'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "user_faqs" (
                id SERIAL NOT NULL PRIMARY KEY,
                "user_id" integer NOT NULL,
                question VARCHAR(500) NOT NULL,
                answer TEXT NOT NULL,
                "order" integer NOT NULL DEFAULT 0,
                "created_at" timestamp DEFAULT now() NOT NULL,
                "updated_at" timestamp DEFAULT now() NOT NULL,
                "deleted_at" timestamp,
                
                CONSTRAINT "FK_user_faqs_user" FOREIGN KEY ("user_id") REFERENCES "users"(id) ON DELETE CASCADE ON UPDATE CASCADE
            );

            CREATE INDEX "IDX_user_faqs_user_id" ON "user_faqs" ("user_id");
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX "IDX_user_faqs_user_id";
            DROP TABLE "user_faqs";
        `);
    }
}

