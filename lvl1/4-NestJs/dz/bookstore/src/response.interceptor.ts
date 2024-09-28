import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { Observable, map, catchError } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => ({
        status: 'success',
        data: data,
      })),
      catchError((err) => {
        const response = {
          status: 'fail',
          data: {
            message: err.message,
            ...(err instanceof HttpException && { code: err.getStatus() }),
          },
        };
        throw new BadRequestException(response);
      }),
    );
  }
}
