import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DailyGuard } from './daily.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalGuards(new DailyGuard());
  await app.listen(3000);
}
bootstrap();
