import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOfferingTable1756224668793 implements MigrationInterface {
    name = 'CreateOfferingTable1756224668793'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`

            CREATE TABLE IF NOT EXISTS "offerings" (
                id SERIAL NOT NULL PRIMARY KEY,
                user_id integer NOT NULL,
                type offering_type_enum NOT NULL,
                title varchar(160),
                description text,
                stream_platform varchar(30),
                start_date date,
                end_date date,
                event_type varchar(50),
                game varchar(80),
                estimated_views bigint DEFAULT 0,
                team_id bigint,
                org_funds numeric(12,2) NOT NULL DEFAULT 0 CHECK (org_funds >= 0),
                notes text,
                terms_of_use text,
                is_terms_signed boolean DEFAULT false,
                can_edit boolean DEFAULT false,
                upload_logo_id integer,
                status offering_status_enum NOT NULL,
                meta_data JSONB,
                "created_at" timestamp DEFAULT now() NOT NULL,
                "updated_at" timestamp DEFAULT now() NOT NULL,
                "deleted_at" timestamp,

                CONSTRAINT "UQ_5b8f9f6b1ce612c784g67079083" UNIQUE ("upload_logo_id"),
                CONSTRAINT "FK_861c4ae08503b30aa145ed06713" FOREIGN KEY ("user_id") REFERENCES "users"(id) ON DELETE CASCADE,
                CONSTRAINT "FK_5b8f9f6b1ce612c784b67079673" FOREIGN KEY ("upload_logo_id") REFERENCES "upload_entity"(id)
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS "offerings";
        `)
    }

}

