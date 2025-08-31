import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOfferingTable1756224668793 implements MigrationInterface {
    name = 'CreateOfferingTable1756224668793'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DO $$ BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relname = 'offering_id_seq') THEN
                    CREATE SEQUENCE offering_id_seq START 1;
                END IF;
            END $$;

            CREATE TABLE IF NOT EXISTS "offerings" (
                id integer NOT NULL DEFAULT nextval('offering_id_seq'),
                user_id integer NOT NULL,
                type offering_type_enum NOT NULL,
                title varchar(160),
                description text,
                stream_platform varchar(30),
                start_date date,
                end_date date,
                event_type event_type_enum,
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
                "createdAt" timestamp DEFAULT now() NOT NULL,
                "updatedAt" timestamp DEFAULT now() NOT NULL,

                CONSTRAINT "PK_6a0e01b4d57f28332742467a345" PRIMARY KEY (id),
                CONSTRAINT "REL_861c4ae08503b30aa145ed0245" UNIQUE ("user_id"),
                CONSTRAINT "UQ_5b8f9f6b1ce612c784g67079083" UNIQUE ("upload_logo_id"),
                CONSTRAINT "FK_861c4ae08503b30aa145ed06713" FOREIGN KEY ("user_id") REFERENCES "user"(id) ON DELETE CASCADE,
                CONSTRAINT "FK_5b8f9f6b1ce612c784b67079673" FOREIGN KEY ("upload_logo_id") REFERENCES "upload_entity"(id)
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS "offerings";
            DROP SEQUENCE IF EXISTS offering_id_seq;
        `)
    }

}

