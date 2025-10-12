import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, OnGatewayInit } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { VehicleService } from './vehicle.service';
import { Vehicle } from './vehicle.entity';

@WebSocketGateway({ cors: { origin: '*' } })
export class VehicleGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  constructor(private readonly vehicleService: VehicleService) {}

  afterInit() {
    console.log('✅ WebSocket Gateway initialized');
  }

  @SubscribeMessage('vehicleUpdate')
  async handleVehicleUpdate(@MessageBody() data: Partial<Vehicle>) {
    if (data.id) {
      const vehicle = await this.vehicleService.update(data.id, data);
      this.server.emit('vehicleData', vehicle);
    }
  }
}
