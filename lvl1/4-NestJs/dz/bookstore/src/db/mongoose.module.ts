import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      process.env.MONGODB_URI ||
        'mongodb://root:example@localhost:27017/bookstore?authSource=admin', // Получаем URI из конфигурации
    ),
  ],
})
export class MongooseDatabaseModule {}
