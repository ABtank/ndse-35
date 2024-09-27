import {
  CallHandler,
  Injectable,
  NestInterceptor,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('New request!', {
      handler: context.getHandler().name,
      className: context.getClass().name,
    });
    const now = Date.now();
    return next.handle().pipe(
      tap(() => {
        console.log(`\nExecution time: ${Date.now() - now}ms`);
        console.log('\nRequest was successful!');
      }),
      catchError((err) => {
        console.log(`\nExecution time: ${Date.now() - now}ms`);
        console.log('\nRequest was failed!');
        console.log('\nError message: ', err);
        return throwError(() => new InternalServerErrorException());
      }),
    );
  }
}
