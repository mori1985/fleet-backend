import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'vehicles' }) // ⚡ حتما نام جدول با دیتابیس مطابقت داشته باشه
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('float')
  lat: number;

  @Column('float')
  lng: number;

  @Column()
  status: string;

  @Column('float')
  distance: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
