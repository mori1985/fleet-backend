import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicle.service';
import { Vehicle } from './vehicle.entity';
import { VehicleGateway } from './vehicle.gateway';
import { VehicleHistory } from './vehicle-history.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Vehicle, VehicleHistory])],
  controllers: [VehicleController],
  providers: [VehicleService, VehicleGateway],
})
export class VehicleModule {}

