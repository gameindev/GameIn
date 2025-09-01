import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIndexesOnOfferOrderTable1756375322910 implements MigrationInterface {
    name = 'AddIndexesOnOfferOrderTable1756375322910'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE INDEX offer_order_user_id_idx ON offer_order (user_id);
            CREATE INDEX offer_order_offering_id_idx ON offer_order (offering_id);   
            CREATE INDEX offer_order_status_created_at_idx ON offer_order (status, "created_at" DESC);  
            CREATE INDEX offer_order_status_deleted_at_idx ON offer_order (status, "deleted_at" DESC);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX "offer_order_status_deleted_at_idx";
            DROP INDEX "offer_order_status_created_at_idx";
            DROP INDEX "offer_order_offering_id_idx";
            DROP INDEX "offer_order_user_id_idx";
        `);
    }

}
