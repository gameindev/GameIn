import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1749634198503 implements MigrationInterface {
    name = 'InitialMigration1749634198503'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."upload_entity_type_enum" AS ENUM('image', 'video')`);
        await queryRunner.query(`CREATE TABLE "upload_entity" ("id" SERIAL NOT NULL, "name" character varying(1024) NOT NULL, "path" character varying(1024) NOT NULL, "type" "public"."upload_entity_type_enum" NOT NULL DEFAULT 'image', "mime" character varying(128) NOT NULL, "size" character varying(1024) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_45b55f0d0d97b85632a607cf039" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "creator_profile" ("id" SERIAL NOT NULL, "firstName" character varying(30), "lastName" character varying(30), "gender" character varying(10), "country" character varying(30), "contact" character varying(20), "website" text, "followers" bigint DEFAULT '0', "views" bigint DEFAULT '0', "rank" bigint DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" integer, "profileImageId" integer, "coverImageId" integer, CONSTRAINT "REL_861c4ae08503b30aa145ed0351" UNIQUE ("userId"), CONSTRAINT "REL_5b8f9f6b1ce612c784b6707908" UNIQUE ("profileImageId"), CONSTRAINT "REL_fa52bed05de548cff422d107a7" UNIQUE ("coverImageId"), CONSTRAINT "PK_6a0e01b4d57f28332742467a356" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_861c4ae08503b30aa145ed0351" ON "creator_profile" ("userId") `);
        await queryRunner.query(`CREATE TABLE "brand_profile" ("id" SERIAL NOT NULL, "brandName" character varying(30), "headOffice" text, "contact" character varying(20), "website" text, "followers" bigint DEFAULT '0', "views" bigint DEFAULT '0', "rank" bigint DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" integer, "profileImageId" integer, "coverImageId" integer, CONSTRAINT "REL_3c5e458fc824b91dac08295b39" UNIQUE ("userId"), CONSTRAINT "REL_24398546860a568346e3dd04a8" UNIQUE ("profileImageId"), CONSTRAINT "REL_ec9a002ef8cb11144a49be7631" UNIQUE ("coverImageId"), CONSTRAINT "PK_b293356a3488bdac7b90ed5e75c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3c5e458fc824b91dac08295b39" ON "brand_profile" ("userId") `);
        await queryRunner.query(`CREATE TABLE "user_bio" ("id" SERIAL NOT NULL, "bio" text, "videoBioUrl" text, "userId" integer, CONSTRAINT "REL_bf15b8a3924b67ee83496255b4" UNIQUE ("userId"), CONSTRAINT "PK_45b9aab90519ed3864cedf01fa8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_bf15b8a3924b67ee83496255b4" ON "user_bio" ("userId") `);
        await queryRunner.query(`CREATE TYPE "public"."user_usertype_enum" AS ENUM('ADMIN', 'CREATOR', 'BRAND', 'COMMUNITY')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying(30) NOT NULL, "email" character varying(96) NOT NULL, "password" character varying(96), "googleId" text, "userType" "public"."user_usertype_enum", "dateOfBirth" date, "isActive" boolean DEFAULT true, "isVerified" boolean DEFAULT false, "isFirst" boolean DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "creator_profile" ADD CONSTRAINT "FK_861c4ae08503b30aa145ed03513" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "creator_profile" ADD CONSTRAINT "FK_5b8f9f6b1ce612c784b67079083" FOREIGN KEY ("profileImageId") REFERENCES "upload_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "creator_profile" ADD CONSTRAINT "FK_fa52bed05de548cff422d107a79" FOREIGN KEY ("coverImageId") REFERENCES "upload_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "brand_profile" ADD CONSTRAINT "FK_3c5e458fc824b91dac08295b393" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "brand_profile" ADD CONSTRAINT "FK_24398546860a568346e3dd04a8e" FOREIGN KEY ("profileImageId") REFERENCES "upload_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "brand_profile" ADD CONSTRAINT "FK_ec9a002ef8cb11144a49be7631b" FOREIGN KEY ("coverImageId") REFERENCES "upload_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_bio" ADD CONSTRAINT "FK_bf15b8a3924b67ee83496255b42" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_bio" DROP CONSTRAINT "FK_bf15b8a3924b67ee83496255b42"`);
        await queryRunner.query(`ALTER TABLE "brand_profile" DROP CONSTRAINT "FK_ec9a002ef8cb11144a49be7631b"`);
        await queryRunner.query(`ALTER TABLE "brand_profile" DROP CONSTRAINT "FK_24398546860a568346e3dd04a8e"`);
        await queryRunner.query(`ALTER TABLE "brand_profile" DROP CONSTRAINT "FK_3c5e458fc824b91dac08295b393"`);
        await queryRunner.query(`ALTER TABLE "creator_profile" DROP CONSTRAINT "FK_fa52bed05de548cff422d107a79"`);
        await queryRunner.query(`ALTER TABLE "creator_profile" DROP CONSTRAINT "FK_5b8f9f6b1ce612c784b67079083"`);
        await queryRunner.query(`ALTER TABLE "creator_profile" DROP CONSTRAINT "FK_861c4ae08503b30aa145ed03513"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."user_usertype_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bf15b8a3924b67ee83496255b4"`);
        await queryRunner.query(`DROP TABLE "user_bio"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3c5e458fc824b91dac08295b39"`);
        await queryRunner.query(`DROP TABLE "brand_profile"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_861c4ae08503b30aa145ed0351"`);
        await queryRunner.query(`DROP TABLE "creator_profile"`);
        await queryRunner.query(`DROP TABLE "upload_entity"`);
        await queryRunner.query(`DROP TYPE "public"."upload_entity_type_enum"`);
    }

}
