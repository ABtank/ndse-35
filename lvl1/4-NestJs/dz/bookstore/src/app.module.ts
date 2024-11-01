import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { BookController } from './book/book.controller';
import { logger } from './logger.middleware.function';
import { MongooseDatabaseModule } from './db/mongoose.module';
import { ResponseInterceptor } from './response.interceptor';

@Module({
  imports: [BookModule, MongooseDatabaseModule],
  controllers: [AppController],
  providers: [AppService, ResponseInterceptor],
})
export class AppModule implements NestModule {
  // настройка посредника
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(logger).forRoutes(BookController);
  }
}
