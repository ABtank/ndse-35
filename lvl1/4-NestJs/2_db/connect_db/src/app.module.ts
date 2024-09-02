import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DBPostgresModule } from './db/postgres.module';

@Module({
  imports: [DBPostgresModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
