import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { winstonConfig } from './logger/winston.config';
import { HttpExceptionFilter } from './filters/http-exception.filter';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: winstonConfig,
  });
    app.useGlobalFilters(new HttpExceptionFilter());
app.enableCors({
  origin: 'http://localhost:3000',
  credentials: true,
});
  await app.listen(process.env.PORT ?? 1000);
}

bootstrap();
