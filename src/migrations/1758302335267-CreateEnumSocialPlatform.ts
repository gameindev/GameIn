import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEnumSocialPlatform1758302335267 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "social_platform_enum" AS ENUM (
                'TWITCH',
                'INSTAGRAM',
                'X',
                'YOUTUBE',
                'KICK',
                'TIKTOK',
                'DISCORD',
                'FACEBOOK',
                'SNAPCHAT',
                'PINTEREST',
                'LINKEDIN',
                'THREADS',
                'OTHER' 
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TYPE "social_platform_enum"`);
    }

}
