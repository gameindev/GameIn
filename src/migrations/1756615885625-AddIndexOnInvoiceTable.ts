import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIndexOnInvoiceTable1756615885625 implements MigrationInterface {
    name = 'AddIndexOnInvoiceTable1756615885625'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE INDEX idx_invoice_order ON invoice(order_id);
        `);
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX idx_invoice_order;
        `);
    }

}
