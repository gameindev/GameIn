import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateNotificationsTables1765000000000 implements MigrationInterface {
    name = 'CreateNotificationsTables1765000000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create notification_type enum
        await queryRunner.query(`
            DO $$ BEGIN
                CREATE TYPE notification_type_enum AS ENUM (
                    'USER_WELCOME', 'USER_VERIFIED', 'PASSWORD_RESET',
                    'NEW_MESSAGE', 'MESSAGE_READ', 'CONVERSATION_INVITE',
                    'OFFER_RECEIVED', 'OFFER_ACCEPTED', 'OFFER_REJECTED',
                    'ORDER_CREATED', 'ORDER_COMPLETED', 'ORDER_CANCELLED',
                    'PAYMENT_RECEIVED', 'PAYMENT_FAILED', 'INVOICE_GENERATED',
                    'NEW_FOLLOWER', 'PROFILE_VIEW',
                    'TEAM_INVITE', 'TEAM_MEMBER_ADDED',
                    'SYSTEM_ANNOUNCEMENT', 'MAINTENANCE_NOTICE',
                    'CUSTOM'
                );
            EXCEPTION
                WHEN duplicate_object THEN null;
            END $$;
        `);

        // Create notification_channel enum
        await queryRunner.query(`
            DO $$ BEGIN
                CREATE TYPE notification_channel_enum AS ENUM (
                    'IN_APP', 'EMAIL', 'SMS', 'PUSH'
                );
            EXCEPTION
                WHEN duplicate_object THEN null;
            END $$;
        `);

        // Create notification_status enum
        await queryRunner.query(`
            DO $$ BEGIN
                CREATE TYPE notification_status_enum AS ENUM (
                    'PENDING', 'SENT', 'DELIVERED', 'READ', 'FAILED'
                );
            EXCEPTION
                WHEN duplicate_object THEN null;
            END $$;
        `);

        // Create notifications table
        await queryRunner.query(`
            CREATE TABLE "notifications" (
                id SERIAL NOT NULL PRIMARY KEY,
                "user_id" integer NOT NULL,
                type notification_type_enum NOT NULL,
                channel notification_channel_enum NOT NULL,
                status notification_status_enum DEFAULT 'PENDING' NOT NULL,
                title varchar(255) NOT NULL,
                message text NOT NULL,
                data jsonb,
                metadata jsonb,
                "external_id" varchar(255),
                "sent_at" timestamp,
                "delivered_at" timestamp,
                "read_at" timestamp,
                "error_message" text,
                "retry_count" integer DEFAULT 0 NOT NULL,
                "created_at" timestamp DEFAULT now() NOT NULL,
                "updated_at" timestamp DEFAULT now() NOT NULL,
                
                CONSTRAINT "FK_notifications_user" FOREIGN KEY ("user_id") REFERENCES "users"(id) ON DELETE CASCADE
            );

            CREATE INDEX "IDX_notifications_user_id" ON "notifications" ("user_id");
            CREATE INDEX "IDX_notifications_user_status" ON "notifications" ("user_id", "status");
            CREATE INDEX "IDX_notifications_user_created" ON "notifications" ("user_id", "created_at");
            CREATE INDEX "IDX_notifications_channel_status" ON "notifications" ("channel", "status");
        `);

        // Create notification_preferences table
        await queryRunner.query(`
            CREATE TABLE "notification_preferences" (
                id SERIAL NOT NULL PRIMARY KEY,
                "user_id" integer NOT NULL,
                type notification_type_enum NOT NULL,
                channel notification_channel_enum NOT NULL,
                enabled boolean DEFAULT true NOT NULL,
                "created_at" timestamp DEFAULT now() NOT NULL,
                "updated_at" timestamp DEFAULT now() NOT NULL,
                
                CONSTRAINT "UQ_notification_preferences_user_type_channel" UNIQUE ("user_id", "type", "channel"),
                CONSTRAINT "FK_notification_preferences_user" FOREIGN KEY ("user_id") REFERENCES "users"(id) ON DELETE CASCADE
            );

            CREATE INDEX "IDX_notification_preferences_user_id" ON "notification_preferences" ("user_id");
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "notification_preferences"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "notifications"`);
        await queryRunner.query(`DROP TYPE IF EXISTS notification_status_enum`);
        await queryRunner.query(`DROP TYPE IF EXISTS notification_channel_enum`);
        await queryRunner.query(`DROP TYPE IF EXISTS notification_type_enum`);
    }
}

