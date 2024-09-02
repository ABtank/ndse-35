import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DBPostgresModule } from './db/postgres.module';
import { MongooseDatabaseModule } from './db/mongoose.module';

@Module({
  imports: [MongooseDatabaseModule, DBPostgresModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
