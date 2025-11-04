import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOfferingOrderTable1761800186574 implements MigrationInterface {
    name = 'CreateOfferingOrderTable1761800186574'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "offering_order" (
                id SERIAL NOT NULL PRIMARY KEY,
                order_id varchar(30) NOT NULL,
                offering_id integer NOT NULL,
                creator_id integer NOT NULL,
                brand_id integer NOT NULL,
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
                CONSTRAINT "FK_861c4ae08b30aa14wrt45dby679" FOREIGN KEY ("creator_id") REFERENCES "users"(id) ON DELETE CASCADE,
                CONSTRAINT "FK_861c4ae08b30aa14wrt45dby6791" FOREIGN KEY ("brand_id") REFERENCES "users"(id) ON DELETE CASCADE,
                CONSTRAINT "FK_861cr6e0890r430aa145ed06713" FOREIGN KEY ("offering_id") REFERENCES "offerings"(id) ON DELETE CASCADE
            );

            CREATE INDEX offering_order_creator_id_idx ON offering_order (creator_id);
            CREATE INDEX offering_order_brand_id_idx ON offering_order (brand_id);
            CREATE INDEX offering_order_offering_id_idx ON offering_order (offering_id);   
            CREATE INDEX offering_order_status_created_at_idx ON offering_order (status, "created_at" DESC);  
            CREATE INDEX offering_order_status_deleted_at_idx ON offering_order (status, "deleted_at" DESC);
       `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX IF EXISTS offering_order_status_deleted_at_idx;
            DROP INDEX IF EXISTS offering_order_status_created_at_idx;
            DROP INDEX IF EXISTS offering_order_brand_id_idx;
            DROP INDEX IF EXISTS offering_order_offering_id_idx;
            DROP INDEX IF EXISTS offering_order_creator_id_idx;
            DROP TABLE IF EXISTS "offering_order";
        `);
    }

}
