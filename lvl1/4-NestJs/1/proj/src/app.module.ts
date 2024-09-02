import {
  MiddlewareConsumer,
  Module,
  NestModule,
  // RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { CatsController } from './cats/cats.controller';
import { logger } from './logger.middleware.function';
// import { LoggerMiddleware } from './logger.middleware';

@Module({
  imports: [CatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  // настройка посредника
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(logger)
      // .apply(LoggerMiddleware)
      // .forRoutes({ path: 'cats', method: RequestMethod.ALL });
      // .exclude({ path: 'cats', method: RequestMethod.DELETE }, 'cats/(.*)')
      .forRoutes(CatsController);
  }
}
