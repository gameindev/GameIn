import { MigrationInterface, QueryRunner } from 'typeorm';

const WALLET_NOTIFICATION_TYPES = [
    'PAYMENT_SECURED',
    'FUNDS_RELEASED',
    'PAYOUT_COMPLETED',
    'WALLET_TOP_UP',
    'CONNECT_SETUP_REQUIRED',
] as const;

export class AddWalletNotificationTypes1770610000000 implements MigrationInterface {
    name = 'AddWalletNotificationTypes1770610000000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        for (const label of WALLET_NOTIFICATION_TYPES) {
            await queryRunner.query(`
                DO $$
                BEGIN
                    IF NOT EXISTS (
                        SELECT 1 FROM pg_enum
                        WHERE enumlabel = '${label}'
                        AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'notification_type_enum')
                    ) THEN
                        ALTER TYPE notification_type_enum ADD VALUE '${label}';
                    END IF;
                END $$;
            `);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const labels = WALLET_NOTIFICATION_TYPES.map((l) => `'${l}'`).join(', ');
        await queryRunner.query(`
            UPDATE notifications SET type = 'CUSTOM' WHERE type IN (${labels});
        `);
        await queryRunner.query(`
            UPDATE notification_preferences SET type = 'CUSTOM' WHERE type IN (${labels});
        `);
    }
}
