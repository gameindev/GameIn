import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIndexOnOfferingsTable1756229112063 implements MigrationInterface {
    name = 'AddIndexOnOfferingsTable1756229112063'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE INDEX "IDX_offering_user" ON "offerings" ("user_id");    
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX "IDX_offering_user";
        `)
    }

}
