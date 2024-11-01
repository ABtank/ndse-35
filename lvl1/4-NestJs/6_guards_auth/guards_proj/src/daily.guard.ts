import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class DailyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    console.log(context);
    const date = new Date();
    return date.getHours() < 10;
  }
}
