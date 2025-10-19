import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
  import { VehicleHistory } from './vehicle-history.entity';

  @Entity('vehicles') // صریحاً اسم جدول رو vehicles تعریف کردم
  export class Vehicle {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column('decimal', { precision: 10, scale: 7 })
    lat: number;

    @Column('decimal', { precision: 10, scale: 7 })
    lng: number;

    @Column({ nullable: true })
    status?: string;

    @Column()
    distance: number;

    @Column()
    driver_name: string;

    @Column()
    driver_phone: string;

    @Column({ type: 'timestamp', name: 'last_update', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date; // هماهنگ با دیتابیس

    @OneToMany(() => VehicleHistory, history => history.vehicle)
    history: VehicleHistory[];
  }