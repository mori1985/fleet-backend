import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Vehicle } from './vehicle.entity';

@Entity()
export class VehicleHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Vehicle, vehicle => vehicle.id)
  @JoinColumn({ name: 'vehicle_id' })
  vehicle: Vehicle;

  @Column({ type: 'double precision' })
  lat: number;

  @Column({ type: 'double precision' })
  lng: number;

  @Column({ type: 'timestamp' })
  timestamp: Date;
}