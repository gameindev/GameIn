import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePaymentTable1756617183082 implements MigrationInterface {
    name = 'CreatePaymentTable1756617183082'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "payment" (
                id SERIAL NOT NULL PRIMARY KEY,
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
                "created_at" timestamp DEFAULT now() NOT NULL,
                "updated_at" timestamp DEFAULT now() NOT NULL,
                "deleted_at" timestamp,

                CONSTRAINT "FK_86109oiy8b30akjui7t45dby679" FOREIGN KEY ("payment_intent_id") REFERENCES "payment_intent"(id) ON DELETE CASCADE
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS "payment";
        `);
    }

}
