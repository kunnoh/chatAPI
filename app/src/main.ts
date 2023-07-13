import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.APP_PORT || 3000;
  app.enableCors({
    origin: '*'
  })
  await app.listen(PORT);
}
bootstrap();