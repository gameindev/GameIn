import { MigrationInterface, QueryRunner } from 'typeorm';

export class SponsorshipFeedbackAndCreatorRatingNotification1770300000000 implements MigrationInterface {
    name = 'SponsorshipFeedbackAndCreatorRatingNotification1770300000000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DO $$ 
            BEGIN
                IF NOT EXISTS (
                    SELECT 1 FROM pg_enum 
                    WHERE enumlabel = 'CREATOR_RATING_REQUEST' 
                    AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'notification_type_enum')
                ) THEN
                    ALTER TYPE notification_type_enum ADD VALUE 'CREATOR_RATING_REQUEST';
                END IF;
            END $$;
        `);

        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "sponsorship_feedback" (
                "id" SERIAL NOT NULL PRIMARY KEY,
                "offering_order_id" integer NOT NULL,
                "offering_id" integer NOT NULL,
                "brand_user_id" integer NOT NULL,
                "creator_user_id" integer NOT NULL,
                "scores" jsonb NOT NULL,
                "average_score" numeric(5,2) NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_sponsorship_feedback_order" UNIQUE ("offering_order_id"),
                CONSTRAINT "FK_sponsorship_feedback_order" FOREIGN KEY ("offering_order_id") REFERENCES "offering_order"("id") ON DELETE CASCADE ON UPDATE NO ACTION,
                CONSTRAINT "FK_sponsorship_feedback_brand" FOREIGN KEY ("brand_user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION,
                CONSTRAINT "FK_sponsorship_feedback_creator" FOREIGN KEY ("creator_user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
            );
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "IDX_sponsorship_feedback_brand" ON "sponsorship_feedback" ("brand_user_id");
        `);
        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "IDX_sponsorship_feedback_creator" ON "sponsorship_feedback" ("creator_user_id");
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "sponsorship_feedback"`);
        // Enum value CREATOR_RATING_REQUEST is not removed (PostgreSQL limitation)
    }
}
