// src/data-source.ts
import 'dotenv/config';
import { DataSource } from 'typeorm';
import { Vehicle } from './vehicle/vehicle.entity';
import { VehicleHistory } from './vehicle/vehicle-history.entity';

export default new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [Vehicle, VehicleHistory],
  migrations: ['src/migrations/*.ts'],
  ssl: { rejectUnauthorized: false },
});