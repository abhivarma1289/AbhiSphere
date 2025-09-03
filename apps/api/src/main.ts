import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger';

function parseOrigins(list?: string) {
  return (list ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS
  const allowed = parseOrigins(process.env.CORS_ORIGIN) ?? [];
  app.enableCors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // Postman/cURL
      if (allowed.includes(origin)) return callback(null, true);
      return callback(new Error(`CORS: ${origin} not allowed`), false);
    },
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
    optionsSuccessStatus: 204,
  });

  // Swagger
  setupSwagger(app);

  const port = Number(process.env.PORT ?? 8080);
  await app.listen(port);
  console.log(`API listening on http://localhost:${port}  |  Docs: /docs`);
}
bootstrap();
