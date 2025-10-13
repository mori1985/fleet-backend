import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLastUpdateToVehicles1760355429714 implements MigrationInterface {
    name = 'AddLastUpdateToVehicles1760355429714'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicle_history" DROP CONSTRAINT "vehicle_history_vehicle_id_fkey"`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP CONSTRAINT "vehicles_status_check"`);
        await queryRunner.query(`ALTER TABLE "vehicles" RENAME COLUMN "updated_at" TO "last_update"`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD "status" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "driver_name"`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD "driver_name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "driver_phone"`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD "driver_phone" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vehicles" ALTER COLUMN "last_update" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vehicles" ALTER COLUMN "last_update" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "vehicle_history" ALTER COLUMN "timestamp" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vehicle_history" ALTER COLUMN "timestamp" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "vehicle_history" ADD CONSTRAINT "FK_9aa17ecc8f43e3554416b6610b2" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicle_history" DROP CONSTRAINT "FK_9aa17ecc8f43e3554416b6610b2"`);
        await queryRunner.query(`ALTER TABLE "vehicle_history" ALTER COLUMN "timestamp" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "vehicle_history" ALTER COLUMN "timestamp" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vehicles" ALTER COLUMN "last_update" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "vehicles" ALTER COLUMN "last_update" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "driver_phone"`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD "driver_phone" character varying(50) NOT NULL DEFAULT '+49-123-456789'`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "driver_name"`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD "driver_name" character varying(100) NOT NULL DEFAULT 'John Doe'`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD "status" character varying(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD "name" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vehicles" RENAME COLUMN "last_update" TO "updated_at"`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_status_check" CHECK (((status)::text = ANY ((ARRAY['moving'::character varying, 'stopped'::character varying, 'idle'::character varying])::text[])))`);
        await queryRunner.query(`ALTER TABLE "vehicle_history" ADD CONSTRAINT "vehicle_history_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
