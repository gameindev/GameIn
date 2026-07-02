import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateWalletTables1770600000000 implements MigrationInterface {
    name = 'CreateWalletTables1770600000000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DO $$ BEGIN
                CREATE TYPE connect_onboarding_status_enum AS ENUM ('NOT_STARTED', 'PENDING', 'ACTIVE', 'RESTRICTED');
            EXCEPTION WHEN duplicate_object THEN null;
            END $$;

            DO $$ BEGIN
                CREATE TYPE wallet_entry_type_enum AS ENUM ('TOP_UP', 'ORDER_PAYMENT', 'ORDER_EARNING', 'PLATFORM_FEE', 'RELEASE', 'WITHDRAW', 'REFUND');
            EXCEPTION WHEN duplicate_object THEN null;
            END $$;

            DO $$ BEGIN
                CREATE TYPE wallet_entry_status_enum AS ENUM ('PENDING', 'COMPLETED', 'FAILED', 'REVERSED', 'FROZEN');
            EXCEPTION WHEN duplicate_object THEN null;
            END $$;

            DO $$ BEGIN
                CREATE TYPE wallet_reference_type_enum AS ENUM ('ORDER', 'PAYMENT', 'PAYMENT_INTENT', 'TRANSFER', 'PAYOUT', 'TOP_UP');
            EXCEPTION WHEN duplicate_object THEN null;
            END $$;

            DO $$ BEGIN
                CREATE TYPE wallet_release_status_enum AS ENUM ('SCHEDULED', 'PROCESSING', 'COMPLETED', 'FROZEN', 'FAILED', 'CANCELLED');
            EXCEPTION WHEN duplicate_object THEN null;
            END $$;
        `);

        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "wallet" (
                id SERIAL NOT NULL PRIMARY KEY,
                user_id integer NOT NULL,
                currency CHAR(3) NOT NULL DEFAULT 'USD',
                stripe_connect_account_id TEXT,
                stripe_customer_id TEXT,
                connect_status connect_onboarding_status_enum NOT NULL DEFAULT 'NOT_STARTED',
                payouts_enabled BOOLEAN NOT NULL DEFAULT false,
                created_at TIMESTAMP NOT NULL DEFAULT now(),
                updated_at TIMESTAMP NOT NULL DEFAULT now(),
                deleted_at TIMESTAMP,
                CONSTRAINT "UQ_wallet_user_id" UNIQUE ("user_id"),
                CONSTRAINT "FK_wallet_user_id" FOREIGN KEY ("user_id") REFERENCES "users"(id) ON DELETE CASCADE
            );

            CREATE INDEX IF NOT EXISTS idx_wallet_user_id ON wallet(user_id);
        `);

        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "wallet_ledger_entry" (
                id SERIAL NOT NULL PRIMARY KEY,
                wallet_id integer NOT NULL,
                entry_type wallet_entry_type_enum NOT NULL,
                status wallet_entry_status_enum NOT NULL,
                amount NUMERIC(12,2) NOT NULL,
                currency CHAR(3) NOT NULL DEFAULT 'USD',
                reference_type wallet_reference_type_enum,
                reference_id integer,
                stripe_object_id TEXT,
                idempotency_key VARCHAR(120) NOT NULL,
                description TEXT,
                meta_data JSONB,
                created_at TIMESTAMP NOT NULL DEFAULT now(),
                updated_at TIMESTAMP NOT NULL DEFAULT now(),
                deleted_at TIMESTAMP,
                CONSTRAINT "UQ_wallet_ledger_idempotency" UNIQUE ("idempotency_key"),
                CONSTRAINT "FK_wallet_ledger_wallet_id" FOREIGN KEY ("wallet_id") REFERENCES "wallet"(id) ON DELETE CASCADE
            );

            CREATE INDEX IF NOT EXISTS idx_wallet_ledger_wallet_id ON wallet_ledger_entry(wallet_id);
            CREATE INDEX IF NOT EXISTS idx_wallet_ledger_reference ON wallet_ledger_entry(reference_type, reference_id);
        `);

        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "wallet_release" (
                id SERIAL NOT NULL PRIMARY KEY,
                order_id integer NOT NULL,
                creator_wallet_id integer NOT NULL,
                amount NUMERIC(12,2) NOT NULL,
                currency CHAR(3) NOT NULL DEFAULT 'USD',
                release_at TIMESTAMP NOT NULL,
                status wallet_release_status_enum NOT NULL,
                stripe_transfer_id TEXT,
                failure_reason TEXT,
                created_at TIMESTAMP NOT NULL DEFAULT now(),
                updated_at TIMESTAMP NOT NULL DEFAULT now(),
                deleted_at TIMESTAMP,
                CONSTRAINT "UQ_wallet_release_order_id" UNIQUE ("order_id"),
                CONSTRAINT "FK_wallet_release_order_id" FOREIGN KEY ("order_id") REFERENCES "offering_order"(id) ON DELETE CASCADE,
                CONSTRAINT "FK_wallet_release_creator_wallet_id" FOREIGN KEY ("creator_wallet_id") REFERENCES "wallet"(id) ON DELETE CASCADE
            );

            CREATE INDEX IF NOT EXISTS idx_wallet_release_status_release_at ON wallet_release(status, release_at);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "wallet_release"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "wallet_ledger_entry"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "wallet"`);
        await queryRunner.query(`DROP TYPE IF EXISTS wallet_release_status_enum`);
        await queryRunner.query(`DROP TYPE IF EXISTS wallet_reference_type_enum`);
        await queryRunner.query(`DROP TYPE IF EXISTS wallet_entry_status_enum`);
        await queryRunner.query(`DROP TYPE IF EXISTS wallet_entry_type_enum`);
        await queryRunner.query(`DROP TYPE IF EXISTS connect_onboarding_status_enum`);
    }
}
