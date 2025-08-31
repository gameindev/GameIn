import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInvoiceTable1756614964725 implements MigrationInterface {
    name = 'CreateInvoiceTable1756614964725'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DO $$ BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relname = 'invoice_id_seq') THEN
                    CREATE SEQUENCE invoice_id_seq START 1;
                END IF;
            END $$;

            CREATE TABLE IF NOT EXISTS "invoice" (
                id integer NOT NULL DEFAULT nextval('invoice_id_seq'),
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
                "createdAt" timestamp DEFAULT now() NOT NULL,
                "updatedAt" timestamp DEFAULT now() NOT NULL,

                CONSTRAINT "PK_6a67i9b4d57fyu678348467a345" PRIMARY KEY (id),
                CONSTRAINT "REL_861ejhd65m84kui89oiu89e543" UNIQUE ("invoice_number"),
                CONSTRAINT "FK_861c4abn6750aa14wrt45dby679" FOREIGN KEY ("order_id") REFERENCES "offer_order"(id) ON DELETE CASCADE
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS "invoice";
            DROP SEQUENCE IF EXISTS "invoice_id_seq";
        `);
    }

}
