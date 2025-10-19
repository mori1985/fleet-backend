import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from './vehicle.entity';
import { VehicleHistory } from './vehicle-history.entity';
import { Server } from 'socket.io'; // اضافه کردن import برای Server

@Injectable()
export class VehicleService {
  private server: Server; // حالا با تایپ درست

  constructor(
    @InjectRepository(Vehicle) private vehicleRepository: Repository<Vehicle>,
    @InjectRepository(VehicleHistory) private historyRepository: Repository<VehicleHistory>,
  ) {}

  setServer(server: Server) {
    this.server = server;
  }

  async findAll(): Promise<Vehicle[]> {
    return this.vehicleRepository.find();
  }

  async findOne(id: number): Promise<Vehicle> {
    return this.vehicleRepository.findOneByOrFail({ id });
  }

  async update(id: number, data: Partial<Vehicle>): Promise<Vehicle> {
    await this.vehicleRepository.update(id, data);
    return this.vehicleRepository.findOneByOrFail({ id });
  }

  async findHistory(id: number): Promise<VehicleHistory[]> {
    return this.historyRepository.find({
      where: { vehicle: { id } },
      order: { timestamp: 'DESC' },
    });
  }

  async updateVehiclePosition(id: number, lat: number, lng: number) {
    const vehicle = await this.vehicleRepository.findOneBy({ id });
    if (vehicle) {
      vehicle.lat = lat;
      vehicle.lng = lng;
      vehicle.updated_at = new Date(); // نیاز به تعریف تو entity
      await this.vehicleRepository.save(vehicle);
      if (this.server) {
        this.server.emit('vehicleData', { id, lat, lng, updated_at: vehicle.updated_at });
      }
      return vehicle;
    }
    return null;
  }

  startPositionUpdates() {
    setInterval(() => {
      this.updateVehiclePosition(1, 52.5215 + Math.random() * 0.01, 13.4070 + Math.random() * 0.01);
    }, 5000); // فقط یه بار فراخوانی می‌شه
  }
}