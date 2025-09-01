import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // await app.listen(process.env.PORT ?? 3000);
  const origin = process.env.CORS_ORIGIN ?? 'http://localhost:5173';
  app.enableCors({ origin, credentials: true });
  await app.listen(process.env.PORT ? Number(process.env.PORT) : 8080);
}
bootstrap();
