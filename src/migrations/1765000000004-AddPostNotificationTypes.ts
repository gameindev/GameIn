import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPostNotificationTypes1765000000004 implements MigrationInterface {
    name = 'AddPostNotificationTypes1765000000004';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Add POST_LIKED to notification_type_enum
        // Check if the value already exists before adding
        await queryRunner.query(`
            DO $$ 
            BEGIN
                IF NOT EXISTS (
                    SELECT 1 FROM pg_enum 
                    WHERE enumlabel = 'POST_LIKED' 
                    AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'notification_type_enum')
                ) THEN
                    ALTER TYPE notification_type_enum ADD VALUE 'POST_LIKED';
                END IF;
            END $$;
        `);

        // Add POST_COMMENTED to notification_type_enum
        await queryRunner.query(`
            DO $$ 
            BEGIN
                IF NOT EXISTS (
                    SELECT 1 FROM pg_enum 
                    WHERE enumlabel = 'POST_COMMENTED' 
                    AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'notification_type_enum')
                ) THEN
                    ALTER TYPE notification_type_enum ADD VALUE 'POST_COMMENTED';
                END IF;
            END $$;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Note: PostgreSQL doesn't support removing enum values directly
        // If you need to rollback, you would need to:
        // 1. Update all rows with POST_LIKED or POST_COMMENTED to another type (e.g., CUSTOM)
        // 2. Recreate the enum without these values
        // 3. Update the column to use the new enum
        // This is complex and usually not recommended for production
        
        // For now, we'll update any existing notifications to CUSTOM type
        await queryRunner.query(`
            UPDATE notifications 
            SET type = 'CUSTOM' 
            WHERE type IN ('POST_LIKED', 'POST_COMMENTED');
        `);

        await queryRunner.query(`
            UPDATE notification_preferences 
            SET type = 'CUSTOM' 
            WHERE type IN ('POST_LIKED', 'POST_COMMENTED');
        `);

        // Note: The enum values remain in the database but won't be used
        // To fully remove them, you would need to recreate the enum type
    }
}

