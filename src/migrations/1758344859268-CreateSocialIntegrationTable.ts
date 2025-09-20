import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSocialIntegrationTable1758344859268 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
         await queryRunner.query(`
           
            CREATE TABLE social_integration (
                id SERIAL NOT NULL PRIMARY KEY,
                "user_id" integer,
                platform social_platform_enum,
                social_id text,
                access_token text,
                refresh_token text,
                created_at TIMESTAMP DEFAULT now(),
                updated_at TIMESTAMP DEFAULT now(),
                deleted_at TIMESTAMP,
                
                CONSTRAINT FK_user_social_integration FOREIGN KEY ("user_id") REFERENCES "users"(id) ON DELETE CASCADE ON UPDATE CASCADE
            );

            CREATE INDEX IDX_user_social_integration ON social_integration ("user_id");
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX IF EXISTS IDX_user_social_integration;
            DROP TABLE IF EXISTS social_integration;
        `);
    }

}
