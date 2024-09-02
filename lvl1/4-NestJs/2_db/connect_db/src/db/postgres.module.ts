import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost', // Хост  БД
      port: +process.env.DB_PORT || 5432, // Порт  БД
      username: process.env.DB_USERNAME || 'your_username', // Имя пользователя
      password: process.env.DB_PASSWORD || 'your_password', // Пароль
      database: process.env.DB_DATABASE || 'your_database', // Имя базы данных
      entities: [], // Массив сущностей
      synchronize: true, // Включите для автоматического создания таблиц;
    }),
  ],
  controllers: [],
  providers: [],
})
export class DBPostgresModule {}
