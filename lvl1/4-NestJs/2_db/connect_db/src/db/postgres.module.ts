import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST') || 'localhost', // Хост  БД
        port: configService.get<number>('DB_PORT') || 5432, // Порт  БД
        username: configService.get<string>('DB_USERNAME') || 'your_username', // Имя пользователя
        password: configService.get<string>('DB_PASSWORD') || 'your_password', // Пароль
        database: configService.get<string>('DB_DATABASE') || 'your_database', // Имя базы данных
        entities: [__dirname + '/../entities/*.entity{.ts,.js}'], // Массив сущностей
        synchronize: true, // Включите для автоматического создания таблиц;
        retryAttempts: 10, // кол-во попыток подключения
        retryDelay: 3000, // Задержка между попытками подключения к БД
        autoLoadEntities: false, // true объекты будут загружаться автоматически.
        keepConnectionAlive: false, // true сохраняет открытым соединение при завершении работы приложения
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class DBPostgresModule {}
