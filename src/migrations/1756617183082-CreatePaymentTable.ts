import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePaymentTable1756617183082 implements MigrationInterface {
    name = 'CreatePaymentTable1756617183082'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DO $$ BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relname = 'payment_id_seq') THEN
                    CREATE SEQUENCE payment_id_seq START 1;
                END IF;
            END $$;

            CREATE TABLE IF NOT EXISTS "payment" (
                id integer NOT NULL DEFAULT nextval('payment_id_seq'),
                payment_intent_id integer NOT NULL,
                provider_payment_id TEXT UNIQUE,
                amount_captured NUMERIC(12,2) NOT NULL,
                currency CHAR(3) NOT NULL DEFAULT 'USD', 
                status payment_status_enum NOT NULL,  
                receipt_url TEXT,
                failure_code TEXT,
                failure_message TEXT,
                meta_data JSONB,
                succeeded_at TIMESTAMP,
                "createdAt" timestamp DEFAULT now() NOT NULL,

                CONSTRAINT "PK_yu67i9b4d57678uy2348467a345" PRIMARY KEY (id),
                CONSTRAINT "FK_86109oiy8b30akjui7t45dby679" FOREIGN KEY ("payment_intent_id") REFERENCES "payment_intent"(id) ON DELETE CASCADE
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS "payment";
            DROP SEQUENCE IF EXISTS "payment_id_seq";
        `);
    }

}
