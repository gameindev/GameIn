import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIndexOnPaymentIntentTable1756617003631 implements MigrationInterface {
    name = 'AddIndexOnPaymentIntentTable1756617003631'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE INDEX idx_payment_intent_order ON payment_intent(order_id);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX idx_payment_intent_order;
        `);
    }

}
