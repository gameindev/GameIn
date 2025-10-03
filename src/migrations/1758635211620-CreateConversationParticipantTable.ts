import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateConversationParticipantTable1758635211620 implements MigrationInterface {
    name = 'CreateConversationParticipantTable1758635211620'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "conversation_participant" (
                "id" SERIAL NOT NULL PRIMARY KEY,
                "conversation_id" integer NOT NULL,
                "user_id" integer NOT NULL,
                "joined_at" timestamp DEFAULT now() NOT NULL,
                "left_at" timestamp,
                is_admin boolean DEFAULT false,
                CONSTRAINT "UQ_conversation_user_unique" UNIQUE ("conversation_id","user_id"),
                CONSTRAINT "FK_conv_participant_conversation" FOREIGN KEY ("conversation_id") REFERENCES "conversation"(id) ON DELETE CASCADE ON UPDATE CASCADE,
                CONSTRAINT "FK_conv_participant_user" FOREIGN KEY ("user_id") REFERENCES "users"(id) ON DELETE CASCADE ON UPDATE CASCADE
            );    

            CREATE INDEX "IDX_conv_participant_conversation" ON "conversation_participant" ("conversation_id");
            CREATE INDEX "IDX_conv_participant_users" ON "conversation_participant" ("user_id");
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX IF EXISTS "IDX_conv_participant_users";
            DROP INDEX IF EXISTS "IDX_conv_participant_conversation";
            DROP TABLE "conversation_participant";
        `);
    }

}
