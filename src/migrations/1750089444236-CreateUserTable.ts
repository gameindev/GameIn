import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1750089444236 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "users" (
                id SERIAL NOT NULL PRIMARY KEY,
                username varchar(30) NOT NULL,
                email varchar(96) NOT NULL,
                password varchar(96),
                "user_type" user_usertype_enum,
                "date_of_birth" date,
                "is_active" boolean DEFAULT true,
                "is_verified" boolean DEFAULT false,
                "created_at" timestamp DEFAULT now() NOT NULL,
                "updated_at" timestamp DEFAULT now() NOT NULL,
                "deleted_at" timestamp,
                "google_id" text,
                "is_first" boolean DEFAULT true,
                CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE (username),
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE (email),
                CONSTRAINT "UQ_google_id" UNIQUE (google_id)
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS "users";
        `);
    }
}
