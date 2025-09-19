import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOfferOrderTable1756374254072 implements MigrationInterface {
    name = 'CreateOfferOrderTable1756374254072'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`

            CREATE TABLE IF NOT EXISTS "offer_order" (
                id SERIAL NOT NULL PRIMARY KEY,
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
                "created_at" timestamp DEFAULT now() NOT NULL,
                "updated_at" timestamp DEFAULT now() NOT NULL,
                "deleted_at" timestamp,

            
                CONSTRAINT "REL_861ejhd65m84yu678oiu89e543" UNIQUE ("order_id"),
                CONSTRAINT "FK_861c4ae08b30aa14wrt45dby679" FOREIGN KEY ("user_id") REFERENCES "users"(id) ON DELETE CASCADE,
                CONSTRAINT "FK_861cr6e0890r430aa145ed06713" FOREIGN KEY ("offering_id") REFERENCES "offerings"(id) ON DELETE CASCADE
            );
       `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS "offer_order";
        `);
    }

}
