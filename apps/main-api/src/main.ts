import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { EnvironmentVariables } from './env.validation';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const config = app.get(ConfigService<EnvironmentVariables>);

  app.enableCors({
    origin: config.getOrThrow<string>('NEST_CORS_ORIGIN'),
    credentials: true,
  });
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(config.getOrThrow<number>('NEST_PORT'));
}

void bootstrap();
