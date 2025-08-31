import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOfferOrderTable1756374254072 implements MigrationInterface {
    name = 'CreateOfferOrderTable1756374254072'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DO $$ BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relname = 'offer_order_id_seq') THEN
                    CREATE SEQUENCE offer_order_id_seq START 1;
                END IF;
            END $$;

            CREATE TABLE IF NOT EXISTS "offer_order" (
                id integer NOT NULL DEFAULT nextval('offer_order_id_seq'),
                order_id varchar(30) NOT NULL,
                offering_id integer NOT NULL,
                user_id integer NOT NULL,
                title varchar(195) NOT NULL,
                type offering_type_enum NOT NULL,
                currency char(3) NOT NULL,
                sub_total NUMERIC(12,2) NOT NULL DEFAULT 0,
                fee NUMERIC(12,2) NOT NULL DEFAULT 0,
                tax NUMERIC(12,2) NOT NULL DEFAULT 0,
                total NUMERIC(12,2) NOT NULL DEFAULT 0,
                notes text,
                status order_status_enum NOT NULL,
                "createdAt" timestamp DEFAULT now() NOT NULL,
                "updatedAt" timestamp DEFAULT now() NOT NULL,

                CONSTRAINT "PK_6a67i9b4d57f28742348467a345" PRIMARY KEY (id),
                CONSTRAINT "REL_861ejhd65m84yu678oiu89e543" UNIQUE ("order_id"),
                CONSTRAINT "FK_861c4ae08b30aa14wrt45dby679" FOREIGN KEY ("user_id") REFERENCES "user"(id) ON DELETE CASCADE,
                CONSTRAINT "FK_861cr6e0890r430aa145ed06713" FOREIGN KEY ("offering_id") REFERENCES "offerings"(id) ON DELETE CASCADE
            );
       `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS "offer_order";
            DROP SEQUENCE IF EXISTS "offer_order_id_seq";
        `);
    }

}
