import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePaymentRefundTable1762103508153 implements MigrationInterface {
    name = 'CreatePaymentRefundTable1762103508153'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "payment_refund" (
                id SERIAL NOT NULL PRIMARY KEY,
                payment_id integer NOT NULL,
                provider_refund_id TEXT UNIQUE,
                amount  NUMERIC(12,2) NOT NULL,
                status "refund_status_enum" NOT NULL, 
                reason TEXT,
                meta_data JSONB,
                "created_at" timestamp DEFAULT now() NOT NULL,
                "updated_at" timestamp DEFAULT now() NOT NULL,
                "deleted_at" timestamp,

                CONSTRAINT "FK_86109oiy8io987jui7t45dby679" FOREIGN KEY ("payment_id") REFERENCES "payment"(id) ON DELETE CASCADE
            );

            CREATE INDEX IF NOT EXISTS idx_payment_refund ON payment_refund(payment_id);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        
        await queryRunner.query(`
            DROP TABLE IF EXISTS "payment_refund";
            DROP INDEX IF EXISTS idx_payment_refund;
        `);
    }

}
