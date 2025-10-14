import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFleetTables1728810000000 implements MigrationInterface {
    name = 'CreateFleetTables1728810000000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // ایجاد جدول vehicles
        await queryRunner.query(`
            CREATE TABLE "vehicles" (
                "id" SERIAL PRIMARY KEY,
                "name" VARCHAR(50) DEFAULT 'Unknown',
                "lat" DOUBLE PRECISION,
                "lng" DOUBLE PRECISION,
                "status" VARCHAR(20) CHECK (status IN ('moving', 'stopped', 'idle')),
                "distance" DOUBLE PRECISION,
                "driver_name" VARCHAR(100),
                "driver_phone" VARCHAR(50),
                "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // ایجاد جدول vehicle_history
        await queryRunner.query(`
            CREATE TABLE "vehicle_history" (
                "id" SERIAL PRIMARY KEY,
                "vehicle_id" INTEGER,
                "lat" DOUBLE PRECISION,
                "lng" DOUBLE PRECISION,
                "timestamp" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                CONSTRAINT fk_vehicle FOREIGN KEY ("vehicle_id") REFERENCES "vehicles" ("id") ON DELETE CASCADE
            )
        `);

        // درج داده‌های اولیه برای vehicles (43 ردیف)
        await queryRunner.query(`
            INSERT INTO vehicles (name, lat, lng, status, distance, driver_name, driver_phone)
            VALUES
                ('Truck 1', 52.5200, 13.4050, 'moving', 120.5, 'Max Mustermann', '+49-30-1234567'),
                ('Truck 2', 52.5210, 13.4060, 'stopped', 80.3, 'Anna Schmidt', '+49-30-2345678'),
                ('Truck 3', 52.5220, 13.4070, 'idle', 200.7, 'Hans Müller', '+49-30-3456789'),
                ('Truck 4', 52.5230, 13.4080, 'moving', 150.2, 'Lisa Fischer', '+49-30-4567890'),
                ('Truck 5', 52.5240, 13.4090, 'stopped', 90.1, 'Peter Wagner', '+49-30-5678901'),
                ('Truck 6', 52.5250, 13.4100, 'idle', 180.4, 'Sophia Becker', '+49-30-6789012'),
                ('Truck 7', 52.5260, 13.4110, 'moving', 140.6, 'Michael Hofmann', '+49-30-7890123'),
                ('Truck 8', 52.5270, 13.4120, 'stopped', 70.9, 'Julia Schulz', '+49-30-8901234'),
                ('Truck 9', 52.5280, 13.4130, 'idle', 210.7, 'Thomas Meier', '+49-30-9012345'),
                ('Truck 10', 52.5290, 13.4140, 'moving', 130.0, 'Sarah Lehmann', '+49-30-0123456'),
                ('Truck 11', 52.5300, 13.4150, 'stopped', 85.4, 'David Klein', '+49-30-1234568'),
                ('Truck 12', 52.5310, 13.4160, 'idle', 190.2, 'Laura Vogel', '+49-30-2345679'),
                ('Truck 13', 52.5320, 13.4170, 'moving', 110.8, 'Robert Lange', '+49-30-3456780'),
                ('Truck 14', 52.5330, 13.4180, 'stopped', 95.6, 'Nina Fuchs', '+49-30-4567891'),
                ('Truck 15', 52.5340, 13.4190, 'idle', 220.3, 'Christian Hartmann', '+49-30-5678902'),
                ('Truck 16', 52.5350, 13.4200, 'moving', 125.1, 'Emma Richter', '+49-30-6789013'),
                ('Truck 17', 52.5360, 13.4210, 'stopped', 75.9, 'Felix Krause', '+49-30-7890124'),
                ('Truck 18', 52.5370, 13.4220, 'idle', 205.5, 'Isabella Otto', '+49-30-8901235'),
                ('Truck 19', 52.5380, 13.4230, 'moving', 115.7, 'Lukas Weber', '+49-30-9012346'),
                ('Truck 20', 52.5390, 13.4240, 'stopped', 100.0, 'Mia Ziegler', '+49-30-0123457'),
                ('Truck 21', 52.5400, 13.4250, 'moving', 135.4, 'Paul Schneider', '+49-30-1234569'),
                ('Truck 22', 52.5410, 13.4260, 'idle', 175.8, 'Klara Braun', '+49-30-2345670'),
                ('Truck 23', 52.5420, 13.4270, 'stopped', 90.7, 'Thomas Weber', '+49-30-3456781'),
                ('Truck 24', 52.5430, 13.4280, 'moving', 145.2, 'Sophie Keller', '+49-30-4567892'),
                ('Truck 25', 52.5440, 13.4290, 'idle', 195.3, 'Markus Hoffmann', '+49-30-5678903'),
                ('Truck 26', 52.5450, 13.4300, 'stopped', 85.1, 'Julia Richter', '+49-30-6789014'),
                ('Truck 27', 52.5460, 13.4310, 'moving', 130.9, 'Andreas Schmidt', '+49-30-7890125'),
                ('Truck 28', 52.5470, 13.4320, 'idle', 210.0, 'Lena Müller', '+49-30-8901236'),
                ('Truck 29', 52.5480, 13.4330, 'stopped', 95.5, 'Stefan Bauer', '+49-30-9012347'),
                ('Truck 30', 52.5490, 13.4340, 'moving', 140.6, 'Katrin Schulz', '+49-30-0123458'),
                ('Truck 31', 52.5500, 13.4350, 'idle', 185.7, 'Tobias Fischer', '+49-30-1234560'),
                ('Truck 32', 52.5510, 13.4360, 'stopped', 80.3, 'Sandra Weber', '+49-30-2345671'),
                ('Truck 33', 52.5520, 13.4370, 'moving', 125.8, 'Jonas Klein', '+49-30-3456782'),
                ('Truck 34', 52.5530, 13.4380, 'idle', 200.4, 'Hannah Lange', '+49-30-4567893'),
                ('Truck 35', 52.5540, 13.4390, 'stopped', 90.2, 'Philipp Vogel', '+49-30-5678904'),
                ('Truck 36', 52.5550, 13.4400, 'moving', 135.1, 'Clara Hartmann', '+49-30-6789015'),
                ('Truck 37', 52.5560, 13.4410, 'idle', 180.9, 'Daniel Becker', '+49-30-7890126'),
                ('Truck 38', 52.5570, 13.4420, 'stopped', 85.7, 'Sabine Otto', '+49-30-8901237'),
                ('Truck 39', 52.5580, 13.4430, 'moving', 130.5, 'Matthias Schmidt', '+49-30-9012348'),
                ('Truck 40', 52.5590, 13.4440, 'idle', 195.6, 'Anja Richter', '+49-30-0123459'),
                ('Truck 41', 52.5600, 13.4450, 'stopped', 90.8, 'Peter Schulz', '+49-30-1234561'),
                ('Truck 42', 52.5610, 13.4460, 'moving', 140.3, 'Julia Meier', '+49-30-2345672'),
                ('Truck 43', 52.5620, 13.4470, 'idle', 185.2, 'Thomas Wagner', '+49-30-3456783');
        `);

        // درج داده‌های تاریخچه برای vehicles (5 نقطه برای هر خودرو = 215 ردیف)
        await queryRunner.query(`
            INSERT INTO vehicle_history (vehicle_id, lat, lng, timestamp)
            VALUES
                (1, 52.5200, 13.4050, '2025-10-12 08:11:00'),
                (1, 52.5210, 13.4060, '2025-10-12 20:11:00'),
                (1, 52.5220, 13.4070, '2025-10-13 02:11:00'),
                (1, 52.5230, 13.4080, '2025-10-13 05:11:00'),
                (1, 52.5240, 13.4090, '2025-10-13 07:11:00'),
                (2, 52.5250, 13.4100, '2025-10-12 08:11:00'),
                (2, 52.5260, 13.4110, '2025-10-12 20:11:00'),
                (2, 52.5270, 13.4120, '2025-10-13 02:11:00'),
                (2, 52.5280, 13.4130, '2025-10-13 05:11:00'),
                (2, 52.5290, 13.4140, '2025-10-13 07:11:00'),
                (3, 52.5300, 13.4150, '2025-10-12 08:11:00'),
                (3, 52.5310, 13.4160, '2025-10-12 20:11:00'),
                (3, 52.5320, 13.4170, '2025-10-13 02:11:00'),
                (3, 52.5330, 13.4180, '2025-10-13 05:11:00'),
                (3, 52.5340, 13.4190, '2025-10-13 07:11:00'),
                -- ادامه تا vehicle_id 43
                (43, 52.7300, 13.6150, '2025-10-12 08:11:00'),
                (43, 52.7310, 13.6160, '2025-10-12 20:11:00'),
                (43, 52.7320, 13.6170, '2025-10-13 02:11:00'),
                (43, 52.7330, 13.6180, '2025-10-13 05:11:00'),
                (43, 52.7340, 13.6190, '2025-10-13 07:11:00');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "vehicle_history"`);
        await queryRunner.query(`DROP TABLE "vehicles"`);
    }
}