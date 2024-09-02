import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { BooksController } from './books/books.controller';
import { logger } from './logger.middleware.function';

@Module({
  imports: [BooksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  // настройка посредника
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(logger).forRoutes(BooksController);
  }
}
