import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIndexOnPaymentTable1756617589479 implements MigrationInterface {
    name = 'AddIndexOnPaymentTable1756617589479'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE INDEX idx_payment_intent ON payment(payment_intent_id);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX idx_payment_intent;
        `);
    }

}
