import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePaymentIntentTable1756616374656 implements MigrationInterface {
    name = 'CreatePaymentIntentTable1756616374656'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DO $$ BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relname = 'payment_intent_id_seq') THEN
                    CREATE SEQUENCE payment_intent_id_seq START 1;
                END IF;
            END $$;

            CREATE TABLE IF NOT EXISTS "payment_intent" (
                id integer NOT NULL DEFAULT nextval('payment_intent_id_seq'),
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
                "createdAt" timestamp DEFAULT now() NOT NULL,
                "updatedAt" timestamp DEFAULT now() NOT NULL,

                CONSTRAINT "PK_6a67i9b4d57678uy2348467a345" PRIMARY KEY (id),
                CONSTRAINT "FK_861c4ae08b30akjui7t45dby679" FOREIGN KEY ("order_id") REFERENCES "offer_order"(id) ON DELETE CASCADE,
                CONSTRAINT "FK_861cr6io890r430aa145ed06713" FOREIGN KEY ("invoice_id") REFERENCES "invoice"(id) ON DELETE CASCADE
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS "payment_intent";
            DROP SEQUENCE IF EXISTS "payment_intent_id_seq";
        `);
    }

}
