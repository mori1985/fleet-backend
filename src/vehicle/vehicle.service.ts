import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from './vehicle.entity';
import { VehicleHistory } from './vehicle-history.entity';


@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle) private vehicleRepository: Repository<Vehicle>,
    @InjectRepository(VehicleHistory) private historyRepository: Repository<VehicleHistory>,
  ) {}

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
}