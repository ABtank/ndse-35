import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    ConfigModule, // Импортируем модуль конфигурации
    MongooseModule.forRootAsync({
      imports: [ConfigModule], // Импортируем ConfigModule
      useFactory: async (configService: ConfigService) => ({
        uri:
          configService.get<string>('MONGODB_URI') ||
          'mongodb://root:example@localhost:27017/bookstore?authSource=admin', // Получаем URI из конфигурации
      }),
      inject: [ConfigService], // Инжектируем ConfigService
    }),
  ],
})
export class MongooseDatabaseModule {}
