import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEnumOfferingEnums1758302356697 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DO $$ BEGIN
                IF NOT EXISTS (
                    SELECT 1 FROM pg_type WHERE typname = 'offering_type_enum'
                ) THEN
                    CREATE TYPE "offering_type_enum" AS ENUM ('INDIVIDUAL', 'PRIZE_POOLED');
                END IF; 
            END $$;
        `);

        await queryRunner.query(`
            DO $$ BEGIN
                IF NOT EXISTS (
                    SELECT 1 FROM pg_type WHERE typname = 'offering_status_enum'
                ) THEN
                    CREATE TYPE "offering_status_enum" AS ENUM ('DRAFT', 'OFFERED', 'PENDING', 'ACCEPTED', 'COMPLETED', 'DISMISSED');
                END IF; 
            END $$;
        `);

        await queryRunner.query(`
            DO $$ BEGIN
                IF NOT EXISTS (
                    SELECT 1 FROM pg_type WHERE typname = 'offering_category_enum'
                ) THEN
                    CREATE TYPE "offering_category_enum" AS ENUM ('LOGO_STREAM', 'VIDEO_COMMERCIAL', 'SOCIAL_POST', 'MERCHANDISE');
                END IF; 
            END $$;
        `);

        await queryRunner.query(`
            DO $$ BEGIN
                IF NOT EXISTS (
                    SELECT 1 FROM pg_type WHERE typname = 'order_status_enum'
                ) THEN
                    CREATE TYPE "order_status_enum" AS ENUM ('PENDING_PAYMENT', 'PAID', 'IN_PROGRESS', 'DELIVERED', 'DISPUTED', 'REFUNDED', 'CANCELLED');
                END IF; 
            END $$;
        `);

        await queryRunner.query(`
            DO $$ BEGIN
                IF NOT EXISTS (
                    SELECT 1 FROM pg_type WHERE typname = 'payment_provider_enum'
                ) THEN
                    CREATE TYPE "payment_provider_enum" AS ENUM ('STRIPE', 'PAYPAL', 'RAZORPAY', 'MANUAL');
                END IF; 
            END $$;
        `);

        await queryRunner.query(`
            DO $$ BEGIN
                IF NOT EXISTS (
                    SELECT 1 FROM pg_type WHERE typname = 'payment_method_enum'
                ) THEN
                    CREATE TYPE "payment_method_enum" AS ENUM ('CARD', 'UPI', 'NETBANKING', 'WALLET', 'PAYPAL', 'BANK_TRANSFER', 'CASH');
                END IF; 
            END $$;
        `);

        await queryRunner.query(`
            DO $$ BEGIN
                IF NOT EXISTS (
                    SELECT 1 FROM pg_type WHERE typname = 'payment_status_enum'
                ) THEN
                    CREATE TYPE "payment_status_enum" AS ENUM ('REQUIRES_PAYMENT_METHOD','REQUIRES_CONFIRMATION','REQUIRES_ACTION','PROCESSING','SUCCEEDED','FAILED','CANCELED');
                END IF; 
            END $$;
        `);

        await queryRunner.query(`
            DO $$ BEGIN
                IF NOT EXISTS (
                    SELECT 1 FROM pg_type WHERE typname = 'invoice_status_enum'
                ) THEN
                    CREATE TYPE "invoice_status_enum" AS ENUM ('DRAFT','OPEN','PAID','VOID','UNCOLLECTIBLE','REFUNDED');
                END IF; 
            END $$;
        `);

        // Wallet/Payout
        await queryRunner.query(`
            DO $$ BEGIN
                IF NOT EXISTS (
                    SELECT 1 FROM pg_type WHERE typname = 'payout_status_enum'
                ) THEN
                    CREATE TYPE "payout_status_enum" AS ENUM ('REQUESTED','PROCESSING','PAID','FAILED','CANCELED');
                END IF; 
            END $$;
        `);

        await queryRunner.query(`
            DO $$ BEGIN
                IF NOT EXISTS (
                    SELECT 1 FROM pg_type WHERE typname = 'wallet_txn_type_enum'
                ) THEN
                    CREATE TYPE "wallet_txn_type_enum" AS ENUM ('CREDIT','DEBIT','HOLD','RELEASE','REFUND');
                END IF; 
            END $$;
        `);

        await queryRunner.query(`
            DO $$ BEGIN
                IF NOT EXISTS (
                    SELECT 1 FROM pg_type WHERE typname = 'refund_status_enum'
                ) THEN
                    CREATE TYPE "refund_status_enum" AS ENUM ('SUCCEEDED','FAILED','CANCELED','PROCESSING');
                END IF; 
            END $$;    
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TYPE IF EXISTS "refund_status_enum";`);
        await queryRunner.query(`DROP TYPE IF EXISTS "wallet_txn_type_enum";`);
        await queryRunner.query(`DROP TYPE IF EXISTS "payout_status_enum";`);
        await queryRunner.query(`DROP TYPE IF EXISTS "invoice_status_enum";`);
        await queryRunner.query(`DROP TYPE IF EXISTS "payment_status_enum";`);
        await queryRunner.query(`DROP TYPE IF EXISTS "payment_method_enum";`);
        await queryRunner.query(`DROP TYPE IF EXISTS "payment_provider_enum";`);
        await queryRunner.query(`DROP TYPE IF EXISTS "order_status_enum";`);
        await queryRunner.query(`DROP TYPE IF EXISTS "offering_category_enum";`);
        await queryRunner.query(`DROP TYPE IF EXISTS "offering_status_enum";`);
        await queryRunner.query(`DROP TYPE IF EXISTS "offering_type_enum";`);
    }

}
