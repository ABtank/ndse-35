import { Controller, Get, Param, UsePipes } from '@nestjs/common';
import { AppService } from './app.service';
import { AppAgeValidationPipe } from './app.age.validation.pipe';
import { ValidationPipe } from './app.validation.pipe';

// @UsePipes(ValidationPipe)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('age/:age')
  getAgeInfo(@Param('age', AppAgeValidationPipe) age: string): string {
    return age;
  }
}
