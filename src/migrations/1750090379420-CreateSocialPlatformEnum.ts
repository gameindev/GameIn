import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSocialPlatformEnum1750090379420 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "social_platform_enum" AS ENUM ('TWITCH', 'INSTAGRAM', 'X', 'YOUTUBE', 'TIKTOK', 'DISCORD', 'FACEBOOK');
          `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TYPE "social_platform_enum";`);
    }

}
