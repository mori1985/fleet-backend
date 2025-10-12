import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from './vehicle.entity';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
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
}
