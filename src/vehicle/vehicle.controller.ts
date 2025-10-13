import { Controller, Get, Param } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { Vehicle } from './vehicle.entity'; // مطمئن شو مسیر درست باشه

@Controller('vehicles')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Get()
  async findAll(): Promise<Vehicle[]> {
    return this.vehicleService.findAll();
  }

  @Get(':id')
  async getVehicle(@Param('id') id: string) {
    return this.vehicleService.findOne(Number(id));
  }

  @Get(':id/history')
  async getVehicleHistory(@Param('id') id: string) {
    return this.vehicleService.findHistory(Number(id));
  }
}