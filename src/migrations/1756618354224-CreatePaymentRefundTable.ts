import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePaymentRefundTable1756618354224 implements MigrationInterface {
    name = 'CreatePaymentRefundTable1756618354224'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DO $$ BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relname = 'payment_refund_id_seq') THEN
                    CREATE SEQUENCE payment_refund_id_seq START 1;
                END IF;
            END $$;

            CREATE TABLE IF NOT EXISTS "payment_refund" (
                id integer NOT NULL DEFAULT nextval('payment_refund_id_seq'),
                payment_id integer NOT NULL,
                provider_refund_id TEXT UNIQUE,
                amount  NUMERIC(12,2) NOT NULL,
                status refund_status_enum NOT NULL, 
                reason TEXT,
                meta_data JSONB,
                "createdAt" timestamp DEFAULT now() NOT NULL,

                CONSTRAINT "PK_yu67i9b4d5hjyu7y2348467a345" PRIMARY KEY (id),
                CONSTRAINT "FK_86109oiy8io987jui7t45dby679" FOREIGN KEY ("payment_id") REFERENCES "payment"(id) ON DELETE CASCADE
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS "payment_refund";
            DROP SEQUENCE IF EXISTS "payment_refund_id_seq";    
        `);
    }

}
