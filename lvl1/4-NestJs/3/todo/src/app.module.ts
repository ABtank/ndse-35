import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseDatabaseModule } from './db/mongoose.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [MongooseDatabaseModule, TodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
