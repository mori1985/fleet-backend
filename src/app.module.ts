import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleModule } from './vehicle/vehicle.module';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';
config(); // load .env

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: false, // ⚡ جدول‌ها رو دوباره نسازه
      ssl: { rejectUnauthorized: false },
    }),
    VehicleModule,
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private dataSource: DataSource) {}

  async onModuleInit() {
    try {
      const queryRunner = this.dataSource.createQueryRunner();
      const result = await queryRunner.query('SELECT current_database();');
      console.log('✅ Connected to database:', result[0].current_database);
      await queryRunner.release();
    } catch (err) {
      console.error('❌ Database connection error:', err);
    }
  }
}
