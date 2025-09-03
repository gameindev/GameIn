import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeTeamMembersRoleToNotNull1756874954844 implements MigrationInterface {
    name = 'ChangeTeamMembersRoleToNotNull1756874954844'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE team_members ALTER COLUMN role SET NOT NULL;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE team_members ALTER COLUMN role DROP NOT NULL;
        `)
    }

}
