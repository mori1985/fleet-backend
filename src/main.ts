import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS برای همه منشأها (برای تست Codespace)
  app.enableCors({
    origin: '*', // اجازه به همه منشأها (شامل Codespace frontend)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(3010);
  console.log('Backend running on http://localhost:3010');
}
bootstrap();