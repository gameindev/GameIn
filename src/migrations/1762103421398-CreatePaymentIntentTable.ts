import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePaymentIntentTable1762103421398 implements MigrationInterface {
    name = 'CreatePaymentIntentTable1762103421398'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "payment_intent" (
                id SERIAL NOT NULL PRIMARY KEY,
                order_id integer NOT NULL,
                invoice_id integer NOT NULL,
                provider payment_provider_enum NOT NULL,
                provider_intent_id TEXT UNIQUE,
                client_secret TEXT,
                amount NUMERIC(12,2) NOT NULL,
                currency CHAR(3) NOT NULL DEFAULT 'USD',
                status payment_status_enum NOT NULL,
                meta_data JSONB,
                pdf_url TEXT,
                "created_at" timestamp DEFAULT now() NOT NULL,
                "updated_at" timestamp DEFAULT now() NOT NULL,
                "deleted_at" timestamp,

                CONSTRAINT "FK_861c4ae08b30akjui7t45dby679" FOREIGN KEY ("order_id") REFERENCES "offering_order"(id) ON DELETE CASCADE,
                CONSTRAINT "FK_861cr6io890r430aa145ed06713" FOREIGN KEY ("invoice_id") REFERENCES "invoice"(id) ON DELETE CASCADE
            );

            CREATE INDEX IF NOT EXISTS idx_payment_intent_order ON payment_intent(order_id);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS "payment_intent";
            DROP INDEX IF EXISTS idx_payment_intent_order;
        `);
    }

}
