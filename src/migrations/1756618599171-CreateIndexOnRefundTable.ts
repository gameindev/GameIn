import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateIndexOnRefundTable1756618599171 implements MigrationInterface {
    name = 'CreateIndexOnRefundTable1756618599171'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE INDEX idx_payment_refund ON payment_refund(payment_id);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX idx_payment_refund;
        `);
    }

}
