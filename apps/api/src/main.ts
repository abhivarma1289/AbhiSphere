import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

function parseOrigins(list?: string) {
  return (list ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const allowed = parseOrigins(process.env.CORS_ORIGIN) ?? [];
  app.enableCors({
    origin: (origin, callback) => {
      // allow non-browser clients (Postman/cURL - no Origin)
      if (!origin) return callback(null, true);
      if (allowed.includes(origin)) return callback(null, true);
      return callback(new Error(`CORS: ${origin} not allowed`), false);
    },
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  const port = Number(process.env.PORT ?? 8080);
  await app.listen(port);
  console.log(`API listening on http://localhost:${port}`);
}
bootstrap();
