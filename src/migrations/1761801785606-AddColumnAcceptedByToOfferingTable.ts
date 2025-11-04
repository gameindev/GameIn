import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnAcceptedByToOfferingTable1761801785606 implements MigrationInterface {
    name = 'AddColumnAcceptedByToOfferingTable1761801785606'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "offerings" ADD "accepted_by" integer`);
        await queryRunner.query(`ALTER TABLE "offerings" ADD CONSTRAINT "FK_offerings_accepted_by" FOREIGN KEY ("accepted_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "offerings" DROP CONSTRAINT "FK_offerings_accepted_by"`);
        await queryRunner.query(`ALTER TABLE "offerings" DROP COLUMN "accepted_by"`);
    }

}
