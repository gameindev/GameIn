import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddConversationParticipantChatPreferences1770700000000 implements MigrationInterface {
    name = 'AddConversationParticipantChatPreferences1770700000000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "conversation_participant"
            ADD COLUMN IF NOT EXISTS "is_pinned" boolean NOT NULL DEFAULT false;
        `);
        await queryRunner.query(`
            ALTER TABLE "conversation_participant"
            ADD COLUMN IF NOT EXISTS "cleared_at" timestamp;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "conversation_participant" DROP COLUMN IF EXISTS "cleared_at";
        `);
        await queryRunner.query(`
            ALTER TABLE "conversation_participant" DROP COLUMN IF EXISTS "is_pinned";
        `);
    }
}
