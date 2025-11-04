import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInvoiceTable1762103388222 implements MigrationInterface {
    name = 'CreateInvoiceTable1762103388222'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "invoice" (
                id SERIAL NOT NULL PRIMARY KEY,
                order_id integer NOT NULL,
                invoice_number varchar(30) NOT NULL,
                status invoice_status_enum NOT NULL,
                currency CHAR(3) NOT NULL DEFAULT 'USD',
                amount_due NUMERIC(12,2) NOT NULL,
                tax_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
                platform_fee NUMERIC(12,2) NOT NULL DEFAULT 0,
                issued_at  TIMESTAMP NOT NULL DEFAULT now(),
                due_at  TIMESTAMP,
                pdf_url TEXT,
                "created_at" timestamp DEFAULT now() NOT NULL,
                "updated_at" timestamp DEFAULT now() NOT NULL,
                "deleted_at" timestamp,
       
                CONSTRAINT "REL_861ejhd65m84kui89oiu89e543" UNIQUE ("invoice_number"),
                CONSTRAINT "FK_861c4abn6750aa14wrt45dby679" FOREIGN KEY ("order_id") REFERENCES "offering_order"(id) ON DELETE CASCADE
            );

            CREATE INDEX IF NOT EXISTS idx_invoice_order ON invoice(order_id);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS "invoice";
            DROP INDEX IF EXISTS idx_invoice_order;
        `);
    }

}
