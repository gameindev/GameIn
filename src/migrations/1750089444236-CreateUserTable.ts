import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1750089444236 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
      DO $$ BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relname = 'user_id_seq') THEN
          CREATE SEQUENCE user_id_seq START 1;
        END IF;
      END $$;

      CREATE TABLE IF NOT EXISTS "user" (
        id integer NOT NULL DEFAULT nextval('user_id_seq'),
        username varchar(30) NOT NULL,
        email varchar(96) NOT NULL,
        password varchar(96),
        "userType" user_usertype_enum,
        "dateOfBirth" date,
        "isActive" boolean DEFAULT true,
        "isVerified" boolean DEFAULT false,
        "createdAt" timestamp DEFAULT now() NOT NULL,
        "updatedAt" timestamp DEFAULT now() NOT NULL,
        "deletedAt" timestamp,
        "googleId" text,
        "isFirst" boolean DEFAULT true,
        CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id),
        CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE (username),
        CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE (email)
      );
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
      DROP TABLE IF EXISTS "user";
      DROP SEQUENCE IF EXISTS user_id_seq;
    `);
    }
}
