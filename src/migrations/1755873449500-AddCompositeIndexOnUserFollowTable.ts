import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCompositeIndexOnUserFollowTable1755873449500 implements MigrationInterface {
    name = 'AddCompositeIndexOnUserFollowTable1755873449500'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE INDEX "IDX_follower_following" ON "user_follow" ("followerId", "followingId");
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX "IDX_follower_following";
        `);
    }

}
